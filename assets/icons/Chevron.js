import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill={props.color || "#292448"}
        d="M12.5 15.948a.937.937 0 0 1-.67-.278l-5.055-5.056a.954.954 0 0 1 0-1.34.954.954 0 0 1 1.34 0L12.5 13.66l4.386-4.385a.953.953 0 0 1 1.34 0 .954.954 0 0 1 0 1.34L13.17 15.67a.993.993 0 0 1-.67.278Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.5 0h24v24H.5z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
