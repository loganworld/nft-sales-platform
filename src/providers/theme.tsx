import { styled, ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: { main: "#fff", light: "#c76e36", dark: "#be5c22" },
        secondary: { main: "#55322c", light: "#ccad45", dark: "#1e0500" },
        error: { main: "#da2607" },
        warning: { main: "#e9cf1c" },
        text: { primary: "#ffffff", secondary: "#e9e8e8" },
        background: { paper: "#c76e36" },
    },
    typography: {
        allVariants: {
            color: "#ffffff",
        },
    }
});

export default function Provider({ children }: any) {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
