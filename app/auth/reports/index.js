import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { Stack, router, usePathname } from "expo-router";
import colors from "@constants/colors";
import { useContext, useEffect, useState } from "react";

import CardButton from "@components/CardButton.js";
import { MATH_ID, PORTUGUESE_ID } from "@constants/disciplines.js";
import { getDisciplinesList } from "@services/profile.js";
import Loading from "@components/Loading.js";
import UserContext from "@context/user-context.js";
import { Alert } from "react-native";

export default function Reports() {
  const { user } = useContext(UserContext);
  const [teacherDisciplines, setTeacherDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const newPath = usePathname();

  const goToExams = (discipline) => {
    return router.push({
      pathname: "auth/reports/select-class",
      params: { discipline }
    });
  };

  useEffect(() => {
    if (newPath !== "/auth/reports") return;
    const getDisciplines = async () => {
      try {
        setIsLoading(true);
        const { data: { disciplinas: disciplines } } = await getDisciplinesList(user.token);
        setTeacherDisciplines(disciplines);
      } catch (error) {
        Alert.alert("Erro", "Ocorreu um erro ao buscar as disciplinas. Tente novamente mais tarde.");
      } finally {
        setIsLoading(false);
      }
    };
    getDisciplines();
  }, [newPath]);

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: "Componentes curriculares",
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Text style={styles.title}>Selecione uma disciplina</Text>
        {teacherDisciplines.some(discipline => discipline.id === PORTUGUESE_ID) &&
          <CardButton
            image={require("@assets/lingua-portuguesa.png")}
            title="Língua Portuguesa"
            style={styles.cards}
            onPress={() => goToExams(PORTUGUESE_ID)}
          />
        }
        {teacherDisciplines.some(discipline => discipline.id !== PORTUGUESE_ID) &&
          <CardButton
            image={require("@assets/matematica-calculadora.png")}
            title="Matemática"
            style={styles.cards}
            onPress={() => goToExams(MATH_ID)}
          />
        }
      </ScrollView>

      {isLoading &&
        <Loading />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cards: {
    marginBottom: 20,
    maxWidth: "100%"
  },
  contentWrapper: {
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingTop: 24
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginBottom: 30
  },
});