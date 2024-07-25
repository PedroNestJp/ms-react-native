import { useContext, useState } from "react";
import UserContext from "@context/user-context";
import { updatePhoto } from "@services/profile";
import { launchImagePicker } from "@utils/images";
import { Image } from "react-native";

export default function changeProfilePhoto() {
  const { user: { token }, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const userPhotoUpdate = (imageUri) => {
    setUser((prevUser) => ({
      ...prevUser,
      user: {
        ...prevUser.user,
        foto: imageUri
      },
    }));
  };

  const addProfilePhoto = async (mode, showToast) => {
    try {
      setIsLoading(true);
      const result = await launchImagePicker(mode);
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await saveNewPhoto(imageUri, showToast);
      }
    } catch (error) {
      showToast("Erro no upload da imagem", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProfilePhoto = async (showToast) => {
    try {
      setIsLoading(true);
      let image = require("../../../assets/profile-icon.jpg");
      let imageUri = Image.resolveAssetSource(image).uri;
      if (imageUri) {
        await saveNewPhoto(imageUri, showToast);
      }
    } catch (error) {
      showToast("Erro ao excluir sua imagem do servidor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const saveNewPhoto = async (imageUri, showToast) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("foto", {
        uri: imageUri,
        name: "image-profile.jpg",
        type: "image/jpg",
      });
      const response = await updatePhoto(token, formData);
      if (response.data.error) {
        showToast("Erro ao salvar imagem no servidor", "error");
      } else {
        userPhotoUpdate(response.data[0].valor);
        showToast("Imagem salva com sucesso 🥳", "success");
      }
    } catch (error) {
      showToast("Erro ao enviar sua imagem para o servidor", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    addProfilePhoto,
    deleteProfilePhoto
  };
}
