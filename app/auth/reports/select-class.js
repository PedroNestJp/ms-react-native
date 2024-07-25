import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { getDisciplineTitle } from "@constants/disciplines.js";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { mySchoolsAndClasses } from "@services/api.js";
import UserContext from "@context/user-context.js";
import MainDropdown from "@components/MainDropdown.js";
import Loading from "@components/Loading.js";
import colors from "@constants/colors.js";
import EmptyState from "@components/EmptyState.js";

export default function SelectClass() {
  const { user } = useContext(UserContext);
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useLocalSearchParams();

  useEffect(() => {
    const getSchools = async () => {
      try {
        const { data: { escolas } } = await mySchoolsAndClasses({
          disciplineId: params.discipline,
          token: user.token
        });

        setSchools(escolas);
      } catch (error) {
        console.error("Minhas escolas: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSchools();
  }, []);

  const schoolsDropdown = schools.map(school => (
    <MainDropdown
      style={styles.dropdownContainer}
      label={school.nome}
      dropdownStyle={styles.mainDropdownStyle}
      key={school.nome + school.id}
    >
      <MainDropdown
        label="Fundamental I"
        style={{ display: school.fundamentalI.length ? "flex" : "none" }}
        containerStyle={styles.innerDropdowns}
        dropdownStyle={styles.innerDropdownContainer}
      >
        {
          school.fundamentalI.map(schoolClass => (
            <TouchableWithoutFeedback
              style={styles.classLink}
              key={schoolClass.nome + schoolClass.id}
              onPress={() => {
                router.push({
                  pathname: "/auth/reports/select-exams",
                  params: {
                    className: schoolClass.nome,
                    schoolName: school.nome,
                    discipline: params.discipline,
                    schoolId: school.id,
                    schoolClassId: schoolClass.id_turma
                  }
                });
              }}
            >
              <View style={styles.classContainer}>
                <Text style={styles.schoolName}>
                  { schoolClass.nome }
                </Text>
                <View style={styles.classLinkCompletedTextContainer}>
                  <Text style={styles.classLinkCompletedText}>
                    {schoolClass.avaliacoes_entregues}/{schoolClass.avaliacoes_total}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </MainDropdown>

      <MainDropdown
        label="Fundamental II"
        style={{ display: school.fundamentalII.length ? "flex" : "none" }}
        containerStyle={styles.innerDropdowns}
        dropdownStyle={styles.innerDropdownContainer}
      >
        {
          school.fundamentalII.map(schoolClass => (
            <TouchableWithoutFeedback
              style={styles.classLink}
              key={schoolClass.nome + schoolClass.id}
              onPress={() => {
                router.push({
                  pathname: "/auth/responses/select-exams",
                  params: {
                    className: schoolClass.nome,
                    schoolName: school.nome,
                    discipline: params.discipline,
                    schoolId: school.id,
                    schoolClassId: schoolClass.id_turma
                  }
                });
              }}
            >
              <View style={styles.classContainer}>
                <Text style={styles.schoolName}>
                  { schoolClass.nome }
                </Text>
                <View style={styles.classLinkCompletedTextContainer}>
                  <Text style={styles.classLinkCompletedText}>
                    {schoolClass.avaliacoes_entregues}/{schoolClass.avaliacoes_total}
                  </Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ))
        }
      </MainDropdown>
    </MainDropdown>
  ));

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <Stack.Screen options={{
        title: `${getDisciplineTitle(params.discipline)} - Turmas`,
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Text style={styles.title}>Selecione uma turma</Text>

        <Text style={styles.subtitle}>Escolas</Text>
        
        {isLoading ?
          <Loading /> :
          schools.length ?
            schoolsDropdown :
            <EmptyState text="Não encontramos escolas por aqui..."/>
        }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  classContainer: {
    alignItems: "center",
    borderColor: colors.primaryPurple,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  classLink: {
    alignItems: "center",
    marginBottom: 12,
    width: "100%"
  },
  classLinkCompletedText: {
    color: colors.greyBlue,
    fontFamily: "Nunito_400Regular",
    fontSize: 12
  },
  classLinkCompletedTextContainer: {
    backgroundColor: colors.secondaryGreyBlue,
    borderRadius: 4,
    fontFamily: "Nunito_400Regular",
    paddingHorizontal: 12,
    paddingVertical: 6
  },
  contentWrapper: {
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingTop: 24
  },
  dropdownContainer: {
    marginBottom: 16
  },
  innerDropdownContainer: {
    marginBottom: 4
  },
  innerDropdowns: {
    borderBottomWidth: 1,
    borderColor: "#F0F3FD",
    borderTopWidth: 1,
    shadowOpacity: 0,
    elevation: 0
  },
  mainDropdownStyle: {
    marginHorizontal: "2%",
    padding: 0,
    width: "96%"
  },
  safeAreaContainer: {
    flex: 1,
  },
  schoolName: {
    fontFamily: "Nunito_400Regular"
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    fontSize: 18,
    marginBottom: 15
  },
  title: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginBottom: 30
  }
});