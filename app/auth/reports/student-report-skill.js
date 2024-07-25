import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import RenderHtml from "react-native-render-html";

import { getStudentQuestions } from "@services/reports";
import UserContext from "@context/user-context.js";
import { QuestionContent } from "@components/reports/QuestionContent";
import Header from "@components/Header.js";
import Loading from "@components/Loading.js";
import MainDropdown from "@components/MainDropdown.js";
import colors from "@constants/colors.js";
import { modalSubtitle, modalTitle } from "@constants/styles";
import { getDisciplineTitle } from "@constants/disciplines.js";
import { customLabel } from "@utils/customLabel";

const width = Dimensions.get("window").width * 0.8;

export default function studentReportSkill() {
  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [Questions, setQuestions] = useState([]);

  useEffect(() => {
    const getReport = async () => {
      try {
        setIsLoading(true);
        const { data: studentQuestions } = await getStudentQuestions(user.token, {
          examId: params.examId,
          studentId: params.studentId
        });
        setQuestions(studentQuestions.questoes.filter(
          ({ codigo_habilidade }) => codigo_habilidade === params.codeQuestion
        ));
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
      params: {
        ...params,
      }
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Stack.Screen options={{
        title: "Aproveitamento nesta habilidade",
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />
      <ScrollView>
        <Header
          title={params.examName}
          discipline={getDisciplineTitle(params.discipline)}
          handleSeeQuestions={handleSeeQuestions}
          schoolName={params.schoolName}
          className={params.className}
        />
        {!isLoading && Questions.length > 0 &&
        <View style={styles.mainContent}>
          <Text style={modalTitle}> Habilidade </Text>
          <View style={styles.skillContainer}>
            {<RenderHtml
              source={{ 
                html: `<strong>${params.codeQuestion} - </strong>${Questions[0].habilidade } ` 
              }}
              contentWidth={width}
              ignoredDomTags={["font"]}
            />}
          </View>
          <Text style={modalTitle}> Questões desta habilidade </Text>
          <Text style={modalSubtitle}> Respostas de {params.student} </Text>

          {Questions.map((question, questionIndex) =>
            <MainDropdown
              style={styles.mainDropdownStyles}
              key={question.id}
              customLabel={customLabel(questionIndex + 1, question)}
              showSkirt
            >
              <QuestionContent
                questionContentSkill
                index={questionIndex}
                questions={Questions}
                width={width}
              />
            </MainDropdown>
          )}
        </View>
        }
      </ScrollView>
      {
        isLoading &&
                <Loading />
      }
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  mainContent: {
    gap: 20,
    paddingHorizontal: 20,
  },
  mainDropdownStyles: {
    marginBottom: 10,
  },
  safeAreaView: {
    backgroundColor: colors.backgroundGrey,
    flex: 1,
  },
  skillContainer: {
    backgroundColor: colors.secondaryBlue,
    borderRadius: 10,
    flexDirection: "row",
    padding: 10
  },
});