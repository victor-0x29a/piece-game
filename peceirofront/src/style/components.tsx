import styled from 'styled-components'

const bgMenus = "#6cbdb5"

export const SideBar = styled.aside`
position: absolute;
left: 0; 
top: 0;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: ${bgMenus};
z-index: 1;
box-shadow: 0 0 1em black;
@media screen and (max-width: 612px){
    height: 4rem;
    width: 100vw;
    position: "relative"
}
`

export const App = styled.div`
margin-left: 220px;
height: 100vh;
overflow-x: hidden;
overflow-y: scroll;
@media screen and (max-width: 612px){
    margin-left: 0px;
}
`

export const FormLogin = styled.form`
display: flex;
flex-direction: column;
width: 100%;
`