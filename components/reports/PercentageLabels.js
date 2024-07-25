import { View, Text, ScrollView, StyleSheet } from "react-native";

import colors from "@constants/colors";

export default function PercengageLabels() {
  const percentages = [
    {
      text: "0 - 24%",
      label: "Nível 1",
      color: colors.primaryRed,
      backgroundColor: colors.secondaryRed
    },
    {
      text: "25 - 49%",
      label: "Nível 2",
      color: colors.primaryYellow,
      backgroundColor: colors.secondaryYellow
    },
    {
      text: "50 - 74%",
      label: "Nível 3",
      color: colors.primaryBlue,
      backgroundColor: colors.secondaryBlue
    },
    {
      text: "75 - 100%",
      label: "Nível 4",
      color: colors.primaryGreen,
      backgroundColor: colors.secondaryGreen
    },
  ];
  return (
    <ScrollView horizontal contentContainerStyle={styles.contentWrapper}>
      {percentages.map(percentage => (
        <View style={styles.percentageContainer} key={percentage.label}>
          <Text style={[
            styles.title,
            { backgroundColor: percentage.backgroundColor, color: percentage.color }
          ]}>
            {percentage.text}
          </Text>
          <View style={[styles.divider, { borderBottomColor: percentage.color }]} />
          <Text style={styles.label}>{percentage.label}</Text>
        </View>
      ))}
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  contentWrapper: {
    gap: 12
  },
  percentageContainer: {
    borderRadius: 12,
    overflow: "hidden"
  },
  title: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    fontFamily: "Nunito_700Bold"
  },
  label: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    textAlign: "center",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 14,
    backgroundColor: "#F0F4F8",
    color: colors.greyBlue
  },
  divider: {
    flex: 1,
    borderBottomWidth: 1,
  }
})