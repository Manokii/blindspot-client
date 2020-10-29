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
                fontFamily: "Neuterous",
                textTransform: "uppercase",
            },
            h2: {
                fontFamily: "Neuterous",
                textTransform: "uppercase",
            },
            h3: {
                fontFamily: "Neuterous",
                textTransform: "uppercase",
            },
            h4: {
                fontFamily: "Neuterous",
                textTransform: "uppercase",
            },
            h5: {
                fontFamily: "Neuterous",
                textTransform: "uppercase",
            },
            h6: {
                fontFamily: "Neuterous",
                textTransform: "uppercase",
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
                dark: "#071526",
                main: "#0b1f37",
                light: "#00b9ab",
            },
            secondary: {
                main: "#ff4050",
            },
            background: {
                default: "#071526",
                paper: "#071526",
            },
        },
    })
);

const Theme = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
