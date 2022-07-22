import { extendTheme } from "@chakra-ui/react";

const themeConfig = {
  inittialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({themeConfig});

export default theme;