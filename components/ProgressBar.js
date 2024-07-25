import { View } from "react-native";

export default function ProgressBar({style, height, width, progressBarStyle, color, progress}) {
  return (
    <View style={[
      style,
      { 
        height: height || 4, 
        width: width || "100%", 
        backgroundColor: "#E4E4E4",
        borderRadius: height ? height / 2 : 2
      }
    ]}>
      <View style={[
        progressBarStyle,
        { 
          backgroundColor: color,
          width: `${progress}%`,
          height: height || 4,
          borderRadius: height ? height / 2 : 2
        }
      ]} />
    </View>
  )
};