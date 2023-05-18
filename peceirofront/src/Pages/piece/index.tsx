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
import { CreatePieceDto } from '../../dto/piece.dto'

const PiecePage = ({ Account, pieces_atualization }: piecePropsMain) => {
    const [peca, setPecas] = React.useState<CreatePieceDto[]>([])
    const [categories, setCategories] = React.useState([])
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
    const getPreset = async () => {
        return await vUseFetch({
            endpoint: "/pieces/preset", method: "GET", data: null, headers: {
                authorization: Account.token
            }
        }).then((data) => {
            return data.data["data"]["categories"]
        }).catch(async (err) => {
            await vUseAlert('error', 'O preset não foi carregado.')
            return []
        })
    }

    React.useEffect(() => {
        async function start() {
            let data: CreatePieceDto[] = await getPieces()
            let preset = await getPreset()
            setPecas(data)
            setCategories(preset)
            setLoading(false)
        }
        start()
    }, [])

    React.useEffect(() => {
        setLoading(true)
        async function start() {
            let data: CreatePieceDto[] = await getPieces()
            setPecas(data)
            setLoading(false)
        }
        start()
    }, [pieces_atualization])
    return <>
        <PieceHeroComponent />
        <ContainerComponent align='center'>
            <PieceTableComponent pieces={peca} categories={categories} setLoading={setLoading} />
        </ContainerComponent>
        <LoadingComponent state={loading} />
    </>
}

const MapStateToProps = (state: stateType) => ({
    Account: state.account,
    pieces_atualization: state.pieces_atualization
})

export default connect(MapStateToProps)(PiecePage)