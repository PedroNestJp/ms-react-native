import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
    width={20}
    height={20}
  >
    <Path
      fill="#11BE75"
      d="M10 1.667C5.41 1.667 1.667 5.408 1.667 10c0 4.591 3.742 8.333 8.333 8.333 4.592 0 8.334-3.741 8.334-8.333 0-4.592-3.742-8.333-8.334-8.333Zm3.925 7.258L9.76 13.09a.854.854 0 0 1-.592.242.854.854 0 0 1-.592-.242l-2.5-2.5a.84.84 0 0 1 0-1.183.84.84 0 0 1 1.184 0l1.908 1.917 3.575-3.583a.84.84 0 0 1 1.183 0 .84.84 0 0 1 0 1.183Z"
    />
  </Svg>
)
export default SvgComponent
