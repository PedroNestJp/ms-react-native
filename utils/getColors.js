import { StyleSheet } from "react-native";
import colors from "@constants/colors.js";

export const getColors = (level) => {
  const levels = {
    nivel_um: 25,
    nivel_dois: 50,
    nivel_tres: 75,
  };

  const stylesMap = {
    nivel_um: {
      containerStyle: styles.levelOne,
      text: styles.levelOneText,
    },
    nivel_dois: {
      containerStyle: styles.levelTwo,
      text: styles.levelTwoText,
    },
    nivel_tres: {
      containerStyle: styles.levelThree,
      text: styles.levelThreeText,
    },
    nivel_quatro: {
      containerStyle: styles.levelFour,
      text: styles.levelFourText,
    },
  };

  if (typeof level === "string") {
    return stylesMap[level];
  }

  if (level < levels.nivel_um) {
    return stylesMap.nivel_um;
  } else if (level < levels.nivel_dois) {
    return stylesMap.nivel_dois;
  } else if (level < levels.nivel_tres) {
    return stylesMap.nivel_tres;
  }
  return stylesMap.nivel_quatro;
};

const styles = StyleSheet.create({
  levelFour: {
    backgroundColor: colors.secondaryGreen,
  },
  levelFourText: {
    color: colors.primaryGreen,
  },
  levelOne: {
    backgroundColor: colors.secondaryRed,
  },
  levelOneText: {
    color: colors.primaryRed,
  },
  levelThree: {
    backgroundColor: colors.secondaryBlue,
  },
  levelThreeText: {
    color: colors.primaryBlue,
  },
  levelTwo: {
    backgroundColor: colors.secondaryYellow,
  },
  levelTwoText: {
    color: colors.primaryYellow,
  },
});
