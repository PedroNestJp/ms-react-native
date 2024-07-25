import { TextInput, View, Text, StyleSheet } from "react-native";
import colors from "@constants/colors";

export default function MainInput({ value, label, placeholder, style, inputStyle, children, onChangeText, password }) {
  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text style={styles.label}>{label}</Text>
      )}

      <View style={styles.inputWrapper}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.lightPurple}
          style={[styles.input, inputStyle]}
          onChangeText={onChangeText}
          secureTextEntry={password}
          autoCapitalize="none"
          value={value}
        />

        {children && (
          <View style={styles.iconWrapper}>
            {children}
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Nunito_400Regular"
  },
  inputWrapper: {
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.lightGrey,
    backgroundColor: "#fff"
  },
  input: {
    padding: 20,
    fontSize: 16,
    fontFamily: "Nunito_400Regular"
  },
  iconWrapper: {
    position: "absolute",
    top: 20,
    right: 14,
    width: 32,
    height: 32,
  }
})