import { TouchableOpacity, StyleSheet, Text } from "react-native";
import colors from "@constants/colors.js"
import { alignCenter } from "@constants/styles.js"

export default function Button({ label, type, style, textStyle, outlined, onPress, small, disabled }) {
  const BUTTON_TYPE = {
    primary: "primary",
    secondary: "secondary",
    danger: "danger"
  };
  const TEXT_TYPE = {
    primary: "textPrimary",
    secondary: "textSecondary",
    danger: "textDanger"
  };
  const getButtonStyles = type ? styles[BUTTON_TYPE[type]] : styles[BUTTON_TYPE.primary];
  const getTextStyles = type ? styles[TEXT_TYPE[type]] : styles[TEXT_TYPE.primary];

  return (
    <TouchableOpacity
      style={[
        getButtonStyles,
        outlined && styles.outlined,
        small && styles.smallButton,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        getTextStyles,
        outlined && styles.textOutlined,
        small && styles.textSmall,
        disabled && styles.textDisabled,
        textStyle
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const defaultButtonStyles = {
  padding: 16,
  borderRadius: 12,
  borderWidth: 2,
  ...alignCenter
};
const defaultFontStyles = {
  fontFamily: "Nunito_700Bold",
  fontSize: 16
};
const styles = StyleSheet.create({
  primary: {
    ...defaultButtonStyles,
    backgroundColor: colors.primaryPurple,
    borderColor: colors.primaryPurple,
  },
  outlined: {
    ...defaultButtonStyles,
    backgroundColor: "transparent",
  },
  danger: {
    ...defaultButtonStyles,
    backgroundColor: colors.primaryPurple,
    borderColor: colors.primaryPurple,
    backgroundColor: colors.primaryRed,
    borderColor: colors.primaryRed,
  },
  textDisabled: {
    color: "#fff"
  },
  textPrimary: {
    color: "#fff",
    ...defaultFontStyles
  },
  textSecondary: {
    color: colors.blue,
    ...defaultFontStyles
  },
  textOutlined: {
    color: colors.primaryPurple,
    ...defaultFontStyles
  },
  textDanger: {
    color: "#fff",
    ...defaultFontStyles
  },
  smallButton: {
    padding: 12
  },
  textSmall: {
    fontSize: 14
  },
  disabled: {
    backgroundColor: "#ccc",
    borderColor: "#ccc"
  }
})