import { extendTheme } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools'
import type { StyleFunctionProps } from '@chakra-ui/styled-system'

const theme = extendTheme({
  config:{
    initialColorMode: "system",
    useSystemColorMode: true,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        "--textColor1": mode("#111!important", "#eee!important")(props),
        "--textColor2": mode("#333!important", "#ccc!important")(props),
        "--textColor3": mode("#555!important", "#aaa!important")(props),
        "--textColor4": mode("#777!important", "#999!important")(props),
        "--borderColor": mode("#e8e8e8!important", "#555!important")(props),
        "--bgColor1": mode("#fff!important", "#111519!important")(props),
        "--bgColor2": mode("#eee!important", "#262e35!important")(props),
        bg: "var(--bgColor1)"
      },
    })
  }
})

export default theme