import { View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import ButtonList from "@components/profile/ButtonList";
import { getColors } from "@utils/getColors";
import { alignCenter } from "@constants/styles";

export default function QuantitativeQuestions({ list, containerStyles, params }) {

  const LevelScore = (level) => (
    <View style={[styles.score, getColors(level).containerStyle]}>
      <Text style={[styles.scoreText, getColors(level).text]}>
        {level}%
      </Text>
    </View>
  );
  const transformedList = list.map((question, index) => ({
    title: `Questão ${question.questao}`,
    text: LevelScore(Math.floor(question.porcentagem)),
    onPress: () => {
      router.push({
        pathname: "auth/reports/see-question",
        params: {
          ...params,
          selectedQuestionIndex: index
        }
      })
    }
  }));

  return (
    <View style={containerStyles}>
      <ButtonList
        buttons={transformedList}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  score: {
    marginBottom: -4,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    ...alignCenter
  },
  scoreText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16
  },
})