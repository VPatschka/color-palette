import React, { useState } from "react";
import "./App.css";
import { Palette } from "./components/Palette";
import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";

function App() {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [primaryColor, setPrimaryColor] = useState("#90caf9");

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: primaryColor,
        light: primaryColor,
        dark: primaryColor,
        contrastText: primaryColor,
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{ background: theme.palette.background.default }}
      >
        <Palette
          onSelectedPrimaryColor={(color) => {
            setMode(color.isLight ? "light" : "dark");
            setPrimaryColor(color.value);
          }}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
