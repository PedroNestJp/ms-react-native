import { View, Text, ScrollView, SafeAreaView, StyleSheet, Image } from "react-native";
import { Stack } from "expo-router";
import { useLocalSearchParams, router } from "expo-router";
import { useState } from "react";
import { useContext } from "react";


import UserContext from "@context/user-context.js";
import colors from "@constants/colors.js";
import Loading from "@components/Loading.js";
import MainInput from "@components/forms/MainInput.js";
import MainPasswordInput from "@components/forms/MainPasswordInput.js";
import MainButton from "@components/forms/MainButton.js";
import EmailIcon from "@icons/Email.js";
import EyeIcon from "@icons/Eye.js";
import Modal from "@components/Modal.js";
import Toaster from "@components/Toaster.js";
import CircleCloseIcon from "@icons/CircleClose.js";
import { updateEmail, updatePassword } from "@services/profile.js";
import { containsLowercaseLetters, containsSpecialCharacters, containsUppercaseLetters } from "@utils/strings.js";
import { modalTitle } from "@constants/styles.js";

export default function ChangeEmailPassword() {
  const user = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isShowingToaster, setIsShowingToaster] = useState(false);
  const params = useLocalSearchParams();

  const handleEmailUpdate = async () => {
    try {
      setIsLoading(true);
      await updateEmail(user.user.token, email);
      user.setUser({
        ...user.user,
        user: {
          ...user.user.user,
          email
        }
      });
      setIsShowingModal(true);
    } catch (error) {
      console.error(`Alterar e-mail: ${error.response.data.message}`);
      setIsShowingToaster(true);
    } finally {
      setIsLoading(false);
    }
  }
  const handlePasswordUpdate = async () => {
    try {
      setIsLoading(true);
      await updatePassword(user.user.token, { password, newPassword });
      setIsShowingModal(true);
    } catch (error) {
      console.error(`Alterar senha: ${error.response.data.message}`);
      setIsShowingToaster(true);
    } finally {
      setIsLoading(false);
    }
  }
  const pageConfig = {
    email: {
      title: "E-mail",
      success: "E-mail alterado com sucesso",
      error: "Não foi possível alterar o seu e-mail",
      inputTitle: "E-mail atual",
      changeInputTitle: "Alterar e-mail",
      endpoint: "a",
      buttonText: "Salvar novo e-mail",
      handleButtonPress: handleEmailUpdate,
      icon: <EmailIcon />
    },
    password: {
      title: "Senha",
      success: "Senha alterada com sucesso",
      error: "Não foi possível alterar a sua senha",
      inputTitle: "Senha atual",
      changeInputTitle: "Alterar senha",
      endpoint: "a",
      buttonText: "Salvar nova senha",
      handleButtonPress: handlePasswordUpdate,
      icon: <EyeIcon />
    },
  }[params.config];

  const getRequiredPasswordPatternTextColor = (condition) => condition ? colors.primaryGreen : colors.primaryYellow;
  const requiredPasswordPatterns = [
    {
      color: getRequiredPasswordPatternTextColor(newPassword.length >= 8),
      text: "Ao menos 8 caracteres"
    },
    {
      color: getRequiredPasswordPatternTextColor(containsUppercaseLetters(newPassword)),
      text: "Ao menos uma letra maiúscula (A-Z)"
    },
    {
      color: getRequiredPasswordPatternTextColor(containsLowercaseLetters(newPassword)),
      text: "Ao menos uma letra minúscula (a-z)"
    },
    {
      color: getRequiredPasswordPatternTextColor(containsSpecialCharacters(newPassword)),
      text: "Ao menos 1 caractere especial (-!@#$%^&*)"
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Stack.Screen options={{
          title: pageConfig.title,
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <Text style={styles.title}>{pageConfig.inputTitle}</Text>
        <MainInput
          label=""
          value={params.config === "email" ? user.user.user.email : "password"}
          style={styles.endInput}
          password={params.config === "password"}
        />

        <Text style={[styles.title, styles.confirmArea]}>{pageConfig.changeInputTitle}</Text>
        {params.config === "email" ?
          <>
            <MainInput
              placeholder="Digite um novo e-mail"
              value={email}
              onChangeText={setEmail}
            >
              {pageConfig.icon}
            </MainInput>
          </> :
          <>
            <MainPasswordInput
              label="Senha atual"
              onChangeText={setPassword}
              style={styles.passwordInput}
            />
            <MainPasswordInput
              label="Digite uma nova senha"
              onChangeText={setNewPassword}
            />
            {
              requiredPasswordPatterns.map(pattern => (
                <View
                  style={styles.warningTextContainer}
                  key={pattern.text}
                >
                  <CircleCloseIcon color={pattern.color} />
                  <Text style={[
                    styles.warningText,
                    { color: pattern.color }
                  ]}>
                    {pattern.text}
                  </Text>
                </View>
              ))
            }
          </>
        }

        <MainButton
          style={styles.savePassword}
          label={pageConfig.buttonText}
          disabled={!(newPassword.length > 3 || email.length > 8)}
          onPress={pageConfig.handleButtonPress}
        />
      </ScrollView>
      {isLoading &&
        <Loading />
      }
      {
        isShowingModal && (
          <Modal
            labels={{ primary: "Voltar ao perfil" }}
            onPressPrimary={() => router.back()}
          >
            <View style={styles.modalContent}>
              <Image
                source={require("@assets/escudo.png")}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{pageConfig.success}</Text>
            </View>
          </Modal>
        )
      }
      {isShowingToaster &&
        <Toaster
          text={pageConfig.error}
          type="error"
          onHide={() => { setIsShowingToaster(false); }}
        />
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
  contentContainer: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    minHeight: "100%",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center"
  },
  modalImage: {
    height: 80,
    width: 80
  },
  modalTitle: {
    marginBottom: 20,
    marginTop: 20,
    ...modalTitle
  },
  title: {
    color: colors.blue,
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginBottom: 20
  },
  passwordInput: { marginBottom: 10 },
  confirmArea: {
    marginTop: 20,
  },
  warningText: {
    color: colors.primaryYellow,
    fontFamily: "Nunito_400Regular",
    marginLeft: 8
  },
  warningTextContainer: {
    alignItems: "center",
    flexDirection: "row",
    marginTop: 8
  },
  savePassword: { marginTop: 30 }
})