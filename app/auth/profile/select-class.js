import { Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { useContext, useEffect, useState } from "react";

import { getClassList, updateClassList } from "@services/profile.js";
import UserContext from "@context/user-context.js";
import colors from "@constants/colors.js";
import ButtonList from "@components/profile/ButtonList";
import Loading from "@components/Loading.js";
import TrashIcon from "@icons/Trash.js";
import PlusFilledIcon from "@icons/PlusFilled.js";
import Modal from "@components/Modal.js";

export default function SelectClass() {
  const { user } = useContext(UserContext);
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [classId, setClassId] = useState(null);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false)

  const params = useLocalSearchParams();

  useEffect(() => {
    const getClasses = async () => {
      try {
        setIsLoading(true);
        const { data: { turmas: classes }} = await getClassList(user.token, params.schoolId);
        setClasses(classes);
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false);
      }
    };
    getClasses();
  }, []);

  const classesList = classes.map(schoolClass => (
    {
      ...schoolClass,
      prepend: <Text style={styles.classText}>{schoolClass.descricao}</Text>,
      append: schoolClass.adicionada ? <TrashIcon /> : <PlusFilledIcon />,
      onPress: schoolClass.adicionada ? () => handleOpenDeleteModal(schoolClass.id) : () => handleUpdateClasses(schoolClass.id)
    }
  ));

  const handleOpenDeleteModal = (id) => {
    setIsShowingDeleteModal(true);
    setClassId(id);
  };
  const handleCloseDeleteModal = () => {
    setIsShowingDeleteModal(false);
    setClassId(null);
  }
  const handleUpdateClasses = async (classID) => {
    try {
      setIsLoading(true);
      await updateClassList(user.token, classID);
      const { data: { turmas: classes }} = await getClassList(user.token, params.schoolId);
      setClasses(classes);
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false);
      handleCloseDeleteModal();
    }
  };
  
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
        <Text style={styles.title}>{ params.schoolName }</Text>
        <Text style={styles.subtitle}>Adicionar turma</Text>

        {!isLoading &&
          <ButtonList buttons={classesList}/>
        }
      </ScrollView>

      {isShowingDeleteModal &&
        <Modal
          onPressPrimary={() => handleUpdateClasses(classId)}
          onPressSecondary={handleCloseDeleteModal}
          smallButtons
          labels={{primary: "Remover turma", secondary: "Cancelar"}}
          fromBottom
          danger
        >
          <Text style={styles.modalTitle}>Deseja excluir esta turma?</Text>
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
    fontSize: 20,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  modalTitle: {
    marginBottom: 20,
    fontSize: 20,
    color: colors.blue,
    fontFamily: "Nunito_700Bold"
  },
  modalDescription: {
    marginBottom: 20,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  subtitle: {
    marginBottom: 16,
    fontSize: 18,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  classText: {
    color: colors.blue,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16
  },
})