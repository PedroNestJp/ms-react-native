import * as React from "react"
import Svg, { Path } from "react-native-svg"

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={22}
    fill="none"
    {...props}
  >
    <Path fill={props.color || "#E22"} d="M3.01 2.2h12.358v1.066H3.01V2.2Z" />
    <Path
      fill={props.color || "#E22"}
      d="M16.055 4.125H2.914A1.296 1.296 0 0 1 1.637 2.75a1.376 1.376 0 0 1 1.277-1.375h13.14A.686.686 0 0 0 16.54.201.686.686 0 0 0 16.055 0H2.914a2.745 2.745 0 0 0-2.65 2.75 2.85 2.85 0 0 0 0 .337.689.689 0 0 0 0 .165V19.25A2.752 2.752 0 0 0 2.914 22h13.14a.686.686 0 0 0 .687-.688V4.861a.736.736 0 0 0-.686-.736Z"
    />
  </Svg>
)
export default SvgComponent
