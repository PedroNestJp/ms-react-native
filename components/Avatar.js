import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import CameraIcon from "@icons/Camera.js";
import colors from "@constants/colors.js";

export default function Avatar(props) {
  return (
    <View>
      <View style={[styles.container, { width: props.size, height: props.size }]}>
        <Image
          source={props.image}
          style={{ width: props.size, height: props.size }}
        />
      </View>
      { props.isEditable &&
        <TouchableOpacity style={styles.cameraButton} onPress={props.onPress}>
          <CameraIcon />
        </TouchableOpacity>
      }
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 200,
    borderWidth: 2,
    borderColor: "#fff",
    overflow: "hidden"
  },
  cameraButton: {
    width: 56,
    height: 56,
    borderRadius: 32,
    borderWidth: 8,
    borderColor: colors.backgroundGrey,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#DDD5EF",
    position: "absolute",
    bottom: -2,
    right: -2,
  }
})