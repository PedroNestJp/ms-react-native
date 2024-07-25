import { View, Text, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { useState, useEffect, useContext } from "react";
import { Stack } from "expo-router";

import colors from "@constants/colors.js";
import ButtonList from "@components/profile/ButtonList.js";
import TrashIcon from "@icons/Trash.js";
import MainSearch from "@components/forms/MainSearch.js";
import FilterModal from "@components/profile/FilterModal.js";
import FilterIcon from "@icons/Filter.js";
import PlusFilledIcon from "@icons/PlusFilled.js";
import MainIconButton from "@components/forms/MainIconButton.js";
import EmptyState from "@components/EmptyState.js";
import UserContext from "@context/user-context.js";
import Loading from "@components/Loading.js";
import Modal from "@components/Modal.js"
import { getSchoolList, updateSchoolList, searchSchools, getCities } from "@services/profile.js";

export default function SchoolsAndDisciplines() {
  const { user } = useContext(UserContext);
  const [isShowingDeleteModal, setIsShowingDeleteModal] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [teacherSchools, setTeacherSchool] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSchoolList, setSearchSchoolList ] = useState([]);
  const [schoolId, setSchoolId] = useState(null);
  const [cities, setCities] = useState([]);
  const selectedCities = cities.filter(city => city.selected).map(city => city.id);

  const handleOpenDeleteModal = (id) => {
    setIsShowingDeleteModal(true);
    setSchoolId(id);
  };
  const handleCloseDeleteModal = () => {
    setIsShowingDeleteModal(false);
    setSchoolId(null)
  }
  const handleSearchSchools = async () => {
    if (search.length < 3) return;
    try {
      setIsLoading(true);
      const { data: { escolas} } = await searchSchools(user.token, {nome: search});
      setSearchSchoolList(escolas || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleUpdateSchool = async (id) => {
    try {
      setIsLoading(true);
      await updateSchoolList(user.token, id);
      const { data: { escolas } } = await getSchoolList(user.token);
      setTeacherSchool(escolas);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
      handleCloseDeleteModal()
    }
  };
  const selectedSchools = teacherSchools.map((school) => (
    {
      ...school,
      title: school.nome,
      onPress: () => handleOpenDeleteModal(school.id),
      append: <TrashIcon />
    }
  ));
  const addSchoolList = searchSchoolList.map((school) => (
    {
      ...school,
      prepend: <Text style={styles.addSchoolText}>{school.nome}</Text>,
      onPress: () => handleUpdateSchool(school.id),
      append: <PlusFilledIcon />
    }
  ));
  const handleClearSearch = () => {
    setSearch("");
    setSearchSchoolList([]);
  };
  const handleApplyCitiesFilter = async () => {
    try {
      setIsLoading(true);
      const { data: { escolas} } = await searchSchools(user.token, {id_municipio: selectedCities});
      setSearchSchoolList(escolas || []);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getSchoolsAndCities = async () => {
      try {
        setIsLoading(true);
        const { data: { escolas } } = await getSchoolList(user.token);
        const { data: { municipios: cities } } = await getCities(user.token);
        setTeacherSchool(escolas);
        setCities(cities);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    getSchoolsAndCities();
  }, [])

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Stack.Screen options={{
          title: "Escolas",
          headerTintColor: '#fff',
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <Text style={styles.title}>Suas escolas</Text>

        <ButtonList
          buttons={selectedSchools}
          containerStyle={styles.buttonList}
        />

        <Text style={styles.title}>Adicionar escola</Text>

        <View style={styles.searchContainer}>
          <MainSearch
            onChangeText={setSearch}
            value={search}
            placeholder="Nome da escola"
            onPress={handleSearchSchools}
            style={styles.search}
            clear={handleClearSearch}
          />
          <MainIconButton
            icon={<FilterIcon />}
            style={styles.filter}
            onPress={() => setIsModalOpen(true)}
          />
        </View>

        { addSchoolList.length ?
          <ButtonList buttons={addSchoolList} /> :
          <EmptyState imageStyle={styles.image}>
            <>
              <Text style={styles.emptyTitle}>Procure uma escola</Text>
              <Text style={styles.emptyText}>Está com dificuldade? Utilize nossos <Text style={styles.emptyTextPurple}>filtros.</Text>
              </Text>
            </>
          </EmptyState>
        }
      </ScrollView>

      {isModalOpen &&
        <FilterModal
          closeWithoutFilter={() => setIsModalOpen(false)}
          close={handleApplyCitiesFilter}
          cities={cities}
          setCities={setCities}
        />
      }

      {isLoading &&
        <Loading />
      }

      {isShowingDeleteModal &&
        <Modal
          onPressPrimary={() => handleUpdateSchool(schoolId)}
          onPressSecondary={handleCloseDeleteModal}
          smallButtons
          labels={{primary: "Remover escola", secondary: "Cancelar"}}
          fromBottom
          danger
        >
          <Text style={styles.title}>Deseja excluir esta escola?</Text>
          <Text style={styles.modalDescription}>Todas as turmas desta escola serão removidas</Text>
        </Modal>
      }
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
  },
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
  buttonList: { marginBottom: 40 },
  searchContainer: {
    marginBottom: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative"
  },
  search: {
    marginRight: 10,
    flex: 1,
  },
  filter: {
    borderRadius: 12,
    width: 56,
    height: 56,
  },
  image: {
    width: 72,
    height: 72,
  },
  addSchoolText: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 16,
    color: colors.blue
  },
  modalDescription: {
    marginBottom: 20,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  emptyTitle: {
    fontFamily: "Nunito_600SemiBold",
    fontSize: 20,
    color: colors.blue
  },
  emptyText: {
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  emptyTextPurple: {
    fontFamily: "Nunito_600SemiBold",
    textDecorationLine: "underline",
    color: colors.primaryPurple
  },
});