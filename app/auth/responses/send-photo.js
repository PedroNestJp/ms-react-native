import { View, Image, ScrollView, SafeAreaView, Text, StyleSheet } from "react-native";
import { router, useLocalSearchParams, Stack } from "expo-router";
import { useState } from "react";

import { getDisciplineTitle } from "@constants/disciplines.js";
import { api } from "@services/reader-api.js";
import Header from "@components/Header.js";
import MainButton from "@components/forms/MainButton.js";
import colors from "@constants/colors.js";
import Loading from "@components/responses/loading.js";

export default function SendResponses() {
  const params = useLocalSearchParams();

  const [isShowingLoadingModal, SetIsShowingLoadingModal] = useState(false);
  const handleSeeQuestions = () => {
    router.push({
      pathname: "auth/responses/see-questions",
      params: {
        ...params
      }
    });
  };

  const handleSendImage = async () => {
    try {
      SetIsShowingLoadingModal(true);
      
      const image = await fetch(params.uri);
      const imageBlob = await image.blob();

      let body = new FormData();
      body.append("image", {
        uri: params.uri,
        name: imageBlob._data.name,
        type: imageBlob.type
      });
      
      const { data } = await api.post("", body);

      router.push({
        pathname: "auth/responses/insert-responses",
        params: {
          ...params,
          isAutomatic: "true",
          scanResponses: JSON.stringify(data)
        }
      });
    } catch (error) {
      console.error("error:" + JSON.stringify(error));
      delete params.uri;
      router.push({
        pathname: "auth/responses/scan-instructions",
        params: {
          ...params,
          error: true
        }
      });
    } finally {
      SetIsShowingLoadingModal(false);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack.Screen options={{
        title: params.userName,
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        },
        headerShown: !isShowingLoadingModal
      }} />

      <ScrollView contentContainerStyle={styles.container}>
        <Header
          title={params.examName}
          discipline={getDisciplineTitle(params.discipline)}
          start={params.start}
          end={params.end}
          handleSeeQuestions={handleSeeQuestions}
        />

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.title}>Envio de imagem</Text>
          <Text style={styles.subtitle}>Certifique-se de a imagem está clara e que as respostas estão devidamente respondidas.</Text>
          <View style={styles.imageContainer}>
            <Image
              style={styles.responseImage}
              source={{ uri: params.uri }}
            />
          </View>

          <MainButton
            label="Enviar imagem"
            small
            onPress={handleSendImage}
          />
          <MainButton
            label="Alterar imagem"
            outlined
            style={styles.changeImageButton}
            textStyle={styles.changeImageButtonText}
            small
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>

      {isShowingLoadingModal &&
        <Loading />
      }
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    minHeight: "100%",
    backgroundColor: colors.backgroundGrey,
  },
  disciplineImage: {
    width: 71,
    height: 64,
    resizeMode: "contain"
  },
  seeQuestionsButton: {
    marginTop: 8,
    paddingVertical: 8,
    borderColor: colors.primaryPurple
  },
  seeQuestionsButtonText: {
    color: colors.primaryPurple
  },
  title: {
    fontSize: 20,
    fontFamily: "Nunito_700Bold",
    marginBottom: 8
  },
  subtitle: {
    fontFamily: "Nunito_400Regular"
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: "center"
  },
  responseImage: {
    height: 287,
    width: 210,
    resizeMode: "contain"
  },
  changeImageButton: {
    marginVertical: 20,
    borderColor: colors.primaryPurple
  },
  changeImageButtonText: {
    color: colors.primaryPurple,
    fontWeight: "500",
  }
})