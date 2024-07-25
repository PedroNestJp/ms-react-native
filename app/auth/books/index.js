import { View, Text, ScrollView, SafeAreaView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Stack } from "expo-router";
import { useState, useContext } from "react";

import UserContext from "@context/user-context.js";
import MainSearch from "@components/forms/MainSearch.js"
import colors from "@constants/colors.js";
import { useEffect } from "react";
import { getBooks } from "@services/books.js";
import { PORTUGUESE, MATH } from "@constants/disciplines";
import FilterModal from "@components/books/FilterModal.js";
import FilterIcon from "@icons/Filter.js";
import MainIconButton from "@components/forms/MainIconButton.js";
import Loading from "@components/Loading.js";
import * as WebBrowser from 'expo-web-browser';

export default function Books() {
  const { user } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [years, setYears] = useState([
    { id: 1, label: "1º ano", selected: false },
    { id: 2, label: "2º ano", selected: false },
    { id: 3, label: "3º ano", selected: false },
    { id: 4, label: "4º ano", selected: false },
    { id: 5, label: "5º ano", selected: false },
    { id: 6, label: "6º ano", selected: false },
    { id: 7, label: "7º ano", selected: false },
    { id: 8, label: "8º ano", selected: false },
    { id: 9, label: "9º ano", selected: false },
  ]);
  const [isShowingFilterModal, setIsShowingFilterModal] = useState(false);
  const selectedYears = years.filter(year => year.selected).map(year => year.id);
  const handlePDFOpening = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      const { data } = await getBooks(user.token, {
        id_ano: selectedYears,
        nome: search
      });
      setBooks(data.livros);
    } catch (error) {
      console.error(`Livros: ${error}`)
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseModal = () => {
    setIsShowingFilterModal(false);
    handleSearch();
  };

  useEffect(() => {
    if (search.length) return;
    const getBooksList = async () => {
      try {
        setIsLoading(true);
        const { data } = await getBooks(user.token);
        setBooks(data.livros);
      } catch (error) {
        console.error(`Livros: ${error}`)
      } finally {
        setIsLoading(false);
      }
    }
    getBooksList();
  }, [search]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Stack.Screen options={{
          title: "Livros Didáticos",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <View style={styles.searchContainer}>
          <MainSearch
            value={search}
            onChangeText={setSearch}
            clear={() => setSearch("")}
            placeholder="Pesquisar livro"
            onPress={handleSearch}
            style={styles.search}
          />
          <MainIconButton
            icon={<FilterIcon />}
            style={styles.filter}
            onPress={() => setIsShowingFilterModal(true)}
          />
        </View>

        <View style={styles.divider}></View>

        <View style={styles.booksGrid}>
          {books.map(book => (
            <TouchableOpacity
              style={styles.booksContainer}
              key={book.id}
              onPress={() => handlePDFOpening(book.url)}
            >
              <View style={styles.bookButton}>
                <Image
                  source={{ uri: book.imagem }}
                  style={styles.bookCover}
                />
                <Text style={styles.bookTitle}>{book.titulo}</Text>
                <View style={book.disciplina === PORTUGUESE ? styles.bookDisciplinePortuguese : styles.bookDisciplineMath}>
                  <Text style={book.disciplina === PORTUGUESE ? styles.bookTitlePortuguese : styles.bookTitleMath}>{book.disciplina}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {isShowingFilterModal &&
        <FilterModal
          close={handleCloseModal}
          years={years}
          setYears={setYears}
        />
      }
      {isLoading &&
        <Loading />
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
    backgroundColor: colors.backgroundGrey,
  },
  divider: {
    alignSelf: "stretch",
    height: 1,
    backgroundColor: "#D4DFEA"
  },
  searchContainer: {
    marginBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  search: {
    flex: 1,
  },
  filter: {
    borderRadius: 12,
    width: 56,
    height: 56,
  },
  booksGrid: {
    marginTop: 30,
    gap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between"
  },
  booksContainer: {
    width: "47%",
    paddingTop: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 20 },
    elevation: 4,
  },
  bookInner: {
    gap: 12,
    alignItems: "center"
  },
  bookCover: {
    width: 72,
    height: 98,
    resizeMode: "contain"
  },
  bookTitle: {
    padding: 12,
    textAlign: "center",
    fontSize: 14,
    fontFamily: "Nunito_600SemiBold",
  },
  get bookTitlePortuguese() {
    return {
      ...this.bookTitle,
      color: "#298EE6"
    }
  },
  get bookTitleMath() {
    return {
      ...this.bookTitle,
      color: colors.primaryPurple
    }
  },
  bookDiscipline: {
    padding: 12,
    textAlign: "center",
    fontSize: 12,
    fontFamily: "Nunito_700Bold",
  },
  bookDisciplineMath: {
    backgroundColor: "#EEE0FF",
  },
  bookDisciplinePortuguese: {
    backgroundColor: "#DFF0FF"
  }
})