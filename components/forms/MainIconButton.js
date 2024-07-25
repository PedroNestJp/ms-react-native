import { StyleSheet, TouchableOpacity } from "react-native";
import colors from "@constants/colors.js";
import { alignCenter } from "@constants/styles.js";

export default function MainIconButton({ icon, type, style, onPress, disabled }) {
  const BUTTON_TYPE = {
    primary: "primary",
    primaryOutlined: "primaryOutlined",
    transparent: "transparent"
  };
  const getButtonStyles = type ? styles[BUTTON_TYPE[type]] : styles[BUTTON_TYPE.primary];

  return (
    <TouchableOpacity
      style={[
        getButtonStyles,
        style,
        disabled && styles.disabledButton
      ]}
      onPress={!disabled ? onPress : null}
      disabled={disabled}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabledButton: {
    opacity: 0.5
  },
  primary: {
    backgroundColor: colors.primaryPurple,
    borderRadius: 50,
    padding: 12,
    borderWidth: 1,
    ...alignCenter
  },
  primaryOutlined: {
    backgroundColor: "transparent",
    borderColor: colors.primaryPurple,
    borderRadius: 50,
    borderWidth: 1,
    padding: 12,
    ...alignCenter
  },
  transparent: {
    backgroundColor: "#0000",
    borderColor: colors.primaryPurple,
    borderRadius: 50,
    borderWidth: 1,
    padding: 12,
    ...alignCenter
  }
});
