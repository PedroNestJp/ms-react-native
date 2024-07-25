import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';

import { formatAlternativesCode, formatCommentCode } from "@utils/formatTextHtml";
import colors from "@constants/colors.js";

export const QuestionContent = ({
  questionContentSkill,
  questions,
  index,
  width,
  addPadding = false
}) => {
  if (!questions || !questions[index]) {
    return null;
  }
  
  const renderQuestionContentSkill = () => {
    return (
      <View style={styles.skillContainer} >
        <Text
          style={styles.skillTitle}>
          Habilidade - {questions[index].codigo_habilidade}
        </Text>
        <RenderHtml
          source={{ html: questions[index].habilidade }}
          contentWidth={width}
          ignoredDomTags={["font"]}
        />
      </View >
    )
  }

  const question = questions[index];

  return (
    <View style={[styles.contentTemplate, addPadding && { padding: 16 }]}>
      {questionContentSkill && renderQuestionContentSkill()}
      <RenderHtml
        source={{ html: question.descricao }}
        contentWidth={width}
        ignoredDomTags={["font"]}
      />
      {
        question.alternativas && Object.keys(question.alternativas).map((alternative, index) => (
          <RenderHtml
            key={`option-${index}`}
            source={{
              html: formatAlternativesCode(
                question.alternativas[alternative],
                alternative)
            }}
            contentWidth={width}
            ignoredDomTags={["font"]}
          />
        ))
      }
      <Text style={styles.answerAndCommentText}>Gabarito e comentário</Text>
      <View style={styles.answerContainer}>
        <RenderHtml
          source={{
            html: formatAlternativesCode(
              question.alternativas[question.gabarito],
              question.gabarito)
          }}
          contentWidth={width}
          ignoredDomTags={["font"]}
          tagsStyles={{ p: { textAlign: "center" } }}
        />
      </View>
      <View style={styles.commentContainer}>
        <RenderHtml
          source={{
            html: formatCommentCode(
              'Comentário',
              question.comentario)
          }}
          contentWidth={width}
          ignoredDomTags={["font"]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skillContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.secondaryGreyBlue
  },
  skillTitle: {
    fontFamily: "Nunito_700Bold"
  },
  answerAndCommentText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontFamily: "Nunito_600SemiBold"
  },
  commentContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.secondaryGreyBlue
  },
  contentTemplate: {
    backgroundColor: '#fff',
    borderRadius: 8
  },
  answerContainer: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: colors.secondaryGreen,
    marginBottom: 10,
  }
})