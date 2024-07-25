import { Text, ScrollView, View, Image, StyleSheet, SafeAreaView, Dimensions, TouchableOpacity } from "react-native";
import { router, Link } from "expo-router";
import { useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import UserContext from "@context/user-context.js";
import colors from "@constants/colors.js";
import Avatar from "@components/Avatar.js";
import CardButton from "@components/CardButton.js";
import IconArrow from "@icons/Arrow.js";

const isSmallHeight = Dimensions.get("window").height < 720;

export default function Home() {
  const { user: { user } } = useContext(UserContext);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token === null) {
        router.replace("/login");
      }
    };

    getToken();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.headerTitle}>
            Boas vindas,
            <Text style={styles.name}> {user.nome?.split(" ")[0]}! </Text>
          </Text>
          <Text style={styles.headerSubtitle}>O que você deseja fazer hoje?</Text>
        </View>

        <Link href="auth/profile">
          <Avatar
            image={{ uri: user.foto }}
            size={50}
          />
        </Link>
      </View>

      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.content}>
          <CardButton
            image={require("@assets/inserir-respostas.png")}
            title="Inserir respostas"
            description="Iniciar a correção das avaliações dos alunos"
            style={styles.cards}
            onPress={() => router.push("auth/responses")}
          />
          {/* relatorios-v2 */}
          <CardButton
            image={require("@assets/relatorios.png")}
            title="Relatórios"
            description="Verificar o desempenho de turmas e estudantes"
            style={styles.cards}
            onPress={() => router.push("auth/reports")}
          />

          <TouchableOpacity
            style={styles.booksCard}
            onPress={() => router.push("auth/books")}
          >
            <Text style={styles.bookCardsTitle}>Acesse os livros didáticos</Text>
            <View style={styles.touchHere}>
              <Text style={styles.bookCardsSubtitle}>Toque aqui </Text>
              <IconArrow color={colors.subtitle} />
            </View>

            <Image
              source={require("@assets/background-card-livros.png")}
              style={styles.bookCardsImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Image
            source={require("@assets/logo-mais-saber-sombra.png")}
            style={styles.logo}
          />
          <Text style={styles.rights}>
            Todos os direitos reservados ©2024
            <Text style={{ fontWeight: "600" }}> LUNIK educacional </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 28,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryPurple,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    marginBottom: 8,
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
    color: "#fff",
  },
  name: {
    fontFamily: "Nunito_700Bold",
    color: "#fff",
    textTransform: "capitalize",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Nunito_400Regular"
  },
  contentWrapper: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: colors.backgroundGrey,
    minHeight: isSmallHeight && "95%",
    justifyContent: "space-between"
  },
  content: {
    alignItems: "center",
    alignSelf: "stretch"
  },
  cards: {
    maxWidth: "100%",
    marginBottom: 20
  },
  logo: {
    width: 170,
    resizeMode: "contain",
    marginBottom: -20,
  },
  rights: {
    marginBottom: 30,
    fontSize: 12,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  booksCard: {
    alignSelf: "stretch",
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 20 },
    elevation: 4,
    height: 140,
  },
  bookCardsTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
    width: 120,
    marginBottom: 20,
  },
  bookCardsSubtitle: {
    fontSize: 16,
    color: colors.subtitle,
    width: 80
  },
  bookCardsImage: {
    position: "absolute",
    top: 0,
    right: 0,
    resizeMode: "cover",
    borderRadius: 12,
    height: 140
  },
  touchHere: {
    gap: 8,
    flexDirection: "row",
    alignItems: "center"
  }
})