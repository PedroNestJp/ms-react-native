import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#FF9A00"}
      d="M25 17.111V8.678l-11 5.989L.556 7.333 14 0l13.445 7.333v9.778H25ZM14 22l-8.555-4.644v-6.112L14 15.89l8.556-4.645v6.112L14 22Z"
    />
  </Svg>
)
export default SvgComponent
