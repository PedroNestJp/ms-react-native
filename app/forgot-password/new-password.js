import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";

import Header from "@components/unauth/Header.js";
import MainPasswordInput from "@components/forms/MainPasswordInput.js";
import MainButton from "@components/forms/MainButton.js";
import Modal from "@components/Modal.js";
import CircleClose from "@icons/CircleClose.js";
import api from "@services/api.js";
import Loading from "@components/Loading.js";
import colors from "@constants/colors.js";
import Toaster from "@components/Toaster.js";

import { containsLowercaseLetters, containsSpecialCharacters, containsUppercaseLetters } from "@utils/strings.js";
import { modalSubtitle, modalTitle } from "@constants/styles.js";

export default function NewPassword() {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isShowingToaster, setIsShowingToaster] = useState("");
  const [toasterText, setToasterText] = useState("");

  const params = useLocalSearchParams();
  const EMPTY_FIELD_MESSAGE = "Preencha todos os campos";
  const DIFFERENT_PASSWORDS_MESSAGE = "As senhas não são iguais";

  const handleSendNewPassword = async () => {
    if (!password || !newPassword) {
      setToasterText(EMPTY_FIELD_MESSAGE);
      setIsShowingToaster(true);
      return;
    }
    if (password !== newPassword) {
      setToasterText(DIFFERENT_PASSWORDS_MESSAGE);
      setIsShowingToaster(true);
      return;
    }
    try {
      setIsLoading(true);
      await api.post(`/redefinir-senha?codigo=${params.code}`, {
        nova_senha: password,
        confirmar_senha: newPassword
      });
      setIsShowingModal(true);
    } catch (error) {
      console.error("Nova senha, recuperação de senha: ", error.response.data);
      setIsShowingToaster(true);
      setToasterText("Erro ao trocar de senha");
    } finally {
      setIsLoading(false);
    }
  };

  const getRequiredPasswordPatternTextColor = (condition) => condition ? colors.primaryGreen : colors.primaryYellow;
  const requiredPasswordPatterns = [
    {
      color: getRequiredPasswordPatternTextColor(password.length >= 8),
      text: "Ao menos 8 caracteres"
    },
    {
      color: getRequiredPasswordPatternTextColor(containsUppercaseLetters(password)),
      text: "Ao menos uma letra maiúscula (A-Z)"
    },
    {
      color: getRequiredPasswordPatternTextColor(containsLowercaseLetters(password)),
      text: "Ao menos uma letra minúscula (a-z)"
    },
    {
      color: getRequiredPasswordPatternTextColor(containsSpecialCharacters(password)),
      text: "Ao menos 1 caractere especial (-!@#$%^&*)"
    },
  ];

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        contentContainerStyle={styles.container}
        scrollEnabled={!isShowingModal}
        scrollEventThrottle={10}
      >
        <Header backgroundColor={colors.backgroundGrey} showBackButton/>

        <View style={styles.purpleBorderRight}>
          <View style={styles.forms}>
            <Text style={styles.title}>
              Recuperação de senha
            </Text>

            <View style={styles.supportTextContainer}>
              <Text style={styles.supportText}>
                Código verificado com sucesso.
              </Text>
              <Text style={styles.supportText}>
                Digite sua nova senha.
              </Text>
            </View>

            <MainPasswordInput
              label="Nova senha"
              placeholder="Digite sua nova senha"
              onChangeText={setPassword}
            />

            {
              requiredPasswordPatterns.map(pattern => (
                <View
                  style={styles.warningTextContainer}
                  key={pattern.text}
                >
                  <CircleClose color={pattern.color} />
                  <Text style={[
                    styles.warningText,
                    { color: pattern.color }
                  ]}>
                    { pattern.text }
                  </Text>
                </View>
              ))
            }

            <MainPasswordInput
              style={{ marginTop: 30 }}
              label="Confirme sua senha"
              placeholder="Confirme sua nova senha"
              onChangeText={setNewPassword}
            />
            <MainButton
              label="Concluir"
              style={styles.nextButton}
              onPress={handleSendNewPassword}
            />
          </View>
        </View>
      </ScrollView>
      {
        isShowingModal && (
          <Modal
            labels={{ primary: "Fazer login" }}
            onPressPrimary={() => router.push("/login")}
          >
            <View style={styles.modalContent}>
              <Image
                source={require("@assets/escudo.png")}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>Senha recuperada</Text>
              <Text style={modalSubtitle}>Faça o login com sua nova senha</Text>
            </View>
          </Modal>
        )
      }

      {isLoading &&
        <Loading />
      }

      {isShowingToaster &&
        <Toaster
          text={toasterText}
          type="error"
          onHide={() => { setIsShowingToaster(false); }}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    minHeight: "100%",
  },
  forms: {
    alignItems: "flex-start",
    backgroundColor: colors.backgroundGrey,
    borderTopRightRadius: 60,
    flex: 1,
    padding: 24,
    width: "100%"
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
    marginBottom: 4,
    marginTop: 20,
    ...modalTitle
  },
  nextButton: {
    marginTop: 44,
    width: "100%"
  },
  purpleBorderRight: {
    backgroundColor: colors.primaryPurple,
    flex: 1,
    width: "100%"
  },
  safeAreaContainer: {
    flex: 1
  },
  supportText: {
    color: colors.greyBlue,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 14,
    textAlign: "center"
  },
  supportTextContainer: {
    alignSelf: "stretch",
    backgroundColor: colors.secondaryGreyBlue,
    borderRadius: 12,
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 16
  },
  title: {
    color: colors.blue,
    fontFamily: "Nunito_700Bold",
    fontSize: 24,
    marginBottom: 24,
    marginTop: 24
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
});