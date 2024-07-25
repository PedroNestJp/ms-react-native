import * as React from "react"
import Svg, { Path } from "react-native-svg"
import colors from "@constants/colors.js";

const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    {...props}
  >
    <Path
      fill={colors.lightPurple}
      d="m21.707 20.294-4.539-4.54A8.453 8.453 0 0 0 19 10.502c0-4.687-3.813-8.5-8.5-8.5-4.687 0-8.5 3.813-8.5 8.5 0 4.687 3.813 8.5 8.5 8.5a8.446 8.446 0 0 0 5.254-1.832l4.539 4.539a.997.997 0 0 0 1.414 0 .999.999 0 0 0 0-1.414ZM4 10.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5a6.508 6.508 0 0 1-6.5-6.5Z"
    />
  </Svg>
)
export default SvgComponent
