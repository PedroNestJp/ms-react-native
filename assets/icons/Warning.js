import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="#a00"
    {...props}
  >
    <Path
      fill={props.color || "#212121"}
      d="M9.625 18.313a8.313 8.313 0 1 1 0-16.626 8.313 8.313 0 0 1 0 16.625Zm0 1.187a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z"
    />
    <Path
      fill={props.color || "#212121"}
      d="M8.44 13.563a1.188 1.188 0 1 1 2.375 0 1.188 1.188 0 0 1-2.376 0Zm.116-7.131a1.075 1.075 0 1 1 2.137 0l-.415 4.164a.656.656 0 0 1-1.307 0l-.415-4.164Z"
    />
  </Svg>
)
export default SvgComponent
