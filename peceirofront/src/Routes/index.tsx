import React from "react";

import SideBarComponent from "../Components/sidebar.component";
import TopBarComponent from "../Components/topbar.component";

import LoginPage from '../Pages/login'
import { Route, Routes } from "react-router-dom";


const Rotas = () => {

    return (
        <>

            <TopBarComponent />
            <SideBarComponent />

            <div className="ml-64 mt-20 apps">
                <Routes>
                    <Route path="/login" Component={LoginPage} />
                </Routes>
            </div>
        </ >
    )
}

export default Rotas