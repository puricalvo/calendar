import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { coloreTheme } from "./";


export const AppTheme = ({ children }) => {
  return (
    <ThemeProvider theme={ coloreTheme }>
        <CssBaseline />
        { children }
    </ThemeProvider>
  )
}

