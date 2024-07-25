import { ScrollView, SafeAreaView, Text, View, StyleSheet, Image } from "react-native";
import { router, Stack, useLocalSearchParams } from "expo-router";
import MainButton from "@components/forms/MainButton.js"
import colors from "@constants/colors.js";
import WarningIcon from "@icons/Warning.js";

export default function ScanInstructions(props) {
  const params = useLocalSearchParams();

  const instructions = [
    {
      image: require("@assets/escanear-correto.png"),
      title: "Enquadre seu documento",
      subtitle: "Enquadre o conteúdo do cartão resposta em um ambiente bem iluminado, liso e sem outras documentos ou folhas por perto."
    },
    {
      image: require("@assets/escanear-sombra.png"),
      title: "Evite sombras",
      subtitle: "Não deixe que um objeto ou seu próprio corpo faça sombras no cartão de respostas."
    },
    {
      image: require("@assets/escanear-inclinado.png"),
      title: "Não deixe a folha inclinada",
      subtitle: "Deixe a folha reta, No mesmo plano da câmera do celular."
    },
  ];

  const handleGoToScanPage = () => {
    delete params.error;
    router.push({
      pathname: "/auth/responses/scan-responses",
      params: { 
        ...params
      }
    })
  };

  return (
    <SafeAreaView>
      <Stack.Screen options={{
        title: "Instruções",
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />

      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.warning, params.error && styles.error]}>
          <WarningIcon color={params.error ? colors.primaryRed : "#000"}/>
          <Text style={styles.instructionsTitle}>
            { params.error ? "Erro na leitura do gabarito" : "Atente-se às instruções a seguir" }
          </Text>
        </View>

        {instructions.map((instruction, index) => (
          <View key={instruction.title + index} >
            <Text style={styles.title}>{instruction.title}</Text>
            <Text style={styles.subtitle}>{instruction.subtitle}</Text>
            <Image source={instruction.image} style={styles.images} />

            {index < instructions.length - 1 && (
              <View style={styles.divider} />
            )}
          </View>
        ))}

      </ScrollView>
      <MainButton
        style={styles.scanButton}
        label="Escanear cartão de resposta"
        onPress={handleGoToScanPage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundGrey,
    paddingVertical: 20,
    paddingBottom: 60,
  },
  divider: {
    borderBottomColor: "#0002",
    borderBottomWidth: 1,
    marginBottom: 30,
    marginHorizontal: 20,
  },
  images: {
    height: 220,
    marginBottom: 20,
    resizeMode: "contain",
    width: "100%",
    flex: 1
  },
  instructionsTitle: {
    marginLeft: 10,
    fontFamily: "Nunito_400Regular"
  },
  subtitle: {
    color: "#404040",
    fontFamily: "Nunito_400Regular",
    lineHeight: 22,
    marginBottom: 16,
    marginHorizontal: 20
  },
  title: {
    color: colors.primaryPurple,
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginBottom: 6,
    marginHorizontal: 20
  },
  warning: {
    alignItems: "center",
    backgroundColor: "#F9ECCD",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  error: {
    backgroundColor: "#FCEEEE",
    paddingVertical: 16
  },
  scanButton: {
    marginLeft: "10%",
    width: "80%",
    position: "absolute",
    bottom: 10
  }
});