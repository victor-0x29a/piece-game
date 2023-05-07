import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: black;
}

.apps {
    overflow-y: scroll;
    overflow-x: hidden;
}


@media screen and (max-width: 640px){
    .apps {
        margin-left: 0;
    }
}
`


export default GlobalStyle