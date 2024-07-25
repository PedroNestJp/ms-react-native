import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      fill="#E22"
      d="M13 21a1 1 0 0 1-1 1H8c-2.757 0-5-2.243-5-5V7c0-2.757 2.243-5 5-5h4a1 1 0 1 1 0 2H8C6.346 4 5 5.346 5 7v10c0 1.654 1.346 3 3 3h4a1 1 0 0 1 1 1Zm7.707-9.707-4-4a.999.999 0 1 0-1.414 1.414L17.586 11H10a1 1 0 1 0 0 2h7.586l-2.293 2.293a.999.999 0 1 0 1.414 1.414l4-4a.999.999 0 0 0 0-1.414Z"
    />
  </Svg>
)
export default SvgComponent
