// Contains theme info (dark mode switch)
import { createGlobalStyle } from "styled-components";
export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#000",
  fontColor: "#fff",
};

export const GlobalStyles = createGlobalStyle`

    body,ul,li{
        background-color: ${(props) => props.theme.body};
        color: ${(props) => props.theme.fontColor};
    }

    h1,h3,h2,h4,span,.makeStyles-name-4,.PrivateNotchedOutline-legendLabelled-15{
        color: ${(props) => props.theme.fontColor};
    }

    *{
        color: ${(props) => props.theme.fontColor};
    }

    .input,input{
        color:${(props) => !props.theme.fontColor};
        background-color: ${(props) => props.theme.body};
        border:1px solid grey;
    }

    textarea{
        color:${(props) => props.theme.fontColor} !important;
        background-color: ${(props) => props.theme.body} !important;
        border:1px solid grey !important;
    }

    .MuiSvgIcon-root{
        fill:${(props) => props.theme.fontColor};
    }

    .MuiBox-root-12{
        border:1px solid grey;
    }

    .MuiInputBase-formControl{
        background-color: ${(props) => props.theme.body};
        border:1px solid grey;
        color:${(props) => props.theme.fontColor};
    }

    .project{
        border:1px solid grey;
    }

    legend{
        background-color:pink;
    }


`;
