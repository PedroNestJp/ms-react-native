import { useEffect, useState, useContext } from "react";
import { Text, ScrollView, StyleSheet, SafeAreaView, View, Dimensions } from "react-native";
import { Stack, useLocalSearchParams, Link } from "expo-router";
import RenderHtml from 'react-native-render-html';

import { getDisciplineTitle } from "@constants/disciplines.js";
import Loading from "@components/Loading.js";
import Header from "@components/Header.js";
import MainDropdown from "@components/MainDropdown.js";
import colors from "@constants/colors.js";
import api from "@services/api.js";
import UserContext from "@context/user-context.js";

const width = Dimensions.get('window').width * 0.8;
export default function responses() {
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getQuestions = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(
          `/avaliacoes/questoes?avaliacao=${params.examId}`, {
          headers: {
            "Authorization": 'Bearer ' + user.token
          }
        });

        setQuestions(data.questoes);
      } catch (error) {
        console.log("Ver questões: ", error)
      } finally {
        setIsLoading(false);
      }
    };

    getQuestions();
  }, []);

  const customLabel = (question, habilidade) => (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={styles.label}>Questão {question}</Text>
      <View style={styles.skillCode}>
        <Text style={styles.skillCodeText}>{habilidade}</Text>
      </View>
    </View>)

  const createAlternatives = (answer, alternative) => {
    return answer.includes("<p>") ?
      answer.replace("<p>", `<p> <b>${alternative}</b>)`) :
      `<b>${alternative})</b> ${answer}`
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: "Questões",
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Header
          title={params.examName}
          discipline={getDisciplineTitle(params.discipline)}
          start={params.start}
          end={params.end}
        />

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.title}>Questões da avaliação</Text>
          <Text style={styles.subtitle}>Confira as questões e suas habilidades</Text>

          {!isLoading &&
            questions.map((question, questionIndex) =>
              <MainDropdown
                style={{ marginBottom: 20 }}
                key={question.id}
                customLabel={customLabel(questionIndex + 1, question.codigo_habilidade)}
                showSkirt
              >
                <RenderHtml
                  source={{ html: question.descricao }}
                  contentWidth={width}
                  ignoredDomTags={["font"]}
                />
                {
                  Object.keys(question.alternativas).map((alternative, index) => (
                    <RenderHtml
                      key={`option-${index}`}
                      source={{ html: createAlternatives(question.alternativas[alternative], alternative) }}
                      contentWidth={width}
                      ignoredDomTags={["font"]}
                    />
                  ))
                }

                <Text style={styles.questionTitle}>Gabarito, habilidade e comentário</Text>
                <View style={styles.answerContainer}>
                  <RenderHtml
                    source={{ html: createAlternatives(question.alternativas[question.gabarito], question.gabarito) }}
                    contentWidth={width}
                    ignoredDomTags={["font"]}
                    tagsStyles={{ p: { textAlign: "center" } }}
                  />
                </View>

                <View style={styles.skillAndComments}>
                  <Text style={styles.skillAndCommentsText}>Habilidade - {question.codigo_habilidade} </Text>
                  <RenderHtml
                    source={{ html: question.habilidade }}
                    contentWidth={width}
                    ignoredDomTags={["font"]}
                  />
                </View>
                <View style={styles.skillAndComments}>
                  <Text style={styles.skillAndCommentsText}>Comentário: </Text>
                  <RenderHtml
                    source={{ html: question.comentario }}
                    contentWidth={width}
                    ignoredDomTags={["font"]}
                  />
                </View>
              </MainDropdown>
            )
          }
        </View>
      </ScrollView>

      {isLoading &&
        <Loading />
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  subtitle: {
    marginBottom: 20,
    fontSize: 16,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  disciplineImage: {
    width: 71,
    height: 64,
    resizeMode: "contain"
  },
  title: {
    marginBottom: 10,
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold"
  },
  questionTitle: {
    marginBottom: 10,
    fontFamily: "Nunito_600SemiBold"
  },
  contentWrapper: {
    minHeight: "100%",
    backgroundColor: colors.backgroundGrey
  },
  innerDropdowns: {
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: "#F0F3FD",
    elevation: 0
  },
  answerContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondaryGreen
  },
  answerText: {
    textAlign: "center",
    fontFamily: "Nunito_400Regular"
  },
  skillAndComments: {
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondaryGreyBlue
  },
  skillAndCommentsText: {
    fontFamily: "Nunito_600SemiBold"
  },
  skillCode: {
    position: "absolute",
    marginLeft: 100,
    backgroundColor: "#EEE0FF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  skillCodeText: {
    fontSize: 16,
    fontFamily: "Nunito_700Bold"
  },
  label: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold"
  }
})