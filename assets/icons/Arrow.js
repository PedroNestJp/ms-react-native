import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M21.28 12.53l-7 7a.748.748 0 01-1.06 0 .75.75 0 010-1.061l5.72-5.72H2.75a.75.75 0 010-1.5h16.189l-5.72-5.72a.75.75 0 111.061-1.061l7 7a.751.751 0 010 1.062z"
        fill={props.color || "#fff"}
      />
    </Svg>
  )
}

export default SvgComponent
