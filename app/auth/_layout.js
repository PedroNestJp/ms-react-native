import { Text } from "react-native";
import { Tabs } from 'expo-router';

import ChartIcon from "@icons/Chart.js"
import ResponsesIcon from "@icons/Responses.js";
import HomeIcon from "@icons/Home.js";
import BookIcon from "@icons/Book.js";
import BookBarIcon from "@icons/BookBar.js";
import colors from "@constants/colors";

export default function Layout() {
  const getIcon = (focused, IconComponent) => {
    return <IconComponent
      borderColor={!focused && colors.greyBlue}
      stroked={!focused}
      color={focused ? colors.primaryPurple : "#fff"}
    />;
  };
  const getText = (focused, label) => {
    return <Text style={{ color: focused ? colors.primaryPurple : colors.greyBlue }}>{label}</Text>
  };

  const responsesTitle = "Respostas";
  const booksTitle = "Livros";
  const reportsTitle = "Relatórios";
  const homeTitle = "Início";

  return <Tabs screenOptions={{
    tabBarStyle: {
      paddingTop: 10,
      minHeight: 60,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 0,
      shadowOpacity: 0.05,
      shadowRadius: 20,
    },
  }}
  >
    <Tabs.Screen
      name="index"
      options={{
        headerShown: false,
        title: homeTitle,
        tabBarIcon: ({ focused }) => getIcon(focused, HomeIcon),
        tabBarLabel: ({ focused }) => getText(focused, homeTitle),
      }}
    />
    <Tabs.Screen
      name="responses"
      options={{
        headerShown: false,
        title: responsesTitle,
        tabBarIcon: ({ focused }) => getIcon(focused, ResponsesIcon),
        tabBarLabel: ({ focused }) => getText(focused, responsesTitle)
      }}
    />
    <Tabs.Screen
      name="profile"
      options={{
        headerShown: false,
        tabBarButton: () => {},
      }}
    />
    {/* relatorios-v2 */}
    <Tabs.Screen
      name="reports"
      options={{
        headerShown: false,
        title: reportsTitle,
        tabBarIcon: ({ focused }) => getIcon(focused, ChartIcon),
        tabBarLabel: ({ focused }) => getText(focused, reportsTitle)
      }}
    />
    {/* fim relatorios v2 */}

    <Tabs.Screen
      name="books"
      options={{
        headerShown: false,
        title: booksTitle,
        tabBarIcon: ({ focused }) => getIcon(focused, focused ? BookIcon : BookBarIcon),
        tabBarLabel: ({ focused }) => getText(focused, booksTitle)
      }}
    />

  </Tabs>;
}
