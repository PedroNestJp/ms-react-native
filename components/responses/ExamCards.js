import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProgressBar from "@components/ProgressBar.js"
import colors from "@constants/colors.js";

export default function ExamCards(props) {
  const CARD_CONFIG = {
    open: {
      status: "Aberta",
      color: colors.primaryBlue,
      secondaryColor: colors.secondaryBlue,
      disabled: false
    },
    finished: {
      status: "Concluída",
      color: colors.primaryGreen,
      secondaryColor: colors.secondaryGreen,
      disabled: false
    },
    expired: {
      status: "Expirada",
      color: colors.primaryRed,
      secondaryColor: colors.secondaryRed,
      disabled: true
    },
    waiting: {
      status: "Aguardando",
      color: colors.primaryYellow,
      secondaryColor: colors.secondaryYellow,
      disabled: true
    },
  };

  const getDescription = () => {
    if (props.type === "expired") {
      return "Expirada";
    } else if (props.type === "waiting") {
      return "Aguardando Liberação";
    } else {
      return props.description;
    }
  }
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[
        styles.container,
        { 
          borderColor: CARD_CONFIG[props.type].color,
          opacity: CARD_CONFIG[props.type].disabled ? 0.5 : 1
        },
        props.style
      ]}
      disabled={CARD_CONFIG[props.type].disabled}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{getDescription()}</Text>

      <ProgressBar
        color={CARD_CONFIG[props.type].color}
        style={styles.progressBar}
        progress={props.progress}
      />

      <View style={styles.footer}>
        <View style={styles.deadline}>
          <Text style={styles.deadlineText}>Prazo: {props.date.start} - {props.date.end}</Text>
        </View>

        <View style={[
          styles.status,
          { backgroundColor: CARD_CONFIG[props.type].secondaryColor }
        ]}>
          <Text style={[
            styles.statusText,
            { color: CARD_CONFIG[props.type].color }
          ]}>
            {CARD_CONFIG[props.type].status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 22,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderLeftWidth: 4,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 20 },
    elevation: 4
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginBottom: 10
  },
  description: {
    fontSize: 16,
    marginBottom: 14,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  progressBar: {
    marginBottom: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  deadline: {
    borderColor: colors.greyBlue,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 10,
    flex: 1,
    marginRight: 8,
  },
  deadlineText: {
    color: colors.greyBlue,
    fontFamily: "Nunito_400Regular"
  },
  status: {
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  statusText: {
    fontFamily: "Nunito_600SemiBold"
  }
})