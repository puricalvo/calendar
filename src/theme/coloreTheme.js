import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

export const coloreTheme = createTheme({
    palette: {
        primary: {
            main: '#ff1744 ' // Rojo
        },
        secondary: {
            main: '#aeb6bf' // Azul
        },
        error: {
            main: red.A400 // rojo
        }
    }
}) 