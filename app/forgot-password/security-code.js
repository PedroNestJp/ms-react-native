import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import { router } from "expo-router";

import Header from "@components/unauth/Header.js";
import MainButton from "@components/forms/MainButton.js";
import colors from "@constants/colors.js";
import api from "@services/api.js";
import Loading from "@components/Loading.js";
import Toaster from "@components/Toaster.js";
import { useEffect } from "react";

export default function ForgotPassword() {
  const [code, setCode] = useState([]);
  const inputs = Array.from(Array(6), () => 0);
  const [isLoading, setIsLoading] = useState(false);
  const [toasterText, setToasterText] = useState("");
  const [isShowingToaster, setIsShowingToaster] = useState(false);
  const [isErrorToaster, setIsErrorToaster] = useState(false);
  const refInputs = useRef([]);

  const EMPTY_CODE_MESSAGE = "Preencha todo o código";
  const INVALID_CODE_MESSAGE = "Código inválido";
  const NOT_FOUND_CODE_MESSAGE = "Código não encontrado!";

  useEffect(() => {
    setIsShowingToaster(true);
    setToasterText("Código enviado com sucesso");
  }, []);

  const updateCode = (text, index) => {
    setCode((oldValue) => {
      const newValue = [...oldValue];
      newValue[index] = text;
      return newValue;
    });
  };

  const handleSendCode = async () => {
    if (code.length < 6 || code.some(field => field === "")) {
      setIsErrorToaster(true);
      setToasterText(EMPTY_CODE_MESSAGE);
      setIsShowingToaster(true);
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.post("/recuperar-senha-codigo", {
        codigo: code.join("")
      });
      if (data.message === NOT_FOUND_CODE_MESSAGE) {
        setIsErrorToaster(true);
        setToasterText(INVALID_CODE_MESSAGE);
        setIsShowingToaster(true);
      } else {
        router.push({
          pathname: "/forgot-password/new-password",
          params: { code: code.join("") }
        });
      }
    } catch (error) {
      setIsErrorToaster(true);
      setToasterText(INVALID_CODE_MESSAGE);
      setIsShowingToaster(true);
      console.error("Enviar código, recuperação de senha: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeChange = ({text}, index) => {
    (text && index < inputs.length -1) && refInputs.current[index + 1].focus();
  };

  const handleBackSpace = (key, index) => {
    (!code[index] && key === "Backspace" && index !== 0) && refInputs.current[index - 1].focus();
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header backgroundColor={colors.backgroundGrey} showBackButton/>

        <View style={styles.purpleBorderRight}>
          <View style={styles.forms}>
            <Text style={styles.title}>
              Código de segurança
            </Text>

            <View style={styles.supportTextContainer}>
              <Text style={styles.supportText}>
                Digite o código enviado para o seu e-mail.
              </Text>
            </View>

            <Text style={styles.label}>Código</Text>
            <View style={styles.codeContainer}>
              {inputs.map((input, index) => (
                <View
                  style={styles.inputWrapper}
                  key={index}
                >
                  <TextInput
                    style={styles.input}
                    ref={el => refInputs.current[index] = el}
                    maxLength={1}
                    placeholder="0"
                    onChangeText={text => updateCode(text, index)}
                    onChange={({nativeEvent}) => handleCodeChange(nativeEvent, index)}
                    onKeyPress={({nativeEvent: {key}}) => handleBackSpace(key, index)}
                    autoCapitalize="none"
                  />
                </View>
              ))}
            </View>

            <MainButton
              label="Próximo"
              style={styles.nextButton}
              onPress={handleSendCode}
            />
          </View>
        </View>

      </ScrollView>
      {isShowingToaster &&
        <Toaster
          text={toasterText}
          type={isErrorToaster ? "error" : "success"}
          onHide={() => {setIsShowingToaster(false), setIsErrorToaster(false);}}
        />
      }

      {isLoading &&
        <Loading />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  codeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
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
  input: {
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    padding: 16,
    width: 46,
  },
  inputWrapper: {
    borderColor: colors.lightGrey,
    borderRadius: 8,
    borderWidth: 2,
    marginTop: 8
  },
  label: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
  },
  nextButton: {
    marginTop: 44,
    width: "100%"
  },
  purpleBorderRight: {
    backgroundColor: colors.primaryPurple,
    flex: 1,
    width: "100%",
  },
  safeAreaContainer: {
    flex: 1
  },
  supportText: {
    color: colors.greyBlue,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 14,
    textAlign: "center",
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
  }
});