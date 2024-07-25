import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, Dimensions, Pressable } from 'react-native';
import { useState, useEffect, useContext } from "react";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold } from "@expo-google-fonts/nunito";

import { defaultConfig } from '@constants/animation.js';
import { alignCenter } from '@constants/styles';
import colors from "@constants/colors.js";
import MainButton from "@components/forms/MainButton.js";
import MainIconButton from "@components/forms/MainIconButton.js";
import UserContext from "@context/user-context.js";
import Arrow from "@icons/Arrow.js";

const isSmallHeight = Dimensions.get("window").height < 720;

export default function App() {
  const user = useContext(UserContext);

  const CAROUSEL_INDICATORS_CONFIG = {
    initialWidth: 40,
    initialColor: "#D9D9D9",
    activeWidth: 100,
    activeColor: colors.primaryPurple,
  };
  const [fontsLoaded] = useFonts({ Nunito_400Regular, Nunito_600SemiBold, Nunito_700Bold });

  const animatedStyle = (width, color) => useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, defaultConfig),
      backgroundColor: withTiming(color.value, defaultConfig)
    }
  });

  const [activeCarousel, setActiveCarousel] = useState(0);
  const [carouselConfig, setCarouselConfig] = useState([
    {
      title: "Seja bem vindo, professor!",
      description: "Entre a fundo nesta experiência que vai mudar completamente o seu dia a dia.",
      active: true,
      image: require('@assets/onboarding/onboarding-1.png'),
      width: useSharedValue(CAROUSEL_INDICATORS_CONFIG.activeWidth),
      color: useSharedValue(CAROUSEL_INDICATORS_CONFIG.activeColor)
    },
    {
      title: "Otimize seu tempo",
      description: "Insira respostas das avaliações com apenas um clique, o resto nós fazemos ;)",
      active: false,
      image: require('@assets/onboarding/onboarding-2.png'),
      width: useSharedValue(CAROUSEL_INDICATORS_CONFIG.initialWidth),
      color: useSharedValue(CAROUSEL_INDICATORS_CONFIG.initialColor)
    },
    {
      title: "Resultados precisos",
      description: "Saiba o aproveitamento das suas turmas ou de forma individual de maneira clara.",
      active: false,
      image: require('@assets/onboarding/onboarding-3.png'),
      width: useSharedValue(CAROUSEL_INDICATORS_CONFIG.initialWidth),
      color: useSharedValue(CAROUSEL_INDICATORS_CONFIG.initialColor)
    },
  ]);

  useEffect(() => {
    setCarouselConfig((value) => value.map((el, index) => {
      el.width.value = index === activeCarousel ?
        CAROUSEL_INDICATORS_CONFIG.activeWidth :
        CAROUSEL_INDICATORS_CONFIG.initialWidth;
      el.color.value = index === activeCarousel ?
        CAROUSEL_INDICATORS_CONFIG.activeColor :
        CAROUSEL_INDICATORS_CONFIG.initialColor;
      return el;
    }));
  }, [activeCarousel])

  const carouselIndicators = (
    <View style={styles.carouselIndicatorWrapper}>
      {
        carouselConfig.map((el) => {
          return (
            <Animated.View
              style={[styles.carouselIndicator, animatedStyle(el.width, el.color)]}
              key={el.title}
            />
          )
        })
      }
    </View>
  );

  const handleUserLoggedIn = async () => {
    try {
      const storageUser = await AsyncStorage.getItem("user");
      const storageToken = await AsyncStorage.getItem("token");
      // const storageTokenCreationDate = await AsyncStorage.getItem("tokenCreationDate");
      // const isTokenFromThreeDaysOrMore = differenceInDays(storageTokenCreationDate, new Date()) >= 3;
      if (storageUser !== null) {
        user.setUser({ user: JSON.parse(storageUser), token: storageToken });
        router.push("/auth");
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Get user: ", error);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imagesBackground}>
          <Image
            source={require('@assets/logo-mais-saber.png')}
            style={styles.logo}
          />
          <Image
            source={carouselConfig[activeCarousel].image}
            style={styles.onboardingImage}
          />
        </View>

        <View style={styles.contentWrapper}>
          <View style={{ width: "100%" }}>
            {carouselIndicators}
            <Text style={styles.title}>{carouselConfig[activeCarousel].title}</Text>
            <Text style={styles.description}>{carouselConfig[activeCarousel].description}</Text>
          </View>

          <View style={styles.actionArea}>
            {
              activeCarousel === 2 ?
                <MainButton
                  label="Entrar no aplicativo"
                  style={{ width: "100%" }}
                  onPress={() => router.push("/login")}
                /> :
                <>
                  <MainIconButton
                    icon={<Arrow />}
                    style={styles.nextButton}
                    onPress={() => setActiveCarousel((value) => value + 1)}
                  />
                  <Pressable onPress={handleUserLoggedIn} style={styles.skipButton} >
                    <Text style={styles.skipButtonText}> Pular </Text>
                  </Pressable>
                </>
            }
          </View>
        </View>
      </ScrollView>
      <View style={styles.progressIndicator}>
        <View style={[
          styles.progressIndicatorBar,
          { right: `${100 - 33.34 * (activeCarousel + 1)}%` }
        ]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: { flex: 1 },
  container: {
    paddingBottom: 24,
    width: "100%",
    backgroundColor: colors.backgroundGrey,
    minHeight: "100%"
  },
  contentWrapper: {
    marginHorizontal: 20,
    marginTop: 48,
    alignItems: "center"
  },
  imagesBackground: {
    margin: 6,
    paddingVertical: 48,
    backgroundColor: "#DDD5EF",
    borderRadius: 8,
    borderBottomLeftRadius: 48,
    borderBottomRightRadius: 48,
    height: isSmallHeight ? 320 : 420,
    ...alignCenter
  },
  logo: {
    resizeMode: "contain",
    width: isSmallHeight ? 153 : 170,
    height: isSmallHeight ? 66 : 74,
  },
  onboardingImage: {
    resizeMode: "contain",
    marginTop: isSmallHeight ? 30 : 50,
    width: isSmallHeight ? 192 : 240,
    height: isSmallHeight ? 160 : 200,
  },
  carouselIndicatorWrapper: {
    flexDirection: "row"
  },
  carouselIndicator: {
    borderRadius: 2,
    marginRight: 8,
    height: 4,
  },
  title: {
    marginTop: 24,
    fontSize: 24,
    fontFamily: "Nunito_700Bold",
    color: colors.blue
  },
  description: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Nunito_400Regular",
    color: colors.subtitle
  },
  nextButton: {
    width: 60,
    height: 60
  },
  skipButton: {
    position: "absolute",
    right: 0,
    top: 20,
  },
  skipButtonText: {
    fontSize: 16,
    fontFamily: "Nunito_400Regular",
    color: colors.blue,
    textDecorationLine: "underline"
  },
  actionArea: {
    width: "100%",
    marginTop: 60,
    alignItems: "center"
  },
  progressIndicatorBar: {
    height: 5,
    backgroundColor: "#d5d5d5",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  progressIndicatorBar: {
    height: 5,
    backgroundColor: colors.primaryGreen,
    position: "absolute",
    bottom: 0,
    left: 0,
  }
});
