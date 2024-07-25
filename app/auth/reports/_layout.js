import { Stack } from 'expo-router';
import colors from "@constants/colors.js";

export default function Layout() {
  return <Stack screenOptions={{
    headerStyle: {
      backgroundColor: colors.primaryPurple,
    },
    headerBackTitleVisible: false
  }}
  />
}
