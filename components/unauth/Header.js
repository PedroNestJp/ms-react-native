import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { router } from 'expo-router';

import colors from "@constants/colors.js";
import ArrowLeft from "@icons/ArrowLeft.js";

export default function Header({ backgroundColor, showBackButton }) {
  return (
    <View style={[styles.whiteBorderLeft, { backgroundColor: backgroundColor || "#fff" }]}>
      <View style={styles.headerBackdrop}>
        {showBackButton &&
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft/>
          </TouchableOpacity>
        }
        <Image source={require("@assets/logo-mais-saber.png")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerBackdrop: {
    alignItems: "center",
    backgroundColor: colors.primaryPurple,
    borderBottomLeftRadius: 60,
    flexDirection: "row",
    height: 250,
    justifyContent: "center",
    width: "100%",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 0,
    padding: 16,
  },
  whiteBorderLeft: {
    width: "100%"
  },
});