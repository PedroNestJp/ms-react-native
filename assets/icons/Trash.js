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
      d="M22 6.25a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h3.559a.999.999 0 0 0 .949-.684l.316-.948A1.999 1.999 0 0 1 9.721 2.25h4.559c.862 0 1.625.55 1.897 1.367l.316.95a1 1 0 0 0 .949.683H21a1 1 0 0 1 1 1Zm-2.7 3.03-.61 9.2a3.523 3.523 0 0 1-3.5 3.27H8.81c-1.83 0-3.37-1.43-3.5-3.26L4.7 9.28c-.01-.13.04-.27.13-.37.1-.1.23-.16.37-.16h13.6c.14 0 .27.06.37.16.09.1.14.24.13.37ZM11 12.25c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1v-5Zm4 0c0-.55-.45-1-1-1s-1 .45-1 1v5c0 .55.45 1 1 1s1-.45 1-1v-5Z"
    />
  </Svg>
)
export default SvgComponent
