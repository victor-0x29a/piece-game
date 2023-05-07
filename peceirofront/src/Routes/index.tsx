import React from "react";

import SideBarComponent from "../Components/sidebar.component";
import { App } from "../style/components";

import LoginPage from '../Pages/login'
import RegisterPage from "../Pages/register";
import { Route, Routes } from "react-router-dom";


const Rotas = () => {

    return (
        <>
            <SideBarComponent />

            <App>
                <Routes>
                    <Route path="/login" Component={LoginPage} />
                    <Route path="/register" Component={RegisterPage} />
                </Routes>
            </App>
        </ >
    )
}

export default Rotas