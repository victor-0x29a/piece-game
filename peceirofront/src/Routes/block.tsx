import React from 'react'

import propsDefault from './types/route.types'
import { Navigate } from "react-router-dom";

import { connect } from 'react-redux'
import { stateType } from '../store/types/state.type'
const MapStateToProps = (state: stateType) => ({
    isLogged: state.account.logged
})

const BlockRoute = ({ children, isLogged }: propsDefault) => {
    return !isLogged ? children : <Navigate to="/pieces" replace={true} />

}

export default connect(MapStateToProps)(BlockRoute)