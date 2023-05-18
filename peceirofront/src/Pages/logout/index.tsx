import React from 'react'

import { connect } from 'react-redux'
import { thisProps } from './types/props.logout'
import vUseAlert from '../../customHooks/vUseAlert'

const MapActionToProps = (dispatch: any) => ({
    Reset: () => {
        dispatch({ type: "logOut" })
    }
})

const LogoutPage = ({ Reset }: thisProps) => {
    React.useEffect(() => {
        async function go() {
            await vUseAlert("success", "Te vejo mais tarde!")
        }
        go()
        Reset()
    }, [Reset])
    return <></>
}

export default connect(undefined, MapActionToProps)(LogoutPage)