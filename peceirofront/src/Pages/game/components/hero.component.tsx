import React from 'react'

import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import HandymanIcon from '@mui/icons-material/Handyman';
const GameHeroComponent = () => {

    const mobile = useMediaQuery("(max-width: 600px)")
    return <Box style={{
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
        }}><HandymanIcon /> Todos os jogos</h2>
    </Box>
}

export default GameHeroComponent