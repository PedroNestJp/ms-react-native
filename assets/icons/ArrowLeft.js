import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#fff"}
      d="M20 11.5H7.83l5.59-5.59L12 4.5l-8 8 8 8 1.41-1.41-5.58-5.59H20v-2Z"
    />
  </Svg>
)
export default SvgComponent
