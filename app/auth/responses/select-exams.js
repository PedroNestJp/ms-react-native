import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams, usePathname } from "expo-router";
import { useContext, useEffect, useState } from "react";
import UserContext from "@context/user-context.js";

import { getDisciplineTitle } from "@constants/disciplines.js";
import Loading from "@components/Loading.js";
import ExamCards from "@components/responses/ExamCards.js";
import Header from "@components/Header.js";
import colors from "@constants/colors.js";
import api from "@services/api.js";
import EmptyState from "@components/EmptyState.js";

export default function Exams() {
  const params = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [exams, setExams] = useState([]);
  const { user } = useContext(UserContext);
  const EXAM_STATUS = {
    "Expirado": "expired",
    "Aberto": "open",
    "Aguardando": "waiting",
  };
  const newPath = usePathname();

  useEffect(() => {
    if (newPath !== '/auth/responses/select-exams') {
      return;
    }

    const getExams = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(
          `/avaliacoes?disciplina=${params.discipline}&escola=${params.schoolId}&turma=${params.schoolClassId}`, {
          headers: {
            "Authorization": "Bearer " + user.token
          }
        });
        setExams(data.avaliacoes);
        console.log(data.avaliacoes)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Avaliações: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getExams();
  }, [usePathname()]);

  const allExams = exams.map(exam => (
    <ExamCards
      key={exam.nome + exam.id}
      type={exam.concluida ? "finished" : EXAM_STATUS[exam.tipo]} // remove === "true" BUG
      title={exam.nome}
      description={`${exam.alunos_entregues}/${exam.alunos_total} Gabaritos Corrigidos`}
      date={{ start: exam.data_inicio.slice(0, 5), end: exam.data_fim.slice(0, 5) }}
      progress={Number.isNaN((exam.alunos_entregues / exam.alunos_total) * 100) ? 0 : (exam.alunos_entregues / exam.alunos_total) * 100}
      style={styles.examCards}
      onPress={() => router.push({
        pathname: "/auth/responses/see-students",
        params: {
          discipline: params.discipline,
          start: exam.data_inicio,
          end: exam.data_fim,
          examId: exam.id,
          examName: exam.nome,
          examFinished: exam.concluida,
          schoolId: params.schoolId,
          schoolClassId: params.schoolClassId,
          className: params.className
        }
      })}
    />
  ));

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen options={{
        title: "Avaliações",
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        },
      }} />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Header
          discipline={getDisciplineTitle(params.discipline)}
          schoolName={params.schoolName}
          className={params.className}
        />
        {isLoading ?
          <Loading /> :
          exams.length ?
            <View style={styles.examsContainer}>
              <Text style={styles.title}>Todas as avaliações</Text>
              {!isLoading &&
                allExams
              }
            </View> :
            <EmptyState text="Não encontramos avaliações por aqui..." />
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentWrapper: {
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%"
  },
  examCards: {
    marginBottom: 16
  },
  examsContainer: {
    paddingHorizontal: 20,
  },
  safeAreaContainer: {
    flex: 1
  },
  subtitle: {
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular",
    fontSize: 16
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginBottom: 30
  },
});