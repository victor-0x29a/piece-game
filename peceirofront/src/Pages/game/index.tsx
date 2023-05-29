import React from 'react'

import GameHeroComponent from './components/hero.component'
import GameTableComponent from './components/table.component'
import vUseFetch from '../../customHooks/vUseFetch'
import { gamePropsMain } from './types/props.pieces'
import { connect } from 'react-redux'
import { stateType } from '../../store/types/state.type'
import LoadingComponent from '../../Components/loading.component'
import vUseAlert from '../../customHooks/vUseAlert'
import ContainerComponent from '../../Components/container.component'
import { CreatePieceDto } from '../../dto/piece.dto'
import { GameDto } from '../../dto/game.dto'

const GamePage = ({ Account, pieces_atualization }: gamePropsMain) => {
    const [game, setGames] = React.useState<GameDto[]>([])
    const [loading, setLoading] = React.useState(true)

    const getGames = async () => {
        return await vUseFetch({
            endpoint: "/main-game", method: "GET", data: null, headers: {
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
            let data: GameDto[] = await getGames()
            setGames(data)
            setLoading(false)
        }
        start()
    }, [])

    React.useEffect(() => {
        setLoading(true)
        async function start() {
            let data: GameDto[] = await getGames()
            setGames(data)
            setLoading(false)
        }
        start()
    }, [pieces_atualization])
    return <>
        <GameHeroComponent />
        <ContainerComponent align='center'>
            <GameTableComponent games={game} setLoading={setLoading} />
        </ContainerComponent>
        <LoadingComponent state={loading} />
    </>
}

const MapStateToProps = (state: stateType) => ({
    Account: state.account,
    pieces_atualization: state.pieces_atualization
})

export default connect(MapStateToProps)(GamePage)