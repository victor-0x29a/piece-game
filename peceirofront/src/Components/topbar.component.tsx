import React from 'react'

import logo from '../assets/images/logo.png'
import { Nav } from '../style/components'

const TopBarComponent = () => {

    return (
        <Nav>
            <span>
                <img src={logo} alt="logo" />
                <h2>PeçaGora</h2>
            </span>
        </Nav>
    )
}

export default TopBarComponent