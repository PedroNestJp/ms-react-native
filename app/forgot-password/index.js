import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { router } from 'expo-router';
import { useState } from "react";

import Email from "@icons/Email.js";
import Header from "@components/unauth/Header.js";
import MainInput from "@components/forms/MainInput.js";
import MainButton from "@components/forms/MainButton.js";
import colors from "@constants/colors.js";
import api from "@services/api.js";
import Loading from "@components/Loading.js";
import Toaster from '@components/Toaster.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isShowingError, setIsShowingError] = useState(false);

  const INVALID_EMAIL_MESSAGE = "E-mail inválido";
  const EMAIL_NOT_FOUND_MESSAGE = "E-mail informado não cadastrado";
  const EMPTY_EMAIL_MESSAGE = "Preencha o campo de e-mail";

  const handleSendEmail = async () => {
    if (!email) {
      setErrorText(EMPTY_EMAIL_MESSAGE);
      setIsShowingError(true);
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.post("/recuperar-senha-email", {
        email
      });
      
      if (data.message === INVALID_EMAIL_MESSAGE) {
        setErrorText(EMAIL_NOT_FOUND_MESSAGE);
        setIsShowingError(true);
      } else {
        router.push("/forgot-password/security-code");
      }
    } catch (error) {
      setErrorText(error?.response?.data?.messages || "E-mail informado não cadastrado");
      setIsShowingError(true);
      console.error("Enviar email, recuperação de senha: ", error.response)
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header backgroundColor={colors.backgroundGrey} showBackButton/>

        <View style={styles.purpleBorderRight}>
          <View style={styles.forms}>
            <Text style={styles.title}>
              Recuperação de senha
            </Text>

            <View style={styles.supportTextContainer}>
              <Text style={styles.supportText}>
                Enviaremos um código de confirmação para o e-mail cadastrado na plataforma
              </Text>
            </View>

            <MainInput
              label="Email"
              placeholder="Digite seu e-mail"
              onChangeText={setEmail}
            >
              <Email />
            </MainInput>
            <MainButton
              label="Próximo"
              style={styles.nextButton}
              onPress={handleSendEmail}
            />
          </View>
        </View>

      </ScrollView>
      {isLoading &&
        <Loading />
      }

      {isShowingError &&
        <Toaster
          text={errorText}
          type="error"
          onHide={() => setIsShowingError(false)}
        />
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  container: {
    minHeight: "100%",
    backgroundColor: "#fff",
    alignItems: 'center',
  },
  purpleBorderRight: {
    backgroundColor: colors.primaryPurple,
    width: "100%",
    flex: 1,
  },
  forms: {
    flexGrow: 1,
    padding: 24,
    width: "100%",
    alignItems: 'flex-start',
    borderTopRightRadius: 60,
    backgroundColor: colors.backgroundGrey
  },
  title: {
    marginTop: 24,
    marginBottom: 24,
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: colors.blue
  },
  supportTextContainer: {
    marginBottom: 30,
    backgroundColor: colors.secondaryGreyBlue,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignSelf: "stretch"
  },
  supportText: {
    fontSize: 14,
    textAlign: "center",
    color: colors.greyBlue,
    fontFamily: "Nunito_600SemiBold"
  },
  nextButton: {
    width: "100%",
    marginTop: 44
  }
})