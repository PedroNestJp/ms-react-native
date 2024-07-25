import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "@constants/colors.js";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <Path
      fill={props.color || colors.primaryRed}
      d="M11.548 7.048 9.596 9l1.952 1.952a.422.422 0 1 1-.596.596L9 9.596l-1.952 1.952a.422.422 0 0 1-.596-.596L8.404 9 6.452 7.048a.422.422 0 0 1 .596-.596L9 8.404l1.952-1.952a.422.422 0 0 1 .596.596ZM16.172 9A7.171 7.171 0 1 1 9 1.828 7.18 7.18 0 0 1 16.172 9Zm-.844 0A6.328 6.328 0 1 0 9 15.328 6.334 6.334 0 0 0 15.328 9Z"
    />
  </Svg>
)
export default SvgComponent
