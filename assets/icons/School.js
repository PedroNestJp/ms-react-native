import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={23}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || "#11BE75"}
      d="M10.11.293a1.5 1.5 0 0 1 1.78 0l9.496 7.005c1.124.83.598 2.578-.74 2.7H1.352c-1.338-.122-1.863-1.87-.74-2.7L10.11.293ZM11 6.999a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm5.5 4h2.498v6h-2.5l.001-6Zm-2 6v-6H12v6h2.5Zm-4.5 0v-6H7.5v6H10Zm-4.5 0v-6H3v6h2.5Zm-2.25 1A3.25 3.25 0 0 0 0 21.25v.5a.752.752 0 0 0 .75.752h20.497a.75.75 0 0 0 .75-.75v-.5a3.25 3.25 0 0 0-3.25-3.25H3.251V18Z"
    />
  </Svg>
)
export default SvgComponent
