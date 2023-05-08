import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  --toastify-color-success: #06f5b9;
  --toastify-color-dark: #a8e6ce;
  --toastify-color-warning: #f3a76d;
}
* {
    margin: 0;
    padding: 0;
    z-index: 1;
    user-select: none;
}
.Toastify__toast {
  border-radius: 12px;
}

body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: white;
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