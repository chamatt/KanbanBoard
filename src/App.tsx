import React, { useState } from "react";
import { ThemeProvider, theme, Box } from "@chakra-ui/core";
import { Flex, CSSReset, ColorModeProvider } from "@chakra-ui/core";
import Navbar from "components/Navbar";
import Kaban from "pages/Kaban";

import { store, persistor } from "models";
import { StoreProvider } from "easy-peasy";
import { PersistGate } from "redux-persist/integration/react";

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <ColorModeProvider>
            <CSSReset />
            <Kaban />
          </ColorModeProvider>
        </ThemeProvider>
      </PersistGate>
    </StoreProvider>
  );
};

export default App;
