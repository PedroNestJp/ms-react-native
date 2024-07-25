import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "@constants/colors.js";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || colors.primaryRed}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.333 13 8 8l4.666 5m0-10L8 8 3.333 3"
    />
  </Svg>
)
export default SvgComponent
