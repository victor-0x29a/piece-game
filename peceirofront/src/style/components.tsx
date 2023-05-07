import styled from 'styled-components'

const bgMenus = "#343838"

export const Nav = styled.nav`
position: absolute;
top: 0;
left: 0;
right: 0;
background-color: ${bgMenus};
z-index: 2;
span {
    width: 15rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: default;
    user-select: none;
    img {
        width: 70px;
        height: 70px;
    }
}
`

export const SideBar = styled.aside`
width: 220px;
position: absolute;
left: 0; 
top: 0;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;
background-color: ${bgMenus};
z-index: 1;
`