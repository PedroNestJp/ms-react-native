import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={props.color || "#9DB2CA"}
      d="M10.36 11.71 3.19 6.622A4.496 4.496 0 0 1 7 4.501h10c1.6 0 3.01.84 3.81 2.11l-7.15 5.08c-1.01.67-2.31.67-3.3.02Zm11.12-3.109-6.68 4.74c-.86.57-1.84.85-2.81.85-.96 0-1.92-.28-2.76-.84l-6.71-4.75c-.01.13-.02.27-.02.4v6c0 2.48 2.02 4.5 4.5 4.5h10c2.48 0 4.5-2.02 4.5-4.5v-6c0-.13-.01-.27-.02-.4Z"
    />
  </Svg>
)
export default SvgComponent
