import React from 'react'

import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import HandymanIcon from '@mui/icons-material/Handyman';
const PieceHeroComponent = () => {

    const mobile = useMediaQuery("(max-width: 600px)")
    return <Box style={{
        width: "100%",
        height: "auto",
        textAlign: "center",
        margin: "0",
        marginBottom: "2.75rem"
    }}>
        <h2 style={{
            fontSize: !mobile ? "2rem" : "1.4rem",
            fontWeight: "600"
        }}><HandymanIcon /> Gerenciar componentes!</h2>
    </Box>
}

export default PieceHeroComponent