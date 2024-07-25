import { View, Text, Image, StyleSheet } from "react-native";
import colors from "@constants/colors.js";

export default function EmptyState (props) {
  return (
    <View style={styles.container}>
      <Image source={require("@assets/lupa.png")} style={[styles.image, props.imageStyle]}/>
      { props.children ? 
        props.children :
        <Text style={styles.emptyText}>{props.text}</Text>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    marginBottom: 28,
    width: 124,
    height: 124
  },
  emptyText: {
    color: "#EE9000",
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16
  }
})