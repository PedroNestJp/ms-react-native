import { View, TouchableOpacity, Text, Image, StyleSheet } from "react-native";
import colors from "@constants/colors.js";

export default function CardButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]}>
      <>
        <Image source={props.image} style={styles.image}></Image>

        <View style={styles.separator}>
          <Text style={[styles.title, props.description ?? styles.onlyTitle]}>{props.title}</Text>
          {props.description && <Text style={styles.description}>{props.description}</Text>}
        </View>
      </>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primaryPurple,
    flexDirection: "row",
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 20 },
    elevation: 4
  },
  image: {
    width: 80,
    height: 90,
    resizeMode: "contain"
  },
  title: {
    color: colors.primaryPurple,
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginBottom: 6,
  },
  onlyTitle: {
    marginBottom: 0,
    fontSize: 22
  },
  description: {
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle,
    lineHeight: 21
  },
  separator: {
    marginLeft: 20,
    paddingLeft: 20,
    borderLeftWidth: 1,
    borderLeftColor: "#DEE9F6",
    flex: 1,
    minHeight: 64,
    justifyContent: "center"
  },
})