import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import colors from "@constants/colors.js";

export default function PrivacyPolicy() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Stack.Screen options={{
          title: "Políticas de Privacidade",
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />
        <View style={styles.textPadding}>
          <Text style={styles.title}>Privacidade - Mais Saber</Text>
          <Text style={styles.subtitle}>Termos legais</Text>
        </View>

        <Image
          source={require("@assets/politicas-privacidade.png")}
          style={styles.image}
        />

        <View style={styles.textPadding}>
          <Text style={styles.policyTitle}>Política de Privacidade</Text>
          <Text style={styles.text}>
            Política de Privacidade do Mais Saber Professor:
          </Text>
          <Text style={styles.text}>
            A privacidade dos usuários é de extrema importância para nós, desenvolvedores do aplicativo Mais Saber Professor. Esta política de privacidade descreve como coletamos, usamos e protegemos as informações pessoais fornecidas durante o uso do aplicativo. Ao utilizar o Mais Saber Professor, você concorda com a coleta e o uso das suas informações pessoais de acordo com esta política.
          </Text>
          <Text style={styles.boldText}>Coleta de Informações:</Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>1.1 </Text>
            Informações fornecidas pelos usuários: Durante o cadastro no Mais Saber Professor, podemos solicitar informações pessoais, como nome, e-mail e informações relacionadas ao perfil de professor. Essas informações são fornecidas voluntariamente pelos usuários e são necessárias para acessar as funcionalidades do aplicativo.
          </Text>
          <Text style={styles.text}>
            <Text style={styles.boldText}>1.2 </Text>
            Informações de uso: Coletamos informações sobre a utilização do aplicativo, como dados de acesso, atividades realizadas e interações com as funcionalidades do Mais Saber Professor. Essas informações são usadas para análise interna, melhoria contínua do aplicativo e personalização da experiência do usuário.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingVertical: 40,
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%"
  },
  textPadding: {
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 6,
    fontSize: 20,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  policyTitle: {
    marginTop: 30,
    marginBottom: 20,
    fontSize: 18,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  subtitle: {
    marginBottom: 14,
    fontSize: 16,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  text: {
    fontSize: 16,
    color: "#212121",
    fontFamily: "Nunito_400Regular",
    lineHeight: 30
  },
  boldText: {
    fontSize: 16,
    color: "#212121",
    fontFamily: "Nunito_600SemiBold",
    lineHeight: 30
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    flex: 1
  }
})