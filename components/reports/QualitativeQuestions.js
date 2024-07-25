import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import ButtonList from "@components/profile/ButtonList";
import { getColors } from "@utils/getColors.js";
import { alignCenter } from "@constants/styles";
import colors from "@constants/colors";
import { modalSubtitle } from "@constants/styles";

export default function QualitativeQuestions({
  list,
  containerStyles,
  params,
  goTo
}) {
  const LevelScore = (
    level,
    rightAnswers,
    totalQuestions
  ) => {
    let displayText = `${level}%`;
    if (rightAnswers !== undefined && totalQuestions !== undefined) {
      level = (rightAnswers / totalQuestions) * 100;
      displayText = `${rightAnswers}/${totalQuestions}`;
    }
    return (
      <View style={[styles.score, getColors(level).containerStyle]}>
        <Text style={[styles.scoreText, getColors(level).text]}>
          {displayText}
        </Text>
      </View>
    );
  };

  const Identifyer = (question) => {
    return (
      <View style={styles.identifyer}>
        <Text style={modalSubtitle}>
          <Text
            style={styles.identifyerText}>
            {question.identificador}
          </Text> - {question.total_questoes} {question.total_questoes !== 1 ? "Questões" : "Questão"}
        </Text>
      </View>
    );
  };

  const transformedList = list.map((question, index) => ({
    title:
      Identifyer(question),
    text:
      LevelScore(
        Math.floor(question.porcentagem),
        question.acertos,
        question.total_questoes
      ),
    onPress: () => {
      router.push({
        pathname: goTo,
        params: {
          ...params,
          skillCodeQuestion: question.id,
          selectedQuestionIndex: index,
          codeQuestion: question.identificador
        }
      });
    }
  }));

  return (
    <View style={containerStyles}>
      <ButtonList
        buttons={transformedList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  identifyer: {
    backgroundColor: colors.secondaryGreyBlue,
    borderRadius: 20,
    paddingVertical: 10,
    width: 200,
    ...alignCenter
  },
  identifyerText: {
    fontFamily: "Nunito_600SemiBold",
    textDecorationLine: "underline"
  },
  score: {
    borderRadius: 16,
    paddingVertical: 10,
    width: 80,
    ...alignCenter
  },
  scoreText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16
  },
});