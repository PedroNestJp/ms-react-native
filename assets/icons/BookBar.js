import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import colors from "@constants/colors.js";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    {...props}
  >
    <G fill="#6A8EB8" clipPath="url(#a)">
      <Path d="M7.5 4.481c0-.32.26-.581.581-.581H20.42a.581.581 0 1 1 0 1.162H8.08a.581.581 0 0 1-.581-.58Z" />
      <Path d="M21.75 6H7.395A1.417 1.417 0 0 1 6 4.5 1.5 1.5 0 0 1 7.395 3H21.75a.75.75 0 1 0 0-1.5H7.395a3 3 0 0 0-2.895 3 3.107 3.107 0 0 0 0 .367.75.75 0 0 0 0 .18V22.5a3 3 0 0 0 2.895 3H21.75a.75.75 0 0 0 .75-.75V6.803A.803.803 0 0 0 21.75 6ZM21 24H7.395A1.5 1.5 0 0 1 6 22.5V7.162c.426.236.908.352 1.395.338H21V24Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h27v27H0z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
