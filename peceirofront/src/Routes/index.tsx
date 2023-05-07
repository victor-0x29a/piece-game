import React from "react";

import SideBarComponent from "../Components/sidebar.component";
import TopBarComponent from "../Components/topbar.component";
import { App } from "../style/components";

import LoginPage from '../Pages/login'
import { Route, Routes } from "react-router-dom";


const Rotas = () => {

    return (
        <>
            <SideBarComponent />

            <App>
                <Routes>
                    <Route path="/login" Component={LoginPage} />
                </Routes>
            </App>
        </ >
    )
}

export default Rotas