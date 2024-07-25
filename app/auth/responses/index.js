import { Text, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { Stack, router, usePathname } from "expo-router";
import colors from "@constants/colors";
import { useEffect, useState, useContext } from "react";

import CardButton from "@components/CardButton.js";
import { PORTUGUESE_ID, MATH_ID } from "@constants/disciplines.js";
import { getDisciplinesList } from "@services/profile.js";
import Loading from "@components/Loading.js";
import UserContext from "@context/user-context.js";

export default function Responses() {
  const { user } = useContext(UserContext);
  const [teacherDisciplines, setTeacherDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const newPath = usePathname();

  const goToExams = (discipline) => {
    return router.push({
      pathname: "auth/responses/select-class",
      params: { discipline }
    })
  };

  useEffect(() => {
    if (newPath !== "/auth/responses") return;
    const getDisciplines = async () => {
      try {
        setIsLoading(true);
        const { data: { disciplinas: disciplines } } = await getDisciplinesList(user.token);
        setTeacherDisciplines(disciplines);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDisciplines();
  }, [newPath]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: "Componentes curriculares",
        headerTintColor: '#fff',
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
  )
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 30,
    fontSize: 20,
    fontFamily: "Nunito_700Bold"
  },
  contentWrapper: {
    paddingTop: 24,
    paddingHorizontal: 20,
    minHeight: "100%",
    backgroundColor: colors.backgroundGrey
  },
  cards: {
    maxWidth: "100%",
    marginBottom: 20
  },
})