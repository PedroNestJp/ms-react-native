import { Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { Stack } from "expo-router";

import UserContext from "@context/user-context.js";
import MainPasswordInput from "@components/forms/MainPasswordInput.js";
import colors from "@constants/colors.js";
import MainButton from "@components/forms/MainButton.js";
import Modal from "@components/Modal.js";
import Loading from "@components/Loading.js";
import Toaster from "@components/Toaster.js";
import { deleteAccount } from "@services/profile";
import { logout } from "@utils/user.js";

export default function DeleteAccount() {
  const { user } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingToaster, setIsShowingToaster] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      setIsLoading(true);
      await deleteAccount(user.token, password);
      await logout();
    } catch (error) {
      console.error(error);
      setIsShowingToaster(true);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Stack.Screen options={{
          title: "Excluir conta",
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />
        <Text style={styles.title}>Excluir conta</Text>
        <Text style={styles.subtitle}>
          Confirme que quer excluir sua conta digitando sua senha. Isto é uma medida de segurança.
        </Text>
        <MainPasswordInput
          placeholder="Digite sua senha"
          label="Senha"
          style={styles.passwordInput}
          onChangeText={setPassword}
        />

        <MainButton
          type="danger"
          style={styles.deleteButton}
          label={"Excluir conta"}
          disabled={password.length < 8}
          onPress={() => setIsModalOpen(true)}
        />
      </ScrollView>

      {isModalOpen &&
        <Modal
          fromBottom
          onClose={() => setIsModalOpen(false)}
          labels={{ primary: "Excluir conta", secondary: "Cancelar" }}
          onPressPrimary={handleDeleteAccount}
          onPressSecondary={() => setIsModalOpen(false)}
          danger
        >
          <Text style={styles.title}>Deseja excluir a conta?</Text>
          <Text style={styles.subtitle}>Tem certeza que deseja excluir sua conta permanentemente?</Text>
        </Modal>
      }

      {isLoading &&
        <Loading />
      }

      {isShowingToaster &&
        <Toaster
          text={"Não foi possível deletar a sua conta"}
          type="error"
          onHide={() => { setIsShowingToaster(false) }}
        />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentWrapper: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%"
  },
  textPadding: {
    paddingHorizontal: 20,
  },
  deleteButton: {
    marginTop: 40,
  },
  title: {
    marginBottom: 6,
    fontSize: 20,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  subtitle: {
    marginBottom: 14,
    fontSize: 16,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    flex: 1
  }
})