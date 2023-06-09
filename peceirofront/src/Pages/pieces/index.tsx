import React from 'react'

import { connect } from 'react-redux'
import { stateType } from '../../store/types/state.type'
import ContainerComponent from '../../Components/container.component'
import PiecesHeroComponent from './components/hero.component'


const PiecesPage = () => {

    return <>
        <PiecesHeroComponent played={false} />
        <ContainerComponent align="center">
            <h1>oi</h1>
        </ContainerComponent>
    </>
}

const MapStateToProps = (state: stateType) => ({
    Account: state.account,
    pieces_atualization: state.pieces_atualization
})

export default connect(MapStateToProps)(PiecesPage)