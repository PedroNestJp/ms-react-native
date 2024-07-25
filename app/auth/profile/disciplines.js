import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import { Stack } from "expo-router";

import colors from "@constants/colors.js";
import ButtonList from "@components/profile/ButtonList.js";
import TrashIcon from "@icons/Trash.js";
import PlusFilledIcon from "@icons/PlusFilled.js";
import UserContext from "@context/user-context.js";
import Loading from "@components/Loading.js";
import { getDisciplinesList, updateDisciplinesList } from "@services/profile.js";
import Modal from "@components/Modal.js"

export default function SchoolsAndDisciplines() {
  const { user } = useContext(UserContext);
  const [teacherDisciplines, setTeacherDisciplines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false)
  const [disciplineId, setDisciplineId] = useState(null);
  const portuguese = { name: "Língua Portuguesa", id: 1 };
  const math = { name: "Matemática", id: 2 };

  const handleOpenDeleteModal = (id) => {
    setIsShowingDeleteModal(true);
    setDisciplineId(id);
  };
  const handleCloseDeleteModal = () => {
    setIsShowingDeleteModal(false);
    setDisciplineId(null);
  }
  const handleUpdateDiscipline = async (id) => {
    try {
      setIsLoading(true);
      await updateDisciplinesList(user.token, id);
      const { data: { disciplinas: disciplines } } = await getDisciplinesList(user.token);
      setTeacherDisciplines(disciplines);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
      handleCloseDeleteModal();
    }
  };
  const selectedDisciplines = teacherDisciplines.map((discipline) => (
    {
      ...discipline,
      title: discipline.nome,
      onPress: () => handleOpenDeleteModal(discipline.id),
      append: <TrashIcon />
    }
  ));
  const addDisciplineList = teacherDisciplines.map((discipline) => (
    {
      ...discipline,
      prepend: <Text style={styles.addDisciplineText}>
        {discipline.nome === portuguese.name ? math.name : portuguese.name}
      </Text>,
      onPress: () => handleUpdateDiscipline(discipline.id === portuguese.id ? math.id : portuguese.id),
      append: <PlusFilledIcon />
    }
  ));

  useEffect(() => {
    const getDisciplines = async () => {
      try {
        setIsLoading(true);
        const { data: { disciplinas: disciplines } } = await getDisciplinesList(user.token);
        setTeacherDisciplines(disciplines);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getDisciplines();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Stack.Screen options={{
          title: "Disciplinas",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <Text style={styles.title}>Disciplinas adiciondas</Text>

        <ButtonList
          buttons={selectedDisciplines}
          containerStyle={styles.buttonList}
        />

        {selectedDisciplines.length < 2 ?
          <>
          <Text style={styles.title}>Adicionar disciplinas</Text>
            <ButtonList buttons={addDisciplineList}/>
          </> :
          null
        }
      </ScrollView>

      {isShowingDeleteModal &&
        <Modal
          onPressPrimary={() => handleUpdateDiscipline(disciplineId)}
          onPressSecondary={handleCloseDeleteModal}
          smallButtons
          labels={{primary: "Remover disciplina", secondary: "Cancelar"}}
          fromBottom
          danger
        >
          <Text style={styles.title}>Deseja excluir esta escola?</Text>
          <Text style={styles.modalDescription}>Tem certeza que você quer excluir esta disciplina?</Text>
        </Modal>
      }
      {isLoading &&
        <Loading/>
      }
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  addDisciplineText: {
    color: colors.blue,
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16
  },
  buttonList: { marginBottom: 40 },
  contentContainer: {
    minHeight: "100%",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  safeAreaContainer: {
    backgroundColor: colors.backgroundGrey,
    flex: 1,
  },
  title: {
    color: colors.blue,
    fontFamily: "Nunito_700Bold",
    fontSize: 20,
    marginBottom: 20
  },
  modalDescription: {
    marginBottom: 20,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
});