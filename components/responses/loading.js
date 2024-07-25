import { View, Text, Image, StyleSheet } from "react-native";
import colors from "@constants/colors.js";
import ProgressBar from "@components/ProgressBar.js";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={require("@assets/logo-mais-saber.png")} />
      <Image source={require("@assets/carregando-respostas.png")} style={styles.image}/>

      <View style={{width: "100%"}}>
        <Text style={styles.subtitle}>Carregando...</Text>
        <Text style={styles.title}>Isto pode demorar alguns segundos</Text>

        <ProgressBar progress={20} color={colors.primaryPurple} />
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: colors.backgroundGrey,
    alignItems: "center",
    justifyContent: "space-between"
  },
  image: {
    width: 200,
    height: 190,
    resizeMode: "contain"
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 30,
  },
  subtitle: {
    marginBottom: 10,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    color: colors.subtitle,
  },
})