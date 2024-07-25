import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "@constants/colors.js";

const SvgComponent = (props) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={props.color || colors.lightPurple}
      d="m11.91 6.331 5.76 5.76-7.9 7.91c-.37.37-.84.61-1.35.7l-4.74.79c-.06.01-.11.01-.17.01a1.028 1.028 0 0 1-1-1.18l.79-4.74c.09-.51.33-.98.7-1.35l7.91-7.9Zm8.39-2.63c-.77-.78-1.79-1.2-2.88-1.2-1.09 0-2.11.42-2.88 1.2l-1.21 1.21 5.76 5.76 1.21-1.21c.78-.77 1.2-1.79 1.2-2.88 0-1.09-.42-2.11-1.2-2.88Z"
    />
  </Svg>
)
export default SvgComponent
