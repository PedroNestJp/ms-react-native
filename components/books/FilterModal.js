import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import Checkbox from 'expo-checkbox';

import Modal from "../Modal.js";
import colors from "@constants/colors.js";

export default function Filter({ close, years, setYears }) {
  const handleSelection = (index) => {
    const newYear = [...years];
    newYear[index].selected = !newYear[index].selected;
    setYears(newYear);
  }

  return (
    <Modal
      closable
      smallButtons
      onClose={close}
      fromBottom
      containerStyle={{paddingHorizontal: 0}}
    >
      <Text style={styles.modalTitle}>Selecione os anos</Text>

      <ScrollView
        style={styles.list}
      >
        {years.map((year, index) => (
          <TouchableOpacity
            style={[styles.yearButton, year.selected && styles.yearButtonSelected]}
            onPress={() => handleSelection(index)}
            key={index}
          >
            <View style={styles.optionsContainer}>
              <Checkbox
                value={year.selected}
                onValueChange={() => handleSelection(index)}
                color={year.selected ? colors.tertiaryBlue : undefined}
              />
              <Text style={styles.yearButtonLabel}>
                {year.label}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Modal>
  )
}
const styles = StyleSheet.create({
  modalTitle: {
    paddingHorizontal: 20,
    marginBottom: 20,
    fontFamily: "Nunito_700Bold",
    fontSize: 18,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: 'center',
    gap: 20,
  },
  list: {
    height: 300
  },
  yearButton: {
    padding: 16,
    paddingHorizontal: 20
  },
  yearButtonSelected: {
    backgroundColor: "#E8F1FA"
  },
  yearButtonLabel: {
    fontFamily: "Nunito_400Regular"
  }
})