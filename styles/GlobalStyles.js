import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
      --bg-color: ${(props) => props.theme.backgroundColor};
      --color: ${(props) => props.theme.textColor};
      --box-bg-color: ${(props) => props.theme.boxBgColor}
    }
    body{
        font-family: "Roboto", sans-serif;
        background-color: var(--bg-color);
        transition: 0.5s;
    }
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
    }
    a{
      color: var(--color);
      transition: 0.5s;
      text-decoration: none;
      &:hover{
        color: var(--color);
      }
    }
    .blog-btn{
      color: var(--bg-color);
      border: none;
      border: 1px solid var(--color);
      background-color: var(--color);
      transition: 0.5s;
      padding: 6px 25px;
      border-radius: 5px;
      &:hover{
        color: var(--color);
        background-color: var(--bg-color);
      }
    }
`;

export const lightTheme = {
  backgroundColor: "white",
  textColor: "#1A1818",
  boxBgColor: "#f0f0f0",
};

export const darkTheme = {
  backgroundColor: "#1A1818",
  textColor: "white",
  boxBgColor: "#3c3c3c",
};
