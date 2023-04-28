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
  components: {
    Button: {
      variants: {
        solid: (props) => ({
          bg:
            props.colorScheme == "cyan" || props.colorScheme == "gray"
              ? `${props.colorScheme}.600`
              : `${props.colorScheme}.500`,
          color: "white",
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
          _active: {
            bg: `${props.colorScheme}.700`,
          },
          _focus: {
            boxShadow: `0 0 0 3px rgba(0, 0, 0, 0.2), 0 0 0 4px ${
              props.theme.colors[props.colorScheme][300]
            }`,
          },
        }),
      },
    },
  },
});

export default theme;
