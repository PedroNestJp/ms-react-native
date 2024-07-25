import { SafeAreaView, ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams, Stack, router, usePathname } from "expo-router";
import { useEffect, useState, useContext } from "react";

import Warning from "@icons/Warning.js";
import { getDisciplineTitle } from "@constants/disciplines.js";
import Loading from "@components/Loading.js";
import Header from "@components/Header.js";
import Modal from "@components/Modal.js";
import MainSearch from "@components/forms/MainSearch.js";
import MainButton from "@components/forms/MainButton.js";
import EmptyState from "@components/EmptyState.js";
import colors from "@constants/colors.js";
import api from "@services/api.js";
import UserContext from "@context/user-context.js";
import { removeAccents } from "@utils/strings";

export default function Exams() {
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [isShowingSubmitModal, setIsShowingSubmitModal] = useState(false);
  const [isShowingSuccessModal, setIsShowingSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [userId, setUserId] = useState(0);
  const [userName, setUserName] = useState("");
  const [userExamStatus, setUserExamStatus] = useState(0);

  const params = useLocalSearchParams();
  const { user } = useContext(UserContext);

  const examParams = {
    ...params,
    userId: userId,
    userName: userName,
    userExamStatus: userExamStatus
  };

  const [filters, setFilters] = useState([
    { text: "Iniciada", active: false, type: "started" },
    { text: "Entregue", active: false, type: "finished" },
    { text: "Não entregue", active: false, type: "open" },
  ]);
  const newPath = usePathname();

  useEffect(() => {
    if (newPath !== '/auth/responses/see-students') {
      return;
    }

    const getStudents = async () => {
      try {
        setIsLoading(true);
        const { data } = await api.get(`/avaliacoes/alunos?avaliacao=${params.examId}&escola=${params.schoolId}&turma=${params.schoolClassId}`, {
          headers: {
            "Authorization": 'Bearer ' + user.token
          },
        });
        setStudents(data.alunos);
        setFilteredStudents(data.alunos);
      } catch (error) {
        console.error("Estudantes: ", error)
      }
      setIsLoading(false);
    }

    getStudents();
  }, [newPath])

  const status = {
    open: {
      status: "Não entregue",
      color: "#6A8EB8",
      secondaryColor: colors.secondaryGreyBlue,
    },
    finished: {
      status: "Entregue",
      color: colors.primaryGreen,
      secondaryColor: colors.secondaryGreen,
    },
    started: {
      status: "Iniciada",
      color: colors.primaryYellow,
      secondaryColor: colors.secondaryYellow,
    },
  }

  const handleToggleFilter = (index) => {
    setFilters(filters => {
      const newFilters = [...filters];
      newFilters[index].active = !newFilters[index].active;

      if (newFilters.some(filter => filter.active)) {
        const statusToFilterType = { 0: "started", 1: "finished", "null": "open" };
        const activeFilters = filters.map(filter => filter.active && filter.type);

        setFilteredStudents(() => {
          const newStudents = [...students];
          return newStudents.filter((student) => {
            return activeFilters.includes(statusToFilterType[student.status])
          })
        });
      } else {
        setFilteredStudents(students)
      }

      return [...newFilters];
    });
  };

  const insertOptions = [
    {
      title: "Escanear gabarito",
      action: () => {
        router.push({
          pathname: "/auth/responses/scan-instructions",
          params: examParams
        });
        setIsShowingModal(false);
      },
      image: require("@assets/escanear-gabarito.png")
    },
    {
      title: "Inserir manualmente",
      action: () => {
        router.push({
          pathname: "/auth/responses/insert-responses",
          params: examParams
        });
        setIsShowingModal(false);
      },
      image: require("@assets/inserir-manualmente.png")
    },
  ];

  const handleSubmitClassExams = async () => {
    try {
      setIsLoading(true);
      await api.post("/avaliacoes/concluir-turma",
        {
          id_avaliacao: params.examId,
          id_escola: params.schoolId,
          id_turma: params.schoolClassId
        },
        {
          headers: { "Authorization": 'Bearer ' + user.token }
        }
      );
      setIsShowingSuccessModal(true);
    } catch (error) {
      console.log("Estudantes: ", error)
    } finally {
      setIsLoading(false);
      setIsShowingSubmitModal(false);
    }
  };

  const handleSeeQuestions = () => {
    router.push({
      pathname: "auth/responses/see-questions",
      params: {
        ...params,
      }
    });
  };

  const handleSearchStudent = (searchInput) => {
    setSearch(searchInput);
    if (!searchInput) {
      return setFilteredStudents(students)
    }
    setFilteredStudents(() => {
      return students.filter(student =>
        removeAccents(student.nome.toLowerCase()).includes(removeAccents(searchInput.toLowerCase()))
      );
    })
  };

  const handleClear = () => {
    setSearch("");
    setFilteredStudents(students);
  };


  const handleStudentClick = (student) => {
    setUserId(student.id);
    setUserName(student.nome);
    setUserExamStatus(student.status);

    if (params.examFinished === "true" || student.status === 1) {
      router.push({
        pathname: "/auth/responses/insert-responses",
        params: {
          ...examParams,
          userId: student.id,
          userName: student.nome,
          userExamStatus: student.status
        },
      });
    } else {
      setIsShowingModal(true);
    }
  }

  const statusMatcher = (studentStatus) => {
    switch (studentStatus) {
      case 0:
        return status.started;
      case 1:
        return status.finished;
      default:
        return status.open;
    }
  }

  const StudentsList = filteredStudents.map(student => (
    <TouchableOpacity
      key={student.nome + student.id}
      style={styles.students}
      onPress={() => handleStudentClick(student)}
    >
      <Text style={styles.studentName}>{student.nome}</Text>
      <View style={[
        styles.status,
        { backgroundColor: statusMatcher(student.status).secondaryColor }
      ]}>
        <Text style={[
          styles.statusText,
          { color: statusMatcher(student.status).color }
        ]}>
          {statusMatcher(student.status).status}
        </Text>
      </View>
    </TouchableOpacity>
  ));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: params.className,
        headerTintColor: '#fff',
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />

      <ScrollView
        contentContainerStyle={styles.contentWrapper}
        scrollEnabled={!isShowingModal}
        scrollEventThrottle={10}
      >
        <Header
          discipline={getDisciplineTitle(params.discipline)}
          title={params.examName}
          start={params.start}
          end={params.end}
          handleSeeQuestions={handleSeeQuestions}
        />

        <View style={{ paddingHorizontal: 20 }}>
          {params.examFinished === "true" && // remove === "true" BUG
            <View style={styles.submittedExamContainer}>
              <Warning style={styles.submittedIcon} />
              <Text style={styles.submittedExamText}>
                Avaliação entregue! Novas respostas não poderão ser inseridas.
              </Text>
            </View>
          }
          <Text style={styles.title}>Pesquise pelos estudantes</Text>
          <MainSearch
            placeholder="Buscar estudante"
            style={styles.searchBar}
            onChangeText={handleSearchStudent}
            value={search}
            clear={handleClear}
          />

          <Text style={{ fontFamily: "Nunito_400Regular" }}>Filtros:</Text>
          <View style={styles.filtersContainer}>
            {
              filters.map((filter, index) => (
                <TouchableOpacity
                  style={[
                    styles.filterButton,
                    index === filters.length - 1 && { marginRight: 0 },
                    filter.active && { backgroundColor: status[filter.type].secondaryColor, borderColor: status[filter.type].color }
                  ]}
                  key={filter.text + index}
                  onPress={() => handleToggleFilter(index)}
                >
                  <Text
                    style={[
                      styles.filterButtonText,
                      filter.active && { color: status[filter.type].color }
                    ]}
                  >
                    {filter.text}
                  </Text>
                </TouchableOpacity>
              ))
            }
          </View>

          {!isLoading &&
            StudentsList
          }

          {(filteredStudents.length === 0 && !isLoading) &&
            <EmptyState text="Não achamos nada por aqui." />
          }
        </View>
      </ScrollView>

      {!(params.examFinished === "true") && // remove === "true" BUG
        <MainButton
          label="Concluir turma"
          style={styles.submitClassButton}
          onPress={() => setIsShowingSubmitModal(true)}
        />
      }

      {isLoading &&
        <Loading />
      }

      {isShowingModal && (
        <Modal
          closable={true}
          onClose={() => setIsShowingModal(false)}
        >
          <Text style={styles.modalTitle}>Como deseja inserir as respostas?</Text>
          <View style={styles.chooseInsertingTypeContainer}>
            {insertOptions.map(insertOption => (
              <TouchableOpacity
                style={styles.chooseInsertingTypeButton}
                onPress={() => insertOption.action()}
                key={insertOption.title}
              >
                <>
                  <Image
                    source={insertOption.image}
                    style={styles.chooseInsertingTypeImage}
                  />
                  <Text style={{ fontFamily: "Nunito_400Regular" }}>{insertOption.title}</Text>
                </>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      )}

      {isShowingSubmitModal && (
        <Modal
          fromBottom
          onPressPrimary={handleSubmitClassExams}
          onPressSecondary={() => setIsShowingSubmitModal(false)}
          labels={{ primary: "Entregar avaliações da turma", secondary: "Cancelar" }}
          smallButtons
        >
          <Text style={styles.modalTitle}>Atenção</Text>
          <Text style={styles.modalSubtitle}>
            Após entregue, nenhuma avaliação pode ser alterada, e você não poderá inserir novas respostas. Confira e revise se não tem nenhuma avaliação pendente nesta turma.
          </Text>
        </Modal>
      )}

      {isShowingSuccessModal && (
        <Modal
          closable={true}
          onClose={() => setIsShowingSuccessModal(false)}
          labels={{ primary: "Fechar" }}
          onPressPrimary={() => setIsShowingSuccessModal(false)}
        >
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("@assets/avaliacao-entregue.png")}
              style={styles.submitSuccessImage}
            />
            <Text style={styles.modalTitle}>Avaliação entregue!</Text>
            <Text style={styles.modalSubtitle}>Parabéns. Sucesso na entrega.</Text>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  contentWrapper: {
    paddingBottom: 90,
    minHeight: "100%",
    backgroundColor: colors.backgroundGrey
  },
  searchBar: {
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  submittedExamContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: colors.secondaryGreen,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12
  },
  submittedIcon: {
    marginRight: 16
  },
  submittedExamText: {
    fontSize: 14,
    flex: 1,
    textAlign: "center",
    fontFamily: "Nunito_400Regular",
  },
  title: {
    marginBottom: 30,
    fontSize: 20,
    fontFamily: "Nunito_600SemiBold",
  },
  filtersContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8EF"
  },
  filterButton: {
    marginRight: "auto",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#9E9E9E",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
  filterButtonText: {
    color: "#9E9E9E",
    fontFamily: "Nunito_600SemiBold",
  },
  students: {
    marginBottom: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 3, height: 10 },
    elevation: 4
  },
  studentName: {
    flex: 1,
    fontFamily: "Nunito_400Regular",
    fontSize: 16
  },
  status: {
    marginLeft: 10,
    borderRadius: 8,
    padding: 8,
  },
  statusText: {
    fontFamily: "Nunito_700Bold",
  },
  chooseInsertingTypeContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },
  modalTitle: {
    maxWidth: "92%",
    marginBottom: 12,
    fontSize: 18,
    fontFamily: "Nunito_700Bold",
  },
  chooseInsertingTypeButton: {
    marginHorizontal: 8,
    backgroundColor: "#F0F2F7",
    borderRadius: 8,
    width: 140,
    height: 165,
    justifyContent: "center",
    alignItems: "center"
  },
  chooseInsertingTypeImage: {
    marginBottom: 8,
    width: "80%",
    height: "60%",
    resizeMode: "contain"
  },
  submitClassButton: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 20,
  },
  modalSubtitle: {
    marginTop: -8,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 30,
    color: colors.subtitle,
    fontFamily: "Nunito_400Regular"
  },
  submitSuccessImage: {
    marginBottom: 20,
    resizeMode: "contain",
    width: 70,
    height: 96
  }
});