import { StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";

import colors from "@constants/colors.js";
import { modalSubtitle, modalTextsCard } from "@constants/styles";
import { getColors } from "@utils/getColors";

const StudentLevel = (level) => {
  const { containerStyle, text } = getColors(level);
  return (
    <View style={[styles.levelDropdownLevel, containerStyle]}>
      <Text style={[modalTextsCard, text]}>
        {Math.floor(level)}%
      </Text>
    </View>
  );
};

export const studentsLabel = (key, {
  titulo: level,
  porcentagem: percentage,
  alunos_total: total
}) => {
  const colors = getColors(key);
  return (
    <>
      <View style={[styles.levelDropdownLevel, colors.containerStyle]}>
        <Text style={[modalTextsCard, colors.text]}>
          {level}
        </Text>
      </View>
      <Text style={modalSubtitle}>
        {Math.floor(percentage)}% - {total} {total !== 1 ? "Alunos" : "Aluno"}
      </Text>
    </>

  );
};

export const alternativesLabel = (key, percentage, total) => (
  <>
    <View style={[styles.levelDropdownLevel, getColors(percentage).containerStyle]}>
      <Text style={getColors(percentage).text}> Letra {key}</Text>
    </View>
    <Text style={modalTextsCard}>
      {percentage}% - {total} {total > 1 ? "alunos" : "aluno"}
    </Text>
  </>
);

export const createButtons = (students, level, pathname, params) =>
  students.map(student => ({
    title: student.nome,
    text: StudentLevel(student.aproveitamento ?? level),
    onPress: () => router.push({
      pathname: pathname,
      params: {
        ...params,
        percentage: student.aproveitamento ?? level,
        student: student.nome,
        studentId: student.id,
      }
    })
  }));

const styles = StyleSheet.create({
  levelDropdownLevel: {
    backgroundColor: colors.secondaryRed,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10
  }
});
