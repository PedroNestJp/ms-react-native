import { View, Text, Image, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { Stack } from "expo-router";
import colors from "@constants/colors.js";

export default function TermsOfUse() {
  const terms = {
    1: {
      title: "Aceitação dos Termos: Ao utilizar o Mais Saber Professor, você concorda com estes termos de uso."
    },
    2: {
      title: "Uso do Aplicativo:",
      terms: [
        "Permissão de Uso: Você tem permissão para utilizar o aplicativo de acordo com estes termos.",
        "Responsabilidade do Usuário: Você é responsável por todas as atividades realizadas por meio da sua conta."
      ]
    },
    3: {
      title: "Propriedade Intelectual:",
      terms: [
        "Direitos Autorais: Todo o conteúdo do Mais Saber Professor é protegido por direitos autorais.",
        "Restrições de Uso: Não reproduza, modifique ou explore comercialmente o conteúdo do aplicativo sem autorização."
      ]
    },
    4: {
      title: "Limitações de Responsabilidade:",
      terms: [
        "Disponibilidade do Serviço: Não garantimos disponibilidade contínua do aplicativo.",
        "Responsabilidade: Não nos responsabilizamos por danos decorrentes do uso ou impossibilidade de uso do aplicativo."
      ]
    },
    5: {
      title: "Disposições Gerais:",
      terms: [
        "Modificações: Podemos modificar estes termos de uso a qualquer momento.",
        "Legislação Aplicável: Estes termos são regidos pelas leis do país onde o aplicativo é disponibilizado.",
        "Contato: Entre em contato conosco se tiver dúvidas ou preocupações."
      ]
    },
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Stack.Screen options={{
          title: "Termos de uso",
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <Text style={styles.title}>Termos de uso</Text>
        {Object.keys(terms).map(key => (
          <>
            <Text style={styles.text} key={key}>
              {key}. {terms[key].title}
            </Text>

            {terms[key].terms && terms[key].terms.map(term => (
              <Text style={styles.termText}>{`\u2022 ${term}`}</Text>
            ))}
          </>
        ))}

        <Text style={styles.text}>
          Ao utilizar o Mais Saber Professor, você concorda em cumprir estes termos de uso. Reservamo-nos o direito de suspender ou encerrar o seu acesso ao aplicativo se houver violação dos termos.
        </Text>
        <Text style={styles.text}>
          Data de vigência: válido a partir de 08/02/2024. Última atualização: 08/02/2024
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%"
  },
  title: {
    marginBottom: 6,
    fontSize: 20,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  text: {
    lineHeight: 30,
    fontSize: 16,
    color: "#212121",
    fontFamily: "Nunito_400Regular"
  },
  termText: {
    lineHeight: 30,
    fontSize: 16,
    color: "#212121",
    fontFamily: "Nunito_400Regular",
    marginLeft: 20
  },
})