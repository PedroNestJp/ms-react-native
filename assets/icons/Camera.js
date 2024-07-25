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
      fill={props.color || "#292448"}
      d="M14 13c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2Zm7.5-2v5c0 2.48-2.02 4.5-4.5 4.5H7c-2.48 0-4.5-2.02-4.5-4.5v-5c0-2.39 1.87-4.35 4.23-4.49l1.26-1.9c.47-.69 1.24-1.11 2.08-1.11h3.86c.84 0 1.61.42 2.08 1.11l1.26 1.9c2.36.14 4.23 2.1 4.23 4.49ZM16 13c0-2.21-1.79-4-4-4s-4 1.79-4 4 1.79 4 4 4 4-1.79 4-4Zm3-3c0-.55-.45-1-1-1s-1 .45-1 1 .45 1 1 1 1-.45 1-1Z"
    />
  </Svg>
)
export default SvgComponent
