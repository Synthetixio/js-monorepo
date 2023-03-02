import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      body: {
        backgroundColor: "#161a25",
      },
    },
    fonts: {
      mono: "Roboto Mono, monospace",
    },
  },
});

export default theme;
