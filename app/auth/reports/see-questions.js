import { useEffect, useState, useContext } from "react";
import { Text, ScrollView, StyleSheet, SafeAreaView, View, Dimensions } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";

import UserContext from "@context/user-context.js";
import { getQuestions } from "@services/reports";
import Loading from "@components/Loading.js";
import Header from "@components/Header.js";
import MainDropdown from "@components/MainDropdown.js";
import { QuestionContent } from "@components/reports/QuestionContent";
import { getDisciplineTitle } from "@constants/disciplines.js";
import colors from "@constants/colors.js";
import { modalTitle } from "@constants/styles";

const width = Dimensions.get('window').width * 0.8;
export default function Responses() {
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const options = ["A", "B", "C", "D"];

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        setIsLoading(true);
        const { data: questions } = await getQuestions(user.token, {
          examId: params.examId,
        });
        setQuestions(questions.questoes);
      } catch (error) {
        console.log("Ver questões: ", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllQuestions();
  }, []);

  const customLabel = (questionNumber, question) => (
    <View style={styles.labelContainer}>
      <Text style={styles.label}>Questão {questionNumber}</Text>
      <View style={styles.questionAnswers}>
        {options.map(option => (
          <View
            style={[
              styles.answersTextContainer,
              question.gabarito === option && styles.answersTextContainerCorrect
            ]}
            key={option}
          >
            <Text style={[
              styles.answersText,
              question.gabarito === option && styles.answersTextCorrect
            ]}>
              {option}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

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
          schoolName={params.schoolName}
          className={params.className}
        />

        <View style={styles.mainContent}>
          <Text style={modalTitle}>Gabarito</Text>
          {!isLoading &&
            questions.map((question, questionIndex) =>
              <MainDropdown
                key={question.id}
                customLabel={customLabel(questionIndex + 1, question)}
                showSkirt
              >
                <QuestionContent
                  questionContentSkill
                  questions={questions}
                  index={questionIndex}
                  width={width}
                />
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
  mainContent: {
    gap: 24,
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contentWrapper: {
    minHeight: "100%",
    backgroundColor: colors.backgroundGrey
  },
  questionAnswers: {
    position: "absolute",
    flexDirection: "row",
    marginLeft: 85,
    paddingVertical: 12,
  },
  answersTextContainer: {
    marginLeft: 8,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.primaryPurple,
  },
  answersTextContainerCorrect: {
    backgroundColor: colors.primaryPurple
  },
  answersText: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.primaryPurple
  },
  answersTextCorrect: {
    color: "#fff"
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold"
  }
})