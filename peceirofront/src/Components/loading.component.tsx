import React from 'react'

import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress';
import useMediaQuery from '@mui/material/useMediaQuery';

type thisProps = {
    state: boolean
}

const LoadingComponent = ({ state }: thisProps) => {
    const mobile = useMediaQuery("(max-width: 612px)")
    return state ? <Box style={{
        top: "0",
        left: "0",
        zIndex: "999",
        backdropFilter: "blur(25px)",
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(25, 52, 65, 0.2)",
        width: "100vw",
        height: "100vh"
    }} component={"div"}>
        <CircularProgress color="primary" size={mobile ? "7rem" : "5rem"} />
    </Box> : <></>
}

export default LoadingComponent