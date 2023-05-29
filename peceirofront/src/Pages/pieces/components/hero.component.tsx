import React from 'react'

import Box from '@mui/material/Box'
import { pieceHeroProps } from '../types/props.pieces'
import useMediaQuery from '@mui/material/useMediaQuery'

const PiecesHeroComponent = ({ played }: pieceHeroProps) => {
    const mobile = useMediaQuery("(max-width: 600px)")

    return <Box component="div" style={{
        width: "100%",
        height: "auto",
        textAlign: "left",
        margin: "0",
        marginTop: "2.75rem",
        marginBottom: "2.75rem",
        marginLeft: "2.75rem"
    }}>
        <h2 style={{
            fontSize: !mobile ? "2rem" : "1.4rem",
            fontWeight: "600",
            fontFamily: "arial"
        }}> {played ? "Aguarde o próximo jogo!" : "Aposte os componentes"}</h2>
    </Box>
}

export default PiecesHeroComponent