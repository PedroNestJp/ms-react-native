import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#11BE75"}
      d="M15 2.5H9C5.42 2.5 2.5 5.42 2.5 9v6c0 3.58 2.92 6.5 6.5 6.5h6c3.58 0 6.5-2.92 6.5-6.5V9c0-3.58-2.92-6.5-6.5-6.5ZM16 13h-3v3c0 .55-.45 1-1 1s-1-.45-1-1v-3H8c-.55 0-1-.45-1-1s.45-1 1-1h3V8c0-.55.45-1 1-1s1 .45 1 1v3h3c.55 0 1 .45 1 1s-.45 1-1 1Z"
    />
  </Svg>
)
export default SvgComponent
