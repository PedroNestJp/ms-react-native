import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "@constants/colors.js"
const SvgComponent = (props) =>
  props.stroked ? (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={27}
      fill="none"
      {...props}
      stroke={props.borderColor || colors.primaryPurple}
      strokeWidth={2}
    >
      <Path
        fill={props.color || colors.primaryPurple}
        d="M24.688 12.386v6.744a5.065 5.065 0 0 1-5.063 5.058h-2.813v-5.06a2.813 2.813 0 0 0-5.625 0v5.06H8.376a5.066 5.066 0 0 1-5.063-5.058v-6.744c0-1.538.689-2.976 1.888-3.941l5.625-4.523a5.097 5.097 0 0 1 6.349 0l5.625 4.523a5.035 5.035 0 0 1 1.889 3.941Z"
      />
    </Svg>
  ) :
  (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={27}
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || colors.primaryPurple}
        d="M24.688 12.386v6.744a5.065 5.065 0 0 1-5.063 5.058h-2.813v-5.06a2.813 2.813 0 0 0-5.625 0v5.06H8.376a5.066 5.066 0 0 1-5.063-5.058v-6.744c0-1.538.689-2.976 1.888-3.941l5.625-4.523a5.097 5.097 0 0 1 6.349 0l5.625 4.523a5.035 5.035 0 0 1 1.889 3.941Z"
      />
    </Svg>
  )
export default SvgComponent
