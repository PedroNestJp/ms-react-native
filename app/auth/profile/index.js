// Home.js
import React, { useContext, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Stack, router } from "expo-router";
import UserContext from "@context/user-context.js";
import colors from "@constants/colors.js";
import Avatar from "@components/Avatar.js";
import Loading from "@components/Loading.js";
import ButtonList from "@components/profile/ButtonList";
import Modal from "@components/Modal.js";
import Toaster from "@components/Toaster.js";
import Logout from "@icons/Logout.js";
import SchoolIcon from "@icons/School.js";
import CollegeHatIcon from "@icons/CollegeHat.js";
import BookIcon from "@icons/Book.js";
import TrashIcon from "@icons/Trash.js";
import ArrowLeft from "@icons/ArrowLeft.js";
import { logout } from "@utils/user.js";
import changeProfilePhoto from "./change-profile-photo";
import { modalTitle } from "@constants/styles.js";

export default function Home() {
  const { user: { user } } = useContext(UserContext);
  const [showImagePickerModal, setshowImagePickerModal] = useState(false);
  const [showImagePickerSubModal, setshowImagePickerSubModal] = useState(false);
  const [isShowingToaster, setIsShowingToaster] = useState(false);
  const [toasterConfig, setToasterConfig] = useState({});
  const { isLoading, addProfilePhoto, deleteProfilePhoto } = changeProfilePhoto();

  const showToast = (message, type) => {
    setToasterConfig({ text: message, type });
    setIsShowingToaster(true);
  };

  const handleAvatarPress = () => {
    setshowImagePickerModal(true);
  };

  const handleImagePickerModal = () => {
    setshowImagePickerModal(false);
    setshowImagePickerSubModal(true);
  };

  const getSchoolData = () => [
    {
      prepend: <View style={styles.schoolDataIcons}><SchoolIcon /></View>,
      title: "Escolas",
      onPress: () => router.push("auth/profile/schools")
    },
    {
      prepend: <View style={styles.schoolDataIconsYellow}><CollegeHatIcon /></View>,
      title: "Turmas",
      onPress: () => router.push("auth/profile/classes")
    },
    {
      prepend: <View style={styles.schoolDataIconsRed}><BookIcon /></View>,
      title: "Disciplinas",
      onPress: () => router.push("auth/profile/disciplines")
    },
  ];

  const getAccessData = (user) => [
    {
      title: "Matrícula",
      text: user.matricula,
    },
    {
      title: "E-mail",
      text: user.email,
      onPress: () => router.push({
        pathname: "auth/profile/change-email-password",
        params: { config: "email" }
      })
    },
    {
      title: "Senha",
      text: "******",
      onPress: () => router.push({
        pathname: "auth/profile/change-email-password",
        params: { config: "password" }
      })
    },
    {
      prepend: <Text style={styles.deleteAccountText}>Excluir conta</Text>,
      onPress: () => router.push("auth/profile/delete-account"),
      append: <TrashIcon />,
    },
  ];

  const getAboutData = () => [
    {
      title: "Políticas de privacidade",
      onPress: () => router.push("auth/profile/privacy-policy")
    },
    {
      title: "Termos de uso",
      onPress: () => router.push("auth/profile/terms-of-use")
    },
    {
      prepend: <Text style={styles.deleteAccountText}>Sair deste perfil</Text>,
      onPress: logout,
      append: <Logout />,
    },
  ];

  const schoolData = getSchoolData();
  const accessData = getAccessData(user);
  const aboutData = getAboutData();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Stack.Screen
        options={{
          title: "Perfil",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold",
          },
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <ArrowLeft />
            </Pressable>
          ),
        }}
      />
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.informationSection}>
          <TouchableOpacity onPress={handleAvatarPress}>
            <Avatar
              image={{ uri: user?.foto }}
              size={110}
              isEditable
              onPress={handleAvatarPress}
            />
          </TouchableOpacity>

          <Text style={styles.name}>
            {user.nome}
          </Text>
          <Text style={styles.disciplines}>
            Língua portuguesa e matemática
          </Text>
          <View style={styles.border}></View>
        </View>

        <Text style={styles.sectionTitle}>Dados institucionais</Text>
        <ButtonList buttons={schoolData} />
        <Text style={styles.sectionTitle}>Acesso</Text>
        <ButtonList buttons={accessData} />
        <Text style={styles.sectionTitle}>Sobre o app</Text>
        <ButtonList buttons={aboutData} />
      </ScrollView>
      {isLoading && <Loading />}
      {showImagePickerModal && (
        <Modal
          closable
          onClose={() => setshowImagePickerModal(false)}
          labels={{ primary: "Nova Foto de Perfil", secondary: "Excluir Foto do Perfil" }}
          onPressPrimary={handleImagePickerModal}
          onPressSecondary={() => {
            deleteProfilePhoto(showToast);
            setshowImagePickerModal(false);
          }}
          fromBottom
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Foto</Text>
          </View>
        </Modal>
      )}
      {showImagePickerSubModal && (
        <Modal
          closable
          onClose={() => setshowImagePickerSubModal(false)}
          labels={{ primary: "Usar Câmera", secondary: "Escolher da Galeria" }}
          onPressPrimary={() => {
            addProfilePhoto("camera", showToast);
            setshowImagePickerSubModal(false);
          }}
          onPressSecondary={() => {
            addProfilePhoto("gallery", showToast);
            setshowImagePickerSubModal(false);
          }}
          fromBottom
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nova Foto de Perfil</Text>
          </View>
        </Modal>
      )}
      {isShowingToaster &&
        <Toaster {...toasterConfig} onHide={() => setIsShowingToaster(false)} />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingRight: 16,
  },
  border: {
    alignSelf: "stretch",
    borderBottomColor: colors.subtitle,
    borderBottomWidth: 1,
    borderStyle: "solid",
    marginHorizontal: 20,
    marginTop: 20,
  },
  contentWrapper: {
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  deleteAccountText: {
    color: colors.red,
  },
  disciplines: {
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    marginTop: 5,
  },
  informationSection: {
    alignItems: "center",
    alignSelf: "stretch",
  },
  modalContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    marginBottom: 20,
    marginTop: 20,
    ...modalTitle,
  },
  name: {
    color: colors.blue,
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginTop: 20,
  },
  safeAreaView: {
    flex: 1,
  },
  schoolDataIcons: {
    alignItems: "center",
    backgroundColor: colors.secondaryGreen,
    borderRadius: 8,
    height: 42,
    justifyContent: "center",
    width: 42,
  },
  get schoolDataIconsRed() {
    return { ...this.schoolDataIcons, backgroundColor: colors.secondaryRed };
  },
  get schoolDataIconsYellow() {
    return { ...this.schoolDataIcons, backgroundColor: colors.secondaryYellow };
  },
  sectionTitle: {
    color: colors.blue,
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginBottom: 20,
    marginTop: 35,
  },
});
