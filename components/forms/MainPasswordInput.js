import { TouchableOpacity } from "react-native";
import { useState } from "react";

import MainInput from "@components/forms/MainInput.js";
import Eye from "@icons/Eye.js";

export default function MainPasswordInput({ placeholder, label, onChangeText, style}) {
  const [isShowingPassword, setIsShowingPassword] = useState(true);
  return (
    <MainInput
      placeholder={placeholder}
      label={label}
      style={style}
      onChangeText={onChangeText}
      password={isShowingPassword}
    >
      <TouchableOpacity onPress={() => setIsShowingPassword(!isShowingPassword)}>
        <Eye />
      </TouchableOpacity>
    </MainInput>
  )
}