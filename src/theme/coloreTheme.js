import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const coloreTheme = createTheme({
    palette: {
        primary: {
            main: '#ff1744 ' // Rojo
        },
        secondary: {
            main: '#1e88e5' // Azul
        },
        error: {
            main: red.A400 // rojo
        }
    }
}) 