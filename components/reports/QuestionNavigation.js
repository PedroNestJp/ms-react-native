import { StyleSheet, Text, View } from "react-native";
import React from "react";

import MainIconButton from "@components/forms/MainIconButton.js";
import { modalTitle } from "@constants/styles";
import colors from "@constants/colors.js";
import Arrow from "@icons/Arrow.js";
import ArrowLeft from "@icons/ArrowLeft.js";

export default function QuestionNavigation({ setPage, questions, page, getQuestion }) {

  const handleNextPage = () => {
    if (page < questions.length - 1) {
      const nextPage = page + 1;
      setPage(nextPage);
      getQuestion(questions[nextPage].id);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      const previousPage = page - 1;
      setPage(previousPage);
      getQuestion(questions[previousPage].id);
    }
  };

  return (
    <View style={styles.navigation}>
      <Text style={modalTitle}> Questão {questions[page].questao}</Text>
      <View style={styles.arrowsArea}>
        <MainIconButton
          type={page === 0 && "transparent"}
          style={styles.arrowsIcons}
          icon={<ArrowLeft color={page === 0 && colors.primaryPurple} />}
          onPress={handlePreviousPage}
          disabled={page === 0}
        />
        <MainIconButton
          type={page === questions.length - 1 && "transparent"}
          style={styles.arrowsIcons}
          icon={<Arrow color={page === questions.length - 1 && colors.primaryPurple} />}
          onPress={handleNextPage}
          disabled={page === questions.length - 1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  arrowsArea: {
    flexDirection: "row",
    gap: 12,
  },
  arrowsIcons: {
    borderRadius: 8,
    height: 40,
    width: 59,
  },
  navigation: {
    borderRadius: 10,
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-between",
  },
});
