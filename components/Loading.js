import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Animated, Easing, Text } from 'react-native';

import colors from "@constants/colors.js";

export default function App() {
  const [spinValue] = useState(new Animated.Value(0));

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  useEffect(() => {
    Animated.loop(
      Animated.timing(
        spinValue,
        {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }
      )
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Animated.View
          style={[styles.spinner, { transform: [{ rotate: spin }] }]}
          source={{ uri: 'https://reactjs.org/logo-og.png' }}
        >
        </Animated.View>
        <Text style={styles.loadingText}>carregando...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000B",
  },
  loadingContainer: {
    position: "relative",
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  spinner: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.primaryGreen,
    borderRadius: 100,
    borderTopWidth: 0,
  },
  loadingText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700"
  }
});