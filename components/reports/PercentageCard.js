import { View, Text, Image, StyleSheet } from "react-native";

import colors from "@constants/colors.js";

export default function PercentageCard({ type, percentage, styleType }) {

  const config = {
    errors: {
      description: "Erros",
      icon: require("@assets/error-x.png"),
      color: colors.primaryRed
    },
    rights: {
      description: "Acertos",
      icon: require("@assets/correct-check.png"),
      color: colors.primaryGreen
    },
    empty: {
      description: "Brancos",
      icon: require("@assets/empty-question.png"),
      color: colors.greyBlue,
    },
    achivimentStudent: {
      description: "Aproveitamento do aluno",
      icon: require("@assets/check-list.png"),
      color: colors.primaryPurple,
    },
    achivimentClass: {
      description: "Aproveitamento da turma",
      icon: require("@assets/graph.png"),
      color: colors.primaryPurple,
    },
  }[type];

  const styles = styleType === 'achievement' ? achievementStyles : defaultStyles;

  return (
    <View style={[styles.cardContainer, { borderColor: config?.color }]}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>{percentage}%</Text>
        <Image source={config?.icon} style={styles.image} />
      </View>
      <Text style={styles.description}>{config?.description}</Text>
    </View>
  )
}

const defaultStyles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold"
  },
  description: {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  cardContainer: {
    padding: 20,
    borderRadius: 12,
    width: 160,
    height: 95,
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 3, height: 10 },
    elevation: 4,
    borderBottomWidth: 4,
  },
  headerContainer: {
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    resizeMode: "contain",
  }
})

const achievementStyles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    borderRadius: 12,
    width: 165,
    height: 109,
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 3, height: 10 },
    elevation: 4,
    borderBottomWidth: 4,
  },
  headerContainer: {
    ...defaultStyles.headerContainer
  },
  title: {
    ...defaultStyles.title
  },
  description: {
    ...defaultStyles.description
  },
  image: {
    ...defaultStyles.image
  },
})