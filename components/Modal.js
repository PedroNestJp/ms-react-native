import { View, StyleSheet, Dimensions, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import Animated, {
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { defaultConfig } from '@constants/animation.js';
import { useEffect, useState } from "react";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import MainButton from "@components/forms/MainButton.js"
import MainIconButton from "@components/forms/MainIconButton.js"
import Close from "@icons/Close.js"
import colors from "@constants/colors";

export default function Modal({
  offsetY,
  closable,
  labels,
  children,
  onPressPrimary,
  onPressSecondary,
  onClose,
  smallButtons,
  fromBottom,
  danger,
  containerStyle
}) {
  const [modalOpacity, setModalOpacity] = useState(0);
  useEffect(() => {
    setModalOpacity(1);
  });
  
  const animatedStyle = (opacity) => useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity, defaultConfig)
    }
  });

  return (
    <Animated.View style={[
      styles.backdrop,
      { height: Dimensions.get("window").height - useHeaderHeight() },
      animatedStyle(modalOpacity)
    ]}>
      <TouchableOpacity onPress={onClose} style={styles.clickOutside} />
        <View style={[
          styles.modalContainer, 
          fromBottom && {...styles.fromBottom, bottom: useBottomTabBarHeight()},
          containerStyle
        ]}>
          {
            closable &&
            (
              <MainIconButton
                icon={<Close />}
                type="transparent"
                style={styles.closeButton}
                onPress={onClose}
              />
            )
          }

          {children}
          {onPressPrimary && (
            <MainButton
              label={labels?.primary}
              onPress={onPressPrimary}
              small={smallButtons}
              type={danger ? "danger" : "primary"}
              textStyle={{color: "#fff"}}
            />
          )}
          {onPressSecondary && (
            <MainButton
              style={{ marginTop: 18 }}
              textStyle={danger && {color: colors.primaryRed}}
              label={labels?.secondary}
              onPress={onPressSecondary}
              outlined
              type={danger ? "danger" : "primary"}
              small={smallButtons}
            />
          )}
        </View> 
    </Animated.View>
  )
};

const styles = StyleSheet.create({
  backdrop: {
    width: Dimensions.get('window').width,
    position: "absolute",
    backgroundColor: "#000B",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
  },
  modalContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 24,
  },
  fromBottom: {
    width: "100%",
    position: "absolute",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  closeButton: {
    width: 20,
    height: 20,
    top: 30,
    right: 20,
    position: "absolute",
    zIndex: 10,
    elevation: 10,
  },
  clickOutside: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})