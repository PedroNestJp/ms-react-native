import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";

import {
  getQuestionQuantitativeReport,
  getSkillsQualitativeReport,
  getStudentQuantitativeReport
} from "@services/reports.js";
import Loading from "@components/Loading.js";
import Header from "@components/Header.js";
import PercentageCard from "@components/reports/PercentageCard.js";
import PercentageLabels from "@components/reports/PercentageLabels.js";
import QuantitativeQuestions from "@components/reports/QuantitativeQuestions";
import QualitativeQuestions from "@components/reports/QualitativeQuestions";
import MainDropdown from "@components/MainDropdown.js";
import ButtonList from "@components/profile/ButtonList.js";
import { getDisciplineTitle } from "@constants/disciplines.js";
import colors from "@constants/colors.js";
import { modalSubtitle, modalTitle, safeAreView } from "@constants/styles";
import UserContext from "@context/user-context.js";
import { createButtons } from "@utils/createButtons";
import { studentsLabel } from "@utils/createButtons";

export default function SeeExamReport() {
  const REPORT_TYPES = {
    quantitative: "Quantitativo",
    qualitative: "Qualitativo",
  };
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [reportType, setReportType] = useState(REPORT_TYPES.quantitative);
  const [generalReport, setGeneralReport] = useState({});
  const [questionsReport, setQuestionsReport] = useState([]);
  const [studentsReport, setStudentsReport] = useState({});
  const [skillsReport, setSkillsReport] = useState([]);

  useEffect(() => {
    const getReport = async () => {
      try {
        setIsLoading(true);
        const { data: questions } = await getQuestionQuantitativeReport(user.token, {
          examId: params.examId,
          schoolId: params.schoolId,
          classId: params.schoolClassId
        });
        const { data: students } = await getStudentQuantitativeReport(user.token, {
          schoolId: params.schoolId,
          classId: params.schoolClassId,
          examId: params.examId
        });
        const { data: skill } = await getSkillsQualitativeReport(user.token, {
          schoolId: params.schoolId,
          classId: params.schoolClassId,
          examId: params.examId,
          filtro: "bncc"
        });
        setGeneralReport(questions.aproveitamento_geral);
        setQuestionsReport(questions.questoes);
        setStudentsReport(students);
        setSkillsReport(skill);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getReport();
  }, []);

  const handleSeeQuestions = () => {
    router.push({
      pathname: "auth/reports/see-questions",
      params
    });
  };

  return (
    <SafeAreaView style={safeAreView}>
      <Stack.Screen options={{
        title: params.className,
        headerTintColor: colors.white,
        headerTitleStyle: {
          color: colors.white,
          fontFamily: "Nunito_600SemiBold"
        }
      }} />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Header
          title={params.examName}
          discipline={getDisciplineTitle(params.discipline)}
          handleSeeQuestions={handleSeeQuestions}
          schoolName={params.schoolName}
          className={params.className}
        />
        <View style={styles.mainContent}>
          <Text style={modalTitle}>No geral</Text>
          <ScrollView contentContainerStyle={styles.overallPercentagesContainer} horizontal>
            <PercentageCard percentage={generalReport.media_acertos} type="rights" />
            <PercentageCard percentage={generalReport.media_erros} type="errors" />
            <PercentageCard percentage={generalReport.media_em_branco} type="empty" />
          </ScrollView>

          <Text style={modalSubtitle}>Níveis de acerto</Text>
          <PercentageLabels />

          <Text style={modalTitle}>Relatório</Text>
          <View style={styles.chooseReportType}>
            {Object.keys(REPORT_TYPES).map((key, index) => (
              <TouchableOpacity
                style={[
                  styles.reportTypeButton,
                  reportType === REPORT_TYPES[key] &&
                  styles.reportTypeButtonSelected
                ]}
                onPress={() => setReportType(REPORT_TYPES[key])}
                key={index}
              >
                <Text style={styles.reportTypeButtonText}>
                  {REPORT_TYPES[key]}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {reportType === REPORT_TYPES.quantitative ?
            <View style={styles.reportContent}>
              <Text style={modalTitle}>Aproveitamento por questões</Text>
              <QuantitativeQuestions
                containerStyles={styles.questionsReport}
                list={questionsReport}
                params={params}
              />
              <Text style={modalTitle}>Aproveitamento por aluno</Text>
              <Text style={modalSubtitle}>Dividido por níveis de proficiência</Text>
              {Object.keys(studentsReport).map(level => (
                <MainDropdown
                  style={styles.dropdowns}
                  key={level}
                  showSkirt
                  customLabel={studentsLabel(level, studentsReport[level])}
                  containerStyle={styles.containerStyle}
                  dropdownStyle={styles.dropdownStyle}
                >
                  <ButtonList
                    buttons={createButtons(
                      studentsReport[level].alunos,
                      studentsReport[level].percentage,
                      "auth/reports/student-report",
                      params
                    )}
                    containerStyle={{ shadowOpacity: 0 }}
                  />
                </MainDropdown>
              ))}
            </View>
            :
            <View style={styles.reportContent}>
              <Text style={modalTitle}>Aproveitamento por Habilidade</Text>
              <QualitativeQuestions
                list={skillsReport}
                params={params}
                goTo={"auth/reports/see-questions-skill"}
              />
            </View>
          }
        </View>
      </ScrollView>

      {isLoading &&
        <Loading />
      }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chooseReportType: {
    backgroundColor: colors.secondaryGrey,
    borderRadius: 12,
    flexDirection: "row",
    padding: 20
  },
  containerStyle: {
    paddingVertical: 12
  },
  contentWrapper: {
    backgroundColor: colors.backgroundGrey,
    margin: 0,
    paddingBottom: 90
  },
  dropdownStyle: {
    padding: 0
  },
  mainContent: {
    gap: 32,
    paddingHorizontal: 16,
  },
  overallPercentagesContainer: {
    gap: 10,
  },
  reportContent: {
    gap: 28,
  },
  reportTypeButton: {
    borderRadius: 12,
    flex: 1,
    paddingVertical: 12
  },
  reportTypeButtonSelected: {
    backgroundColor: colors.white,
    elevation: 4,
    shadowOffset: { width: 3, height: 20 },
    shadowOpacity: 0.1,
    shadowRadius: 20
  },
  reportTypeButtonText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    textAlign: "center"
  }
});
