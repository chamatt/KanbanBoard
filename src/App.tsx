import React from "react";
import { ThemeProvider } from "@chakra-ui/core";
import { CSSReset, ColorModeProvider } from "@chakra-ui/core";
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
