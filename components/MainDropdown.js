import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import Animated, { withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { defaultConfig } from '@constants/animation.js';
import ChevronIcon from "@icons/Chevron.js";

export default function MainDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpacity, setDropdownOpacity] = useState(0);
  const [dropdownPosition, setDropdownPosition] = useState(-100);

  const animatedStyle = (opacity, position) => useAnimatedStyle(() => {
    return {
      opacity: withTiming(dropdownOpacity, defaultConfig),
      top: withTiming(dropdownPosition, defaultConfig)
    }
  });

  const openDropdown = () => {
    setDropdownPosition(6);
    setDropdownOpacity(1)
  };
  const closeDropdown = () => {
    setDropdownPosition(-40);
    
    setDropdownOpacity(0)
  };

  useEffect(() => {
    isOpen ? openDropdown() : closeDropdown();
  }, [isOpen])

  return (
    <View style={[props.style, { position: "relative" }]}>

      { (!isOpen && props.showSkirt) && 
        <View style={styles.fakeDropdown}/>
      }
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        style={[
          styles.dropdownContainer,
          props.containerStyle
        ]}
        activeOpacity={1}
      >
        { props.customLabel || <Text style={styles.label}>{props.label}</Text>}
        <Animated.View style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}>
          <ChevronIcon />
        </Animated.View>
      </TouchableOpacity>

      <Animated.View style={[
        styles.dropdown,
        props.dropdownStyle,
        animatedStyle(dropdownOpacity, dropdownPosition),
        { display: isOpen ? "flex" : "none" }
      ]}>
        {props.children}
      </Animated.View>
    </View>
  )
};
const styles = StyleSheet.create({
  dropdownContainer: {
    width: "100%",
    height: 68,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 24,
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 3, height: 20 },
    elevation: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 10,
  },
  fakeDropdown: {
    position: "absolute",
    bottom: -10,
    left: 10,
    right: 10,
    height: 20,
    borderRadius: 12,
    backgroundColor: "#fff"
  },
  dropdown: {
    padding: 16,
    position: "relative",
    width: "100%",
    borderRadius: 12,
    backgroundColor: "#fff",
    zIndex: 9,
  },
  label: {
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold"
  }
})