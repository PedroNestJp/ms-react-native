import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useEffect, useState } from "react";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import colors from "@constants/colors.js";
import Warning from "@icons/Warning.js";
import CheckedCircle from "@icons/CheckedCircle.js";
import Close from "@icons/Close.js";

import { defaultConfig } from "@constants/animation.js";

export default function Toaster ({text, type, hideTime, onHide, offsetY}) {
  const [toasterOpacity, setToasterOpacity] = useState(0);
  const [toasterOffsetY, setToasterOffsetY] = useState(offsetY || 40);

  const hasOffsetProp = !(offsetY === null || offsetY === undefined);
  useEffect(() => {
    setToasterOpacity(1);
    setToasterOffsetY(hasOffsetProp ? offsetY + 80 : 140);

    setTimeout(() => {
      setToasterOpacity(0);
      setToasterOffsetY(hasOffsetProp ? offsetY : 40);
    }, hideTime || 5000);
    setTimeout(() => {
      onHide();
    }, hideTime + 500 || 5500);
  }, []);

  const handleClose = () => {
    setToasterOpacity(0);
    setToasterOffsetY(hasOffsetProp ? offsetY : 40);
    setTimeout(() => {
      onHide();
    }, 500);
  };
  
  const animatedStyle = (opacity, bottom) => useAnimatedStyle(() => {
    return {
      opacity: withTiming(opacity, defaultConfig),
      bottom: withTiming(bottom, defaultConfig)
    };
  });

  return (
    <Animated.View
      style={[
        styles.toaster,
        styles[type],
        animatedStyle(toasterOpacity, toasterOffsetY)
      ]}
    >
      { type === "error" ?
        <Warning color={colors.primaryRed}/> :
        <CheckedCircle />
      }
      <Text style={styles.text}>{text}</Text>

      <View style={styles.closeContainer}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Close color="white"/>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    backgroundColor: colors.lightPurple,
    borderRadius: 8,
    padding: 3,
  },
  error: {
    backgroundColor: colors.secondaryRed,
  },
  success: {
    backgroundColor: colors.secondaryGreen,
  },
  text: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
    marginLeft: 10,
    flex: 1,
    textAlign: "center",
    marginRight: 34,
  },
  toaster: {
    position: "absolute",
    alignItems: "center",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 12,
    right: 20,
    left: 20
  },
  closeContainer: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    right: 14
  }
});