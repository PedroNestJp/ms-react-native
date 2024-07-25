import { StyleSheet, Text, View } from "react-native";
import colors from "@constants/colors.js";

const options = ["A", "B", "C", "D"];

const AnswerOption = ({ option, correctAnswer, studentAnswer }) => {
    const containerStyle = { ...styles.answersTextContainer };
    const textStyle = { ...styles.answersText };

    if (option === correctAnswer) {
        containerStyle.backgroundColor = "#fff";
        containerStyle.borderColor = colors.primaryGreen;
        textStyle.color = colors.subtitle;
        if (option === studentAnswer) {
            containerStyle.backgroundColor = colors.primaryGreen;
            textStyle.color = "#fff";
        }
    } else if (option === studentAnswer) {
        containerStyle.backgroundColor = colors.primaryRed;
        containerStyle.borderColor = colors.primaryRed;
        textStyle.color = "#fff";
    } else {
        containerStyle.borderColor = colors.subtitle;
        textStyle.color = colors.subtitle;
    }

    return (
        <View style={containerStyle}>
            <Text style={textStyle}>
                {option}
            </Text>
        </View>
    );
}


export const customLabel = (questionNumber, question) => (
    <View style={styles.labelContainer}>
        <Text style={styles.label}>Questão {questionNumber}</Text>
        <View style={styles.questionAnswers}>
            {options.map(option => (
                <AnswerOption
                    key={option}
                    option={option}
                    correctAnswer={question.gabarito}
                    studentAnswer={question.alternativa_marcada}
                />
            ))}
        </View>
    </View>
);

const styles = StyleSheet.create({
    answersTextContainer: {
        marginHorizontal: 4,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderColor: colors.subtitle,
    },
    answersText: {
        fontSize: 12,
        fontFamily: "Nunito_400Regular",
    },
    labelContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    questionAnswers: {
        position: "absolute",
        flexDirection: "row",
        marginLeft: 88,
        paddingVertical: 12,
    },
    label: {
        fontSize: 16,
        fontFamily: "Nunito_600SemiBold",
    },
})
