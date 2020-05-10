import React, { useState } from "react";
import { ThemeProvider, theme, Box } from "@chakra-ui/core";
import { Flex, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import Navbar from "components/Navbar";
import Kaban from "pages/Kaban";

import { store } from "models";
import { StoreProvider } from "easy-peasy";

const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />

          <Kaban />
        </ColorModeProvider>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
