import { useEffect, useState, useContext } from "react";
import { Text, ScrollView, StyleSheet, SafeAreaView, View, Dimensions } from "react-native";
import { Stack, useLocalSearchParams, router } from "expo-router";
import RenderHtml from 'react-native-render-html';

import { getQuestions } from "@services/reports";
import { getQuestionQualitativeReport } from "@services/reports.js";
import UserContext from "@context/user-context.js";
import Loading from "@components/Loading.js";
import Header from "@components/Header.js";
import MainDropdown from "@components/MainDropdown.js";
import AnswerReport from "@components/reports/AnswersReport";
import ButtonList from "@components/profile/ButtonList.js";
import QuestionNavigation from "@components/reports/QuestionNavigation";
import { QuestionContent } from "@components/reports/QuestionContent";
import { getDisciplineTitle } from "@constants/disciplines.js";
import { modalTitle, modalSubtitle } from "@constants/styles";
import colors from "@constants/colors.js";
import { alternativesLabel, createButtons } from "@utils/createButtons";
import { formatSkillCode } from "@utils/formatTextHtml";

const width = Dimensions.get('window').width * 0.8;

export default function questionsSkill() {
    const params = useLocalSearchParams();
    const [page, setPage] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [generalReportByQuestion, setGeneralReportByQuestion] = useState({});
    const [percentagePerAlternative, setPercentagePerAlternative] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { user } = useContext(UserContext);

    const getQuestion = async (questionId) => {
        try {
            setIsLoading(true);
            const { data: question } = await getQuestionQualitativeReport(user.token, {
                examId: params.examId,
                schoolId: params.schoolId,
                classId: params.classId,
                questionId
            });
            setGeneralReportByQuestion(question.aproveitamento);
            setPercentagePerAlternative(question.alternativas_marcadas);
        } catch (error) {
            console.error("Ver questao: ", error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        const getAllQuestions = async () => {
            try {
                setIsLoading(true);
                const { data: questions } = await getQuestions(user.token, {
                    examId: params.examId
                });
                const filteredQuestions = questions.questoes.filter(
                    ({ codigo_habilidade }) => codigo_habilidade === params.codeQuestion
                );
                setQuestions(filteredQuestions);
                getQuestion(filteredQuestions[page].id);
            } catch (error) {
                console.error("Ver questões: ", error)
            }
        };
        getAllQuestions();
    }, []);

    const handleSeeQuestions = () => {
        router.push({
            pathname: "auth/reports/see-questions",
            params
        });
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{
                title: "Questões",
                headerTintColor: '#fff',
                headerTitleStyle: {
                    color: "#fff",
                    fontFamily: "Nunito_600SemiBold"
                }
            }} />
            <ScrollView contentContainerStyle={styles.mainContainer}>
                <Header
                    title={params.examName}
                    discipline={getDisciplineTitle(params.discipline)}
                    handleSeeQuestions={handleSeeQuestions}
                    schoolName={params.schoolName}
                    className={params.className}
                />
                {!isLoading && questions.length ?
                    <View style={styles.mainContent}>
                        <Text style={modalTitle}>Habilidade</Text>
                        <View style={styles.skillContainer}>
                            <RenderHtml
                                source={{
                                    html: formatSkillCode(
                                        questions[page].codigo_habilidade,
                                        questions[page].habilidade)
                                }}
                                contentWidth={width}
                                ignoredDomTags={["font"]}
                            />
                        </View>

                        <QuestionNavigation
                            getQuestion={getQuestion}
                            page={page}
                            questions={questions}
                            setPage={setPage}
                        />
                        <AnswerReport generalReportByQuestion={generalReportByQuestion} />

                        <QuestionContent
                            questions={questions}
                            index={page}
                            width={width}
                            addPadding
                        />

                        <Text style={modalTitle}> Alternativas marcadas </Text>
                        <Text style={modalSubtitle}> Respostas dos alunos nesta questão </Text>
                        {Object.keys(percentagePerAlternative).map(letter =>
                            <MainDropdown
                                style={styles.dropdowns}
                                key={letter}
                                showSkirt
                                customLabel={alternativesLabel(
                                    letter,
                                    percentagePerAlternative[letter].aproveitamento,
                                    percentagePerAlternative[letter].alunos.length
                                )}
                                containerStyle={{ paddingVertical: 12 }}
                                dropdownStyle={{ padding: 0 }}
                            >
                                <ButtonList
                                    buttons={createButtons(
                                        percentagePerAlternative[letter].alunos,
                                        percentagePerAlternative[letter].aproveitamento,
                                        "/auth/reports/student-report",
                                        params
                                    )}
                                />
                            </MainDropdown>
                        )}
                    </View> : null
                }
            </ScrollView>

            {isLoading &&
                <Loading />
            }

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    mainContainer: {
        paddingBottom: 90,
        backgroundColor: colors.backgroundGrey
    },
    mainContent: {
        paddingHorizontal: 16,
        gap: 16,
    },
    skillContainer: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: colors.secondaryGreyBlue,
        marginBottom: 10
    },
    skillCode: {
        position: "absolute",
        marginLeft: 100,
        backgroundColor: "#EEE0FF",
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 12,
    },
    label: {
        fontSize: 16,
        fontFamily: "Nunito_600SemiBold"
    },
    dropdowns: {
        marginTop: 12,
    },
})