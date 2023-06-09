import React from "react";

import SideBarComponent from "../Components/sidebar.component";
import { App } from "../style/components";

import LoginPage from '../Pages/login'
import RegisterPage from "../Pages/register";
import PiecePage from '../Pages/piece'
import { Route, Routes } from "react-router-dom";
import BlockRoute from "./block";
import ProtectRoute from "./protect";
import LogoutPage from "../Pages/logout";
import MyAccountPage from "../Pages/myaccount";
import PiecesPage from "../Pages/pieces";
import GamePage from '../Pages/game'

const Rotas = () => {

    return (
        <>
            <SideBarComponent />

            <App>
                <Routes>
                    <Route path="/login" element={<BlockRoute><LoginPage /></BlockRoute>} />
                    <Route path="/register" element={<BlockRoute><RegisterPage /></BlockRoute>} />
                    <Route path="/pieces" element={<ProtectRoute><PiecesPage /></ProtectRoute>} />
                    <Route path="/admin/piece" element={<ProtectRoute><PiecePage /></ProtectRoute>} />
                    <Route path="/admin/game" element={<ProtectRoute><GamePage /></ProtectRoute>} />
                    <Route path="/logout" element={<ProtectRoute><LogoutPage /></ProtectRoute>} />
                    <Route path="/profile" element={<ProtectRoute><MyAccountPage /></ProtectRoute>} />
                </Routes>
            </App>
        </ >
    )
}

export default Rotas