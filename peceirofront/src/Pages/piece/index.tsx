import React from 'react'

import PieceHeroComponent from './components/hero.component'
import PieceTableComponent from './components/table.component'
import vUseFetch from '../../customHooks/vUseFetch'
import { piecePropsMain } from './types/props.pieces'
import { connect } from 'react-redux'
import { stateType } from '../../store/types/state.type'
import LoadingComponent from '../../Components/loading.component'
import vUseAlert from '../../customHooks/vUseAlert'
import ContainerComponent from '../../Components/container.component'

const PiecePage = ({ Account }: piecePropsMain) => {
    const [peca, setPecas] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const getPieces = async () => {
        return await vUseFetch({
            endpoint: "/pieces", method: "GET", data: null, headers: {
                authorization: Account.token
            }
        }).then((data) => {
            return data.data["data"]
        }).catch(async (err) => {
            await vUseAlert('error', 'Os dados não foram carregados.')
            return []
        })
    }

    React.useEffect(() => {
        async function start() {
            let data = await getPieces()
            setPecas(data)
            setLoading(false)
        }
        start()
    }, [])
    return <>
        <PieceHeroComponent />
        <ContainerComponent align='center'>
            <PieceTableComponent pieces={peca} />
        </ContainerComponent>
        <LoadingComponent state={loading} />
    </>
}

const MapStateToProps = (state: stateType) => ({
    Account: state.account
})

export default connect(MapStateToProps)(PiecePage)