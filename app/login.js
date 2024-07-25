import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Link, router } from "expo-router";
import { useContext, useEffect, useState } from "react";
import * as Linking from 'expo-linking';
import AsyncStorage from "@react-native-async-storage/async-storage";

import Pencil from "@icons/Pencil.js";
import Loading from "@components/Loading.js";
import UserContext from "@context/user-context.js";
import MainButton from "@components/forms/MainButton.js";
import MainInput from "@components/forms/MainInput.js";
import MainPasswordInput from "@components/forms/MainPasswordInput.js";
import Toaster from "@components/Toaster.js";
import Header from "@components/unauth/Header.js";
import colors from "@constants/colors.js";
import api from "@services/api.js";
import { differenceInDays } from "date-fns";

export default function App() {
  const user = useContext(UserContext);
  const [registration, setRegistration] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isShowingError, setIsShowingError] = useState(false);
  
  const EMPTY_FIELD_MESSAGE = "Preencha todos os campos";
  const LOGIN_ERROR_MESSAGE = "Não foi possível realizar o login";
  const STUDENT_TYPE_ID = 3;
  
  const handleLogin = async () => {
    if (!password || !registration) {
      setErrorText(EMPTY_FIELD_MESSAGE);
      setIsShowingError(true);
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.post("/login",
        {
          matricula: registration,
          password
        }
      );

      if (data.user.id_privilegio === STUDENT_TYPE_ID) {
        throw new Error();
      }

      user.setUser(data);
      await AsyncStorage.setItem("user", JSON.stringify(data.user));
      await AsyncStorage.setItem("token", data.token);
      // await AsyncStorage.setItem("tokenCreationDate", new Date());
      router.push("/auth");
    } catch (error) {
      setErrorText(error?.response?.data?.messages || LOGIN_ERROR_MESSAGE);
      setIsShowingError(true);
      console.error("Login: ", error?.response?.data?.messages);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleUserLoggedIn = async () => {
      try {
        const storageUser = await AsyncStorage.getItem("user");
        const storageToken = await AsyncStorage.getItem("token");
        // const storageTokenCreationDate = await AsyncStorage.getItem("tokenCreationDate");
        // const isTokenFromThreeDaysOrMore = differenceInDays(storageTokenCreationDate, new Date()) >= 3;
        
        if (storageUser !== null) {
          user.setUser({user: JSON.parse(storageUser), token: storageToken});
          router.push("/auth");
        }
      } catch (error) {
        console.error("Get user: ", error);
      }
    };
    
    handleUserLoggedIn();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header backgroundColor={colors.backgroundGrey}/>

        <View style={styles.purpleBorderRight}>
          <View style={styles.forms}>
            <Text style={styles.title}>Faça o seu login</Text>
            <MainInput
              placeholder="Digite sua matrícula"
              label="Matrícula"
              onChangeText={setRegistration}
            >
              <Pencil />
            </MainInput>
            <MainPasswordInput
              placeholder="Digite sua senha"
              label="Senha"
              style={styles.passwordInput}
              onChangeText={setPassword}
            />

            <Link href="/forgot-password/" style={styles.forgotPassword}>
              Esqueceu sua senha?
            </Link>

            <MainButton
              label="Entrar"
              style={styles.loginButton}
              onPress={handleLogin}
            />
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={{fontFamily: "Nunito_400Regular"}}>ou</Text>
              <View style={styles.dividerLine} />
            </View>
            <MainButton
              label="Cadastre-se pela plataforma"
              style={{ width: "100%" }}
              outlined
              onPress={() => Linking.openURL("https://homologacao.sistemamaissaber.com.br/register")}
            />

            <Text style={styles.rights}>Todos os direitos reservados ©2023 LUNIK educacional</Text>
          </View>
        </View>
      </ScrollView>
      {isLoading &&
        <Loading/>
      }
      
      {isShowingError &&
        <Toaster
          text={errorText}
          type="error"
          onHide={() => setIsShowingError(false)}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  divider: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 12,
    width: "100%"
  },
  dividerLine: {
    borderBottomWidth: 2,
    borderColor: colors.lightGrey,
    width: "40%"
  },
  forgotPassword: {
    color: colors.primaryBlue,
    fontFamily: "Nunito_400Regular",
    marginLeft: "auto",
    marginTop: 24,
    textDecorationLine: "underline"
  },
  forms: {
    alignItems: "flex-start",
    backgroundColor: colors.backgroundGrey,
    borderTopRightRadius: 60,
    padding: 20,
    width: "100%"
  },
  loginButton: {
    marginTop: 40,
    width: "100%"
  },
  passwordInput: { 
    marginTop: 30
  },
  purpleBorderRight: {
    backgroundColor: colors.primaryPurple,
    width: "100%"
  },
  rights: {
    fontFamily: "Nunito_400Regular",
    fontSize: 12,
    marginTop: 30,
    textAlign: "center",
    width: "100%"
  },
  safeAreaContainer: {
    flex: 1
  },
  title: {
    color: colors.blue,
    fontFamily: "Nunito_700Bold",
    fontSize: 24,
    marginBottom: 30,
    marginTop: 24
  }
});
