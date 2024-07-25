import * as React from "react";
import Svg, { Path } from "react-native-svg";
import colors from "@constants/colors.js";
const SvgComponent = (props) =>
  props.stroked ? (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={27}
      fill="none"
      {...props}
    >
      <Path
        fill={props.borderColor || colors.primaryPurple}
        d="m22.142 8.074-4.966-4.966a1.955 1.955 0 0 0-1.392-.577h-5.159a5.35 5.35 0 0 0-5.344 5.344v11.25a5.35 5.35 0 0 0 5.344 5.344h6.75a5.35 5.35 0 0 0 5.344-5.344v-9.66c0-.525-.205-1.02-.577-1.39Zm-5.048-2.663 2.744 2.744h-.776a1.97 1.97 0 0 1-1.968-1.969v-.775Zm.281 17.37h-6.75a3.66 3.66 0 0 1-3.656-3.656V7.875a3.66 3.66 0 0 1 3.656-3.656h4.781v1.968a3.66 3.66 0 0 0 3.656 3.657h1.97v9.281a3.66 3.66 0 0 1-3.657 3.656Z"
      />
      
    </Svg>) :
    (<Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28}
      height={27}
      fill="none"
      {...props}
    >
      <Path
        fill={props.color || colors.primaryPurple}
        d="M17.094 6.188V3.42l4.736 4.736h-2.767a1.978 1.978 0 0 1-1.97-1.969Zm1.968 3.656a3.663 3.663 0 0 1-3.656-3.656V2.813h-4.781a5.07 5.07 0 0 0-5.063 5.062v11.25a5.07 5.07 0 0 0 5.063 5.063h6.75a5.07 5.07 0 0 0 5.063-5.063V9.844h-3.375Z"
      />
    </Svg>)

export default SvgComponent
