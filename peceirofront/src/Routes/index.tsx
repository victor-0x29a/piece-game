import React from "react";

import SideBarComponent from "../Components/sidebar.component";
import { App } from "../style/components";

import LoginPage from '../Pages/login'
import RegisterPage from "../Pages/register";
import PiecePage from '../Pages/piece'
import { Route, Routes } from "react-router-dom";
import BlockRoute from "./block";
import ProtectRoute from "./protect";


const Rotas = () => {

    return (
        <>
            <SideBarComponent />

            <App>
                <Routes>
                    <Route path="/login" element={<BlockRoute><LoginPage /></BlockRoute>} />
                    <Route path="/register" element={<BlockRoute><RegisterPage /></BlockRoute>} />
                    <Route path="/admin/piece" element={<ProtectRoute><PiecePage /></ProtectRoute>} />
                </Routes>
            </App>
        </ >
    )
}

export default Rotas