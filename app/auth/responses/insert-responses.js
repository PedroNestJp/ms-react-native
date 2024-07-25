import { View, ScrollView, SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, router } from "expo-router";
import { useState, useContext, useEffect } from "react";

import UserContext from "@context/user-context.js";
import { saveResponses, getExamQuestions, submitStudentExam } from "@services/api.js";
import Modal from "@components/Modal.js";
import Header from "@components/Header.js";
import ProgressBar from "@components/ProgressBar.js";
import Toaster from "@components/Toaster.js";
import MainButton from "@components/forms/MainButton.js";
import Loading from "@components/Loading.js";
import { getDisciplineTitle } from "@constants/disciplines.js";
import colors from "@constants/colors.js";
import Warning from "@icons/Warning.js";

export default function CheckResponses() {
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [isShowingModal, setIsShowingModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingInsertResponses, setIsLoadingInsertResponses] = useState(false);
  const [responses, setResponses] = useState([]);
  const [isShowingToaster, setIsShowingToaster] = useState(false);
  const [toasterText, setToasterText] = useState("Erro ao inserir resposta");

  useEffect(() => {
    const sendScannedResponses = async (data) => {
      const allResponsesNotNull = data.map(response => {
        return {
          alternativa: response.resposta,
          id_questao_avaliacao: response.id
        }
      }).filter(response => response.alternativa);

      try {
        await saveResponses(
          {
            id_avaliacao: Number(params.examId),
            id_user: Number(params.userId),
            respostas: allResponsesNotNull,
            scanner: true
          },
          `Bearer ${user.token}`
        );
      } catch (error) {
        console.error(`Respostas escaneadas: ${error}`)
      }
    };

    const updateResponsesTemplate = (data, scanResponses) => {
      data.forEach((question, index) => {
        data[index].resposta = options.includes(
          scanResponses[index].option) ? scanResponses[index].option : null;
        setToasterText("Existem respostas em branco ou não lidas pelo scanner.");
        data[index].resposta === null && setIsShowingToaster(true);
      });
    };

    const getQuestions = async () => {
      try {
        setIsLoading(true);
        const { data } = await getExamQuestions(
          {
            examId: params.examId,
            userId: params.userId
          },
          `Bearer ${user.token}`
        );
        if (params?.scanResponses) {
          const { message: scanResponses } = JSON.parse(params.scanResponses);
          updateResponsesTemplate(data, scanResponses);
          sendScannedResponses(data);
        }
        setResponses(data);
      } catch (error) {
        console.error("Pegar respostas: ", error.response.data)
      } finally {
        setIsLoading(false);
      }
    };

    getQuestions();
  }, []);

  const options = ["A", "B", "C", "D"];
  const examIsSubmittedOrFinished = params.userExamStatus == 1 || params.examFinished === "true";
  const submitExamParams = {
    id_avaliacao: Number(params.examId),
    id_user: Number(params.userId)
  };

  const handleOptionPress = async (responseId, option, responseIndex) => {
    if (examIsSubmittedOrFinished) {
      return;
    }

    try {
      setIsLoadingInsertResponses(true);
      const selectedOption = responses[responseIndex].resposta === option ? null : option;
      await saveResponses(
        {
          ...submitExamParams,
          respostas: [
            {
              alternativa: selectedOption,
              id_questao_avaliacao: responseId
            }
          ]
        },
        `Bearer ${user.token}`
      );
      setResponses(oldResponses => {
        const newResponses = [...oldResponses];
        newResponses.splice(responseIndex, 1, { ...newResponses[responseIndex], resposta: selectedOption });
        return newResponses;
      });
    } catch (error) {
      console.error("Salvar resposta: ", error.response);
      setToasterText("Erro ao inserir resposta");
      setIsShowingToaster(true);
    } finally {
      setIsLoadingInsertResponses(false);
    }
  };

  const handleSubmitStudentExam = async () => {
    try {
      await submitStudentExam(submitExamParams, `Bearer ${user.token}`);
      router.push({
        pathname: "/auth/responses/see-students",
        params: {
          discipline: params.discipline,
          start: params.start,
          end: params.end,
          examId: params.examId,
          examName: params.examName,
          examFinished: params.examFinished,
          schoolId: params.schoolId,
          schoolClassId: params.schoolClassId,
          className: params.className
        }
      });
    } catch (error) {
      console.error("Enviar avaliação: ", error)
    }
  };

  const handleSeeQuestions = () => {
    router.push({
      pathname: "auth/responses/see-questions",
      params: {
        ...params
      }
    });
  };

  const StudentResponses = responses.map((response, responseIndex) => (
    <View style={styles.questionContainer} key={responseIndex}>
      <Text style={styles.questionNumber}>{responseIndex + 1}</Text>
      {
        options.map(option => (
          <TouchableOpacity
            onPress={() => handleOptionPress(response.id, option, responseIndex)}
            style={[
              styles.questionOption,
              option === response.resposta && styles.questionOptionMarked,
              (!response.resposta && params.isAutomatic) && styles.questionOptionBlank
            ]}
            key={option}
          >
            <Text style={{
              color: (!response.resposta && params.isAutomatic) ? colors.primaryYellow : colors.subtitle,
              fontFamily: "Nunito_400Regular"
            }}>
              {option}
            </Text>
          </TouchableOpacity>
        ))
      }
      {examIsSubmittedOrFinished &&
        <View style={styles.overlay} />
      }
    </View>
  ));
  const markedResponses = responses.filter(response => response.resposta).length

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: params.userName,
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Header
          title={params.examName}
          discipline={getDisciplineTitle(params.discipline)}
          start={params.start}
          end={params.end}
          handleSeeQuestions={handleSeeQuestions}
        />

        {!isLoading &&
          <View style={{ paddingHorizontal: 20 }}>
            {examIsSubmittedOrFinished &&
              <View style={styles.submittedExamContainer}>
                <Warning style={styles.submittedIcon} />
                <Text style={styles.submittedExamText}>
                  Avaliação entregue! Novas respostas não poderão ser inseridas.
                </Text>
              </View>
            }

            <Text style={styles.title}>Respostas inseridas</Text>
            <Text style={styles.subtitle}>
              {
                markedResponses === 0 ?
                  "Toque nas alternativas referentes ao caderno de respostas." :
                  "Caso queira alterar a resposta, basta tocar na letra correta."
              }
            </Text>

            <ProgressBar
              style={styles.progressBar}
              color={colors.primaryGreen}
              progress={(markedResponses / responses.length) * 100}
            />
            <Text style={styles.progressDescription}>
              {markedResponses} de {responses.length} respostas inseridas
            </Text>

            <View style={styles.responsesContainer}>
              {StudentResponses}
            </View>

            {!examIsSubmittedOrFinished &&
              <MainButton
                label="Entregar avaliação"
                small
                onPress={() => setIsShowingModal(true)}
              />
            }
          </View>
        }
      </ScrollView>

      {(isLoading || isLoadingInsertResponses) &&
        <Loading />
      }

      {isShowingModal &&
        <Modal
          onPressPrimary={handleSubmitStudentExam}
          onPressSecondary={() => setIsShowingModal(false)}
          labels={{ primary: "Entregar avaliação", secondary: "Cancelar" }}
          smallButtons
          fromBottom
          danger={markedResponses !== responses.length}
        >
          <Text style={styles.modalTitle}>
            {markedResponses === responses.length ?
              "Deseja entregar essa avaliação?" :
              "Existem questões em branco"
            }
          </Text>
          <Text style={styles.modalDescription}>
            {markedResponses === responses.length ?
              "A avaliação não poderá ser editada após ser entregue." :
              "Deseja entregar a avaliação mesmo com questões em branco?"
            }
          </Text>
        </Modal>
      }

      {isShowingToaster &&
        <Toaster
          text={toasterText}
          type="error"
          offsetY={0}
          onHide={() => setIsShowingToaster(false)}
        />
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: colors.backgroundGrey,
    paddingBottom: 20
  },
  subtitle: {
    fontSize: 16,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  submittedExamContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#F9ECCD",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12
  },
  submittedIcon: {
    marginRight: 16
  },
  submittedExamText: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontFamily: "Nunito_400Regular",
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginBottom: 8
  },
  progressBar: {
    marginTop: 20,
    marginBottom: 6
  },
  progressDescription: {
    color: colors.subtitle
  },
  responsesContainer: {
    marginTop: 30,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  questionContainer: {
    marginVertical: 8,
    marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  questionNumber: {
    width: 40,
    marginRight: 10,
    fontSize: 20,
    fontFamily: "Nunito_700Bold"
  },
  questionOption: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: colors.subtitle,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  questionOptionMarked: {
    backgroundColor: colors.subtitle
  },
  questionOptionBlank: {
    borderColor: colors.primaryYellow
  },
  modalTitle: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "Nunito_700Bold"
  },
  modalDescription: {
    marginBottom: 40,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  overlay: {
    position: "absolute",
    backgroundColor: "#fff7",
    top: -20,
    left: -20,
    bottom: -20,
    right: -20,
    borderRadius: 10
  }
})