import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

export const logout = async () => {
  try {
    await AsyncStorage.removeItem("user");
    router.push("/login");
  } catch (error) {
    console.error("Deslogar: ", error)
  }
};