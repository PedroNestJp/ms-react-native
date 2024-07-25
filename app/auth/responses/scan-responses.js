import { Camera, CameraType } from 'expo-camera';
import { useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, Stack, useLocalSearchParams, usePathname } from 'expo-router';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import colors from "@constants/colors";
import MainButton from "@components/forms/MainButton.js";
import ImageIcon from "@icons/Image.js";
import { useEffect } from 'react';

const isSmallDevice = Dimensions.get("window").width < 380;

export default function App() {
  const cameraRef = useRef(null);
  const params = useLocalSearchParams();
  const pathname = usePathname();
  const [isCameraMounted, setIsCameraMounted] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useEffect(() => {
    const responsesPath = "/auth/responses/scan-responses";
    if (pathname !== responsesPath) {
      setIsCameraMounted(false);
    } else {
      setIsCameraMounted(true);
    }
  }, [usePathname()])

  const pickImage = async () => {
    try {
      let photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 0.3,
      });
      router.push({
        pathname: "auth/responses/send-photo", 
        params: {
          ...params,
          uri: photo.assets[0].uri,
        }
      });
    } catch (error) {
      console.error(`Choose photo: ${error}`)
    }
  };

  const handleTakePhoto = async () => {
    try {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.3
      });
      router.push({
        pathname: "auth/responses/send-photo", 
        params: {
          uri: photo.uri,
          ...params,
        }
      });
    }
    catch (error) {
      console.error(error)
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{
          title: "Tirar foto",
          headerTintColor: "#fff",
          headerTitleStyle: {
            color: "#fff",
            fontFamily: "Nunito_600SemiBold"
          }
        }} />

        <Text style={styles.askPermission}>Precisamos da sua permissão para acessar a câmera</Text>
        <MainButton
          label="Permitir uso da câmera"
          onPress={requestPermission}
        />
      </View>
    );
  }

  return (
    <View style={styles.cameraContainer}>
      <Stack.Screen options={{
        title: "Tirar foto",
        headerTintColor: "#fff",
        headerTitleStyle: {
          color: "#fff",
          fontFamily: "Nunito_600SemiBold"
        }
      }} />
      <Text style={styles.fitText}>Enquadre o cartão de respostas na moldura abaixo</Text>

      <View style={styles.photoBox}>
        {isCameraMounted &&
          <Camera
            style={styles.camera}
            type={CameraType.back}
            ref={cameraRef}
          />
        }
        <View style={styles.photoBoxBorders}></View>
      </View>
      <Text style={styles.help}>Precisa de ajuda?</Text>

      <View style={styles.photoOptionContainer}>
        <TouchableOpacity
          style={styles.photoButton}
          onPress={handleTakePhoto}
        >
          <View style={styles.photoButtonInner} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.choosePhotoFromGalleryButton}
          onPress={pickImage}
        >
          <ImageIcon />
        </TouchableOpacity>
      </View>

      <MainButton
        label="Inserir respostas manualmente"
        style={styles.manuallyInsertButton}
        outlined
        textStyle={{ color: "#fff" }}
        small={isSmallDevice}
        onPress={() => {
          delete params.isAutomatic;
          router.replace({
            pathname: "/auth/responses/insert-responses",
            params
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: isSmallDevice ? 0 : 20,
    backgroundColor: colors.backgroundGrey
  },
  askPermission: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Nunito_600SemiBold",
    marginBottom: 10,
  },
  cameraContainer: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#000a"
  },
  camera: {
    flex: 1,
    borderRadius: 20,
  },
  fitText: {
    color: "#fff",
    fontSize: isSmallDevice ? 18 : 20,
    textAlign: "center",
    width: 270,
    fontFamily: "Nunito_700Bold",
  },
  photoBox: {
    marginTop: 20,
    width: isSmallDevice ? 198 : 220,
    height: isSmallDevice ? 252 : 280,
  },
  photoBoxBorders: {
    position: "absolute",
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#fff",
    top: -4,
    left: -4,
    bottom: -4,
    right: -4
  },
  help: {
    marginTop: 20,
    color: "#fff",
    fontSize: 16,
    textDecorationLine: "underline",
    fontFamily: "Nunito_600SemiBold",
  },
  photoOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: isSmallDevice ? 24 : 40,
    position: "relative"
  },
  choosePhotoFromGalleryButton: {
    alignItems: "center",
    justifyContent: "center",
    width: isSmallDevice ? 50 : 60,
    height: isSmallDevice ? 50 : 60,
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 2,
    position: "absolute",
    left: 95,
    top: 5
  },
  photoButton: {
    padding: 2,
    width: isSmallDevice ? 60 : 70,
    height: isSmallDevice ? 60 : 70,
    borderRadius: 40,
    borderColor: "#fff",
    borderWidth: 2
  },
  photoButtonInner: {
    flex: 1,
    borderRadius: 50,
    backgroundColor: "#fff"
  },
  manuallyInsertButton: {
    margin: 20,
    borderColor: "#fff",
  },
});
