import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { router, Stack, usePathname } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { getSchoolsAndClassList, updateClassList } from "@services/profile.js";
import UserContext from "@context/user-context.js";
import MainDropdown from "@components/MainDropdown.js";
import Loading from "@components/Loading.js";
import colors from "@constants/colors.js";
import ButtonList from "@components/profile/ButtonList.js";
import TrashIcon from "@icons/Trash.js";
import PlusFilledIcon from "@icons/PlusFilled.js";
import Modal from "@components/Modal.js";

export default function Classes() {
  const { user } = useContext(UserContext);
  const [schools, setSchools] = useState([]);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const newPath = usePathname();
  const [classId, setClassId] = useState(null);

  useEffect(() => {
    if (newPath !== '/auth/profile/classes') {
      return;
    }

    const getSchools = async () => {
      try {
        setIsLoading(true);
        const { data: { escolas } } = await getSchoolsAndClassList(user.token);
        setSchools(escolas);
      } catch (error) {
        console.error("Minhas escolas: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    getSchools();
  }, [newPath]);
  
  const handleOpenDeleteModal = (id) => {
    setIsShowingDeleteModal(true);
    setClassId(id);
  };
  const handleCloseDeleteModal = () => {
    setIsShowingDeleteModal(false);
    setClassId(null);
  }
  const handleUpdateClasses = async () => {
    try {
      setIsLoading(true);
      await updateClassList(user.token, classId);
      const { data: { escolas } } = await getSchoolsAndClassList(user.token);
      setSchools(escolas);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
      handleCloseDeleteModal();
    }
  };
  const addSchoolButton = {
    title: "Adicionar turma desta escola",
    append: <PlusFilledIcon style={{ marginRight: 12 }}/>,
    titleStyle: { marginLeft: 12, color: colors.primaryGreen }
  };
  const selectedClasses = (school) => {
    const fundamentalI = school.fundamentalI?.map(schoolClass => ({
      ...schoolClass,
      title: schoolClass.nome,
      onPress: () => handleOpenDeleteModal(schoolClass.id_turma),
      append: <TrashIcon />
    }));
    const fundamentalII = school.fundamentalII?.map(schoolClass => ({
      ...schoolClass,
      title: schoolClass.nome,
      onPress: () => handleOpenDeleteModal(schoolClass.id_turma),
      append: <TrashIcon />
    }));
    const seeSchoolClassesButton = {
      ...addSchoolButton,
      onPress: () => router.push({
        pathname: "auth/profile/select-class",
        params: { schoolId: school.id, schoolName: school.nome }
      }),
    }
    return [seeSchoolClassesButton, ...fundamentalI, ...fundamentalII];
  };

  const schoolsDropdown = schools.map(school => (
    <MainDropdown
      style={styles.dropdownContainer}
      label={school.nome}
      dropdownStyle={styles.mainDropdownStyle}
      key={school.nome + school.id}
    >
      <ButtonList buttons={selectedClasses(school)} />
    </MainDropdown>
  ));

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Stack.Screen options={{
          title: "Turmas",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <Text style={styles.title}>Suas turmas</Text>
        <Text style={styles.subtitle}>Escolas</Text>

        {!isLoading &&
          schoolsDropdown
        }

      </ScrollView>

      {isShowingDeleteModal &&
        <Modal
          onPressPrimary={handleUpdateClasses}
          onPressSecondary={handleCloseDeleteModal}
          smallButtons
          labels={{primary: "Remover turma", secondary: "Cancelar"}}
          fromBottom
          danger
        >
          <Text style={styles.title}>Deseja excluir esta turma?</Text>
          <Text style={styles.modalDescription}>Todas os alunos desta turma serão removidos</Text>
        </Modal>
      }
      { isLoading &&
        <Loading/>
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
  title: {
    marginBottom: 20,
    fontSize: 20,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 18,
    color: colors.subtitle,
    fontFamily: "Nunito_700Bold"
  },
  modalDescription: {
    marginBottom: 20,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  dropdownContainer: {
    marginBottom: 16
  },
  innerDropdownContainer: {
    marginBottom: 4
  },
  innerDropdowns: {
    borderBottomWidth: 1,
    borderColor: "#F0F3FD",
    borderTopWidth: 1,
    shadowOpacity: 0,
    elevation: 0
  },
  mainDropdownStyle: {
    marginHorizontal: "2%",
    padding: 0,
    width: "96%"
  },
  classContainer: {
    alignItems: "center",
    borderColor: colors.primaryPurple,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    width: "100%",
  },
  classLink: {
    alignItems: "center",
    marginBottom: 12,
    width: "100%"
  },
  classLinkCompletedText: {
    color: colors.greyBlue,
    fontFamily: "Nunito_400Regular",
    fontSize: 12
  },
  classLinkCompletedTextContainer: {
    backgroundColor: colors.secondaryGreyBlue,
    borderRadius: 4,
    fontFamily: "Nunito_400Regular",
    paddingHorizontal: 12,
    paddingVertical: 6
  },
})