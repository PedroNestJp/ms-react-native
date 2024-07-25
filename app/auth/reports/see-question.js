import { useContext, useEffect, useState } from "react";
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import RenderHtml from "react-native-render-html";

import UserContext from "@context/user-context.js";
import { getQuestionQualitativeReport } from "@services/reports.js";
import { getQuestions } from "@services/reports";
import Loading from "@components/Loading.js";
import Header from "@components/Header.js";
import MainDropdown from "@components/MainDropdown.js";
import AnswerReport from "@components/reports/AnswersReport";
import ButtonList from "@components/profile/ButtonList.js";
import QuestionNavigation from "@components/reports/QuestionNavigation";
import { QuestionContent } from "@components/reports/QuestionContent";
import { getDisciplineTitle } from "@constants/disciplines.js";
import colors from "@constants/colors.js";
import { modalSubtitle, modalTitle } from "@constants/styles";
import { createButtons } from "@utils/createButtons";
import { alternativesLabel } from "@utils/createButtons";
import { formatCommentCode } from "@utils/formatTextHtml";

const width = Dimensions.get("window").width * 0.8;

export default function responses() {
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [page, setPage] = useState(Number(params.selectedQuestionIndex));
  const [questions, setQuestions] = useState([]);
  const [generalReportByQuestion, setGeneralReportByQuestion] = useState({});
  const [percentagePerAlternative, setPercentagePerAlternative] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getQuestion = async (questionId) => {
    try {
      setIsLoading(true);
      const { data: question } = await getQuestionQualitativeReport(user.token, {
        examId: params.examId,
        schoolId: params.schoolId,
        classId: params.classId,
        questionId
      });
      setGeneralReportByQuestion(question.aproveitamento);
      setPercentagePerAlternative(question.alternativas_marcadas);
    } catch (error) {
      console.error("Ver questão: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        setIsLoading(true);
        const { data: questions } = await getQuestions(user.token, {
          examId: params.examId
        });
        setQuestions(questions.questoes);
        getQuestion(questions.questoes[page].id);
      } catch (error) {
        console.error("Ver questões: ", error);
      }
    };
    getAllQuestions();
  }, []);

  const handleSeeQuestions = () => {
    router.push({
      pathname: "auth/reports/see-questions",
      params
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Stack.Screen options={{
        title: "Questões",
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <Header
          title={params.examName}
          discipline={getDisciplineTitle(params.discipline)}
          handleSeeQuestions={handleSeeQuestions}
          schoolName={params.schoolName}
          className={params.className}
        />
        {!isLoading && questions.length ?
          <View style={styles.mainContent}>

            <QuestionNavigation
              getQuestion={getQuestion}
              page={page}
              questions={questions}
              setPage={setPage}
            />

            <AnswerReport generalReportByQuestion={generalReportByQuestion} />

            <Text style={modalTitle}>Habilidade</Text>
            <View style={styles.skillContainer}>
              <RenderHtml
                source={{
                  html: formatCommentCode(
                    questions[page].codigo_habilidade,
                    questions[page].habilidade)
                }}
                contentWidth={width}
                ignoredDomTags={["font"]}
              />
            </View>
            <QuestionContent
              questions={questions}
              index={page}
              width={width}
              addPadding
            />

            <Text style={modalTitle}> Alternativas marcadas </Text>
            <Text style={modalSubtitle}> Respostas dos alunos nesta questão </Text>
            {Object.keys(percentagePerAlternative).map(letter =>
              <MainDropdown
                style={styles.dropdowns}
                key={letter}
                showSkirt
                customLabel={alternativesLabel(
                  letter,
                  percentagePerAlternative[letter].aproveitamento,
                  percentagePerAlternative[letter].alunos.length
                )}
                containerStyle={{ paddingVertical: 12 }}
                dropdownStyle={{ padding: 0 }}
              >
                <ButtonList
                  buttons={createButtons(
                    percentagePerAlternative[letter].alunos,
                    percentagePerAlternative[letter].aproveitamento,
                    "/auth/reports/student-report",
                    params
                  )}
                  containerStyle={{ shadowOpacity: 0 }}
                />
              </MainDropdown>
            )}
          </View> : null
        }
      </ScrollView>

      {isLoading &&
        <Loading />
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dropdowns: {
    marginTop: 12,
  },
  mainContainer: {
    backgroundColor: colors.backgroundGrey,
    paddingBottom: 90
  },
  mainContent: {
    gap: 16,
    paddingHorizontal: 16,
  },
  safeAreaView: {
    flex: 1
  },
  skillContainer: {
    backgroundColor: colors.secondaryGreyBlue,
    borderRadius: 10,
    padding: 10
  },
});