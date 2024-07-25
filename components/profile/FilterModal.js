import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";

import Modal from "../Modal.js";
import MainDropdown from "../MainDropdown.js";
import CheckedCircleIcon from "@icons/CheckedCircle.js";

export default function Filter({ close, cities, setCities, closeWithoutFilter }) {
  const handleSelection = (id) => {
    const newCities = [...cities];
    newCities.forEach(city => {
      city.id === id ? city.selected = !city.selected : city.selected = false;
    });
    setCities(newCities);
  };

  return (
    <Modal
      closable
      onPressPrimary={close}
      labels={{ primary: "Aplicar filtro" }}
      smallButtons
      onClose={closeWithoutFilter}
    >
      <Text style={styles.modalTitle}>Filtrar</Text>
      <Text style={styles.dropdownTitle}>Município</Text>
      <MainDropdown
        label="Selecione uma cidade"
        style={styles.dropdownContainer}
        dropdownStyle={styles.innerDropdown}
      >
        <ScrollView
          style={styles.list}
        >
          {cities.map(city => (
            <TouchableOpacity
              key={city.id}
              style={styles.cityButton}
              onPress={() => handleSelection(city.id)}
            >
              <View style={styles.cityTextIconContainer}>
                { city.selected &&
                  <CheckedCircleIcon/>
                }
                <Text style={styles.cityButtonLabel}>
                  {city.nome}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </MainDropdown>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalTitle: {
    marginBottom: 20,
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
  },
  dropdownTitle: {
    fontFamily: "Nunito_400Regular"
  },
  dropdownContainer: {
    marginBottom: 20,
  },
  innerDropdown: {
    borderColor: "#ddd",
    borderWidth: 1,
    padding: 0
  },
  list: {
    maxHeight: 100
  },
  cityButton: {
    padding: 16
  },
  cityTextIconContainer: {
    flexDirection: "row",
    gap: 12
  },
  cityButtonLabel: {
    fontFamily: "Nunito_400Regular"
  }
})