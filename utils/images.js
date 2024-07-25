import * as ImagePicker from "expo-image-picker";

export const launchImagePicker = async (mode, showToast) => {
  if (mode === "camera") {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      showToast("Permissão de acesso à câmera negada", "error");
      throw new Error("Camera permission not granted");
    }
    return ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });
  } else {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      showToast("Permissão de acesso à galeria negada", "error");
      throw new Error("Media library permission not granted");
    }
    return ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.3,
    });
  }
};