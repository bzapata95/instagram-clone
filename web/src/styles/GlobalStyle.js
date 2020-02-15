import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    html, body, #root {
        height: 100%
    }

    body{
        background-color: #f6f6f6;
        -webkit-font-smoothing: antialiased;
    }
    body, input, button {
        font-family: Arial, sans-serif
    }

    h1,h2,h3,h4,h5,p {
        margin:0;
    }

    input{
        &::placeholder {
            color: rgba(0,0,0,0.3);
            font:400 13px Arial;
        }
    }
`;
