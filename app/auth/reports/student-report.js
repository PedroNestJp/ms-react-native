import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";

import {
  getStudentQuestions,
  getStudentReport,
  getStudentResponse,
  getStudentResponsesSkill
} from "@services/reports";
import Header from "@components/Header.js";
import PercentageCard from "@components/reports/PercentageCard";
import AnswerReport from "@components/reports/AnswersReport";
import QualitativeQuestions from "@components/reports/QualitativeQuestions";
import Loading from "@components/Loading.js";
import MainDropdown from "@components/MainDropdown.js";
import { QuestionContent } from "@components/reports/QuestionContent";
import colors from "@constants/colors.js";
import { modalSubtitle, modalTitle } from "@constants/styles";
import { getDisciplineTitle } from "@constants/disciplines.js";
import UserContext from "@context/user-context.js";
import { customLabel } from "@utils/customLabel";

const width = Dimensions.get("window").width * 0.8;

export default function StudentReport() {

  const REPORT_TYPES = {
    quantitative: "Quantitativo",
    qualitative: "Qualitativo",
  };
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [reportType, setReportType] = useState(REPORT_TYPES.quantitative);
  const [isLoading, setIsLoading] = useState(false);
  const [Question, setQuestion] = useState([]);
  const [studentResponse, setStudentResponse] = useState({});
  const [studentsReport, setStudentsReport] = useState([]);
  const [responsesSkill, setResponsesSkill] = useState([]);

  useEffect(() => {
    const getReport = async () => {
      try {
        setIsLoading(true);
        const { data: studentsReport } = await getStudentReport(user.token, {
          examId: params.examId,
          studentId: params.studentId
        });
        const { data: studentResponse } = await getStudentResponse(user.token, {
          examId: params.examId,
          studentId: params.studentId
        });
        const { data: questions } = await getStudentQuestions(user.token, {
          examId: params.examId,
          studentId: params.studentId
        });
        const { data: skill } = await getStudentResponsesSkill(user.token, {
          examId: params.examId,
          studentId: params.studentId
        });
        setStudentsReport(studentsReport);
        setStudentResponse(studentResponse);
        setQuestion(questions.questoes);
        setResponsesSkill(skill);
      } catch (error) {
        console.error("Repostas: ", error);
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
    <View>
      <Stack.Screen options={{
        title: params.student,
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
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
          <View style={styles.titleAndSubtile}>
            <Text style={modalTitle}> {params.student} </Text>
            <Text style={modalSubtitle}> Resultado Final </Text>
          </View>
          <ScrollView contentContainerStyle={styles.overallPercentagesContainer} horizontal>
            <PercentageCard
              percentage={studentsReport.aproveitamento_aluno}
              type="achivimentStudent"
              styleType='achievement'
            />
            <PercentageCard
              percentage={studentsReport.aproveitamento_turma}
              type="achivimentClass"
              styleType='achievement'
            />
          </ScrollView>

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
            <View>
              <Text style={modalTitle}>Aproveitamento por questões</Text>
              <AnswerReport generalReportByQuestion={studentResponse} />

              {!isLoading && Question.map((question, questionIndex) =>
                <MainDropdown
                  style={styles.mainDropdownStyles}
                  key={question.id}
                  customLabel={customLabel(questionIndex + 1, question)}
                  showSkirt
                >
                  <QuestionContent
                    questionContentSkill
                    questions={Question}
                    index={questionIndex}
                    width={width}
                  />
                </MainDropdown>
              )
              }
            </View>
            :
            <View>
              <Text style={modalSubtitle}>Aproveitamento por Habilidade</Text>
              <QualitativeQuestions
                containerStyles={styles.questionsReport}
                list={responsesSkill}
                params={params}
                goTo={"auth/reports/student-report-skill"}
              />
            </View>
          }
        </View>
      </ScrollView >
      { isLoading && <Loading /> }
    </View>
  );
}

const styles = StyleSheet.create({
  chooseReportType: {
    backgroundColor: colors.reportTypeButton,
    borderRadius: 12,
    flexDirection: "row",
    padding: 20
  },
  contentWrapper: {
    backgroundColor: colors.backgroundGrey,
    paddingBottom: 90
  },
  mainContent: {
    gap: 24,
    paddingHorizontal: 20,
  },
  mainDropdownStyles: {
    marginBottom: 20,
  },
  overallPercentagesContainer: {
    gap: 10,
  },
  questionsReport: {
    marginBottom: 40,
    marginTop: 20,
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
    shadowRadius: 20,
  },
  reportTypeButtonText: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    textAlign: "center"
  },
  titleAndSubtile: {
    gap: 6
  },
});

