import React from 'react'

import propsDefault from './types/route.types'
import { Navigate } from "react-router-dom";

import { connect } from 'react-redux'
import { stateType } from '../store/types/state.type'
const MapStateToProps = (state: stateType) => ({
    isLogged: state.account.logged
})

const ProtectRoute = ({ children, isLogged }: propsDefault) => {
    return isLogged ? children : <Navigate to="/login" replace={true} />

}

export default connect(MapStateToProps)(ProtectRoute)