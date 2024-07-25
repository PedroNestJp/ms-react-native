import { TouchableOpacity, StyleSheet, View } from "react-native";

import colors from "@constants/colors.js";
import MainInput from "./MainInput";
import MagnifyGlass from "@icons/MagnifyGlass.js"
import Close from "@icons/Close.js"

export default function MainSearch({ value, style, placeholder, onChangeText, onPress, clear }) {
  const showClear = value.length > 0;
  return (
    <MainInput
      style={[style, styles.container]}
      inputStyle={styles.inputPadding}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    >
      <View style={styles.buttonsContainers}>
        {showClear &&
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clear}
          >
            <Close color={colors.greyBlue} />
          </TouchableOpacity>
        }

        <TouchableOpacity
          style={styles.searchButton}
          onPress={onPress}
        >
          <MagnifyGlass />
        </TouchableOpacity>
      </View>
    </MainInput>
  )
};

const styles = StyleSheet.create({
  container: {
    height: 56
  },
  inputPadding: {
    paddingVertical: 16
  },
  buttonsContainers: {
    position: "absolute",
    right: 0,
    top: -20,
    bottom: 0,
    width: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 14
  },
  searchButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  clearButton: {
    width: 24,
    height: 24,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
})