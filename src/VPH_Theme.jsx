import React from "react";
import {
    createMuiTheme,
    responsiveFontSizes,
    ThemeProvider,
} from "@material-ui/core/styles";

// const AntonFont = { fontFamily: "Anton", letterSpacing: "0.1rem" };

const theme = responsiveFontSizes(
    createMuiTheme({
        typography: {
            h1: {
                fontFamily: "Tungsten",
                textTransform: "uppercase",
                letterSpacing: 1,
            },
            h2: {
                fontFamily: "Tungsten",
                textTransform: "uppercase",
                letterSpacing: 1,
            },
            h3: {
                fontFamily: "Tungsten",
                textTransform: "uppercase",
                letterSpacing: 1,
            },
            h4: {
                fontFamily: "Tungsten",
                textTransform: "uppercase",
                letterSpacing: 1,
            },
            h5: {
                fontFamily: "Tungsten",
                textTransform: "uppercase",
                letterSpacing: 1,
            },
            h6: {
                fontFamily: "Tungsten",
                textTransform: "uppercase",
                letterSpacing: 0.5,
            },
        },
        palette: {
            text: {
                primary: "#ffffff",
                secondary: "#202022",
                default: "#ffffff",
            },
            type: "dark",
            primary: {
                main: "#0d0a20",
            },
            secondary: {
                main: "#ff4656",
            },
            background: {
                default: "#202022",
                paper: "#202022",
            },
        },
    })
);

const Theme = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
