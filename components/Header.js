import { View, Text, StyleSheet, Image } from "react-native";

import MainButton from "@components/forms/MainButton.js";
import colors from "@constants/colors.js";
import { PORTUGUESE } from "@constants/disciplines.js";

export default function ResponseHeaders({
  title,
  schoolName,
  className,
  discipline,
  end,
  start,
  handleSeeQuestions,
  children
}) 
{
  const getMainImage = () => {
    return discipline === PORTUGUESE ?
      require("@assets/lingua-portuguesa-legenda.png") :
      require("@assets/matematica-legenda.png");
  };
  const getDescriptionText = schoolName && className ?
    <View>
      <Text style={styles.description}>{schoolName}</Text>
      <Text style={styles.description}>{className}</Text>
    </View> :
    <Text style={styles.subtitle}>Prazo: {start} - {end}</Text>
  return (
    <View style={styles.header}>
      <View style={{ flex: 1 }}>
        <Text style={styles.headerTitle}>{title || discipline}</Text>
        {
          children ?
            children :
            getDescriptionText
        }

        {handleSeeQuestions &&
          <MainButton
            label="Ver gabarito"
            outlined
            style={styles.seeQuestionsButton}
            onPress={handleSeeQuestions}
            small
          />
        }
      </View>
      <Image
        source={getMainImage()}
        style={styles.disciplineImage}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4B089F10",
    gap: 24
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
    color: colors.primaryPurple
  },
  description : {
    fontSize: 14,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  }, 
  subtitle: {
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  disciplineImage: {
    width: 110,
    height: 78,
    resizeMode: "contain"
  },
  seeQuestionsButton:{
    marginTop: 8
  }
})