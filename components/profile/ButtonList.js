import { Text, View, TouchableOpacity, StyleSheet } from "react-native";

import ChevronIcon from "@icons/Chevron.js";
import colors from "@constants/colors.js";

export default function ButtonList(props) {
  return (
    <View style={[styles.listContainer, props.containerStyle]}>
      {props.buttons.map((button, index) => (
        <TouchableOpacity
          key={`button-${index}`}
          onPress={button?.onPress && button?.onPress}
          disabled={!button?.onPress}
          style={index < props.buttons.length - 1 && styles.buttonBorder}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.textArea}>
              {button?.prepend}

              {
                button?.title &&
                <Text style={[styles.title, button?.prepend && styles.titleWithMarginLeft, button.titleStyle]}>
                  {button.title}
                </Text>
              }

              {
                button?.text &&
                <Text >
                  {button.text}
                </Text>
              }
            </View>

            <View style={styles.appendArea}>
              {(button?.onPress || button.append) &&
                (button?.append || <ChevronIcon style={styles.chevron} />)
              }
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  )
};

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 3, height: 10 },
    elevation: 4,
  },
  buttonContainer: {
    height: 64,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderStyle: "solid"
  },
  textArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    flex: 1,
    marginRight: 12,
  },
  titleWithMarginLeft: {
    marginLeft: 20,
  },
  appendArea: {
    marginLeft: 6,
  },
  chevron: {
    transform: [{ rotate: "-90deg" }],
  }
})