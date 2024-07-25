import { Pressable, StyleSheet, Text, View } from "react-native";
import { VictoryPie } from "victory-native";
import colors from "@constants/colors";

export default function AnswerReport({ generalReportByQuestion }) {
  const { acertos: rights, erros: wrongs, em_branco: blank } = generalReportByQuestion;
  const chartData = [
    { x: "wrongs", y: rights, fill: colors.primaryGreen },
    { x: "rights", y: wrongs, fill: colors.primaryRed },
    { x: "Blank", y: blank, fill: '#f5f5f5' }
  ];
  const total = rights + wrongs + blank

  return (
    <View>
      <View style={styles.graph}>
        <VictoryPie
          width={300}
          height={300}
          innerRadius={95}
          labelComponent={''}
          data={chartData}
          style={{
            data: {
              fill: ({ datum }) => datum.fill,
            }
          }}
        />
        <View style={styles.textGraphContainer}>
          <View style={styles.numberOfHits}>
            <Text style={styles.generalHitsRights}>
              {rights}
            </Text>
            <Text style={styles.generalQuestionsText}>
              /{total}
            </Text>
          </View>
          <Text style={styles.subtitle}>
            {rights === 1 ? 'Acerto' : 'Acertos'}
          </Text>
        </View>
      </View>

      <View style={styles.numberHitsCard}>
        <Pressable style={styles.card}>
          <Text style={[styles.cardText, { color: colors.primaryGreen }]}>
            {rights} {rights === 1 ? 'Acerto' : 'Acertos'}
          </Text>
        </Pressable>
        <Pressable style={[styles.card, { backgroundColor: colors.secondaryRed }]}>
          <Text style={[styles.cardText, { color: colors.primaryRed }]}>
            {wrongs} {wrongs === 1 ? 'Erro' : 'Erros'}
          </Text>
        </Pressable>
        <Pressable
          style={[styles.card, { backgroundColor: '#fff' }]}>
          <Text style={[styles.cardText, { color: colors.greyBlue }]}>
            {blank} {blank === 1 ? 'Branco' : 'Brancos'}
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  graph: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  textGraphContainer: {
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
  },
  numberOfHits: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  generalHitsRights: {
    fontFamily: "Nunito_700Bold",
    color: colors.primaryGreen,
    fontSize: 32
  },
  generalQuestionsText: {
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle,
    fontSize: 17
  },
  subtitle: {
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle,
    fontSize: 16
  },
  numberHitsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 32
  },
  card: {
    backgroundColor: colors.secondaryGreen,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 46,
    gap: 10,
    borderRadius: 12,
    elevation: 2,
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 3, height: 10 },
  },
  cardText: {
    textAlign: 'center',
    fontFamily: "Nunito_700Bold",
    fontSize: 14
  }
})
