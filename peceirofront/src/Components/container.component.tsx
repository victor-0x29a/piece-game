import React, { ReactComponentElement } from 'react'

import Box from '@mui/material/Box'

type thisProps = {
    children: ReactComponentElement<any>
    align: "center" | "initial"
}

const ContainerComponent = ({ children, align }: thisProps) => {
    return <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: align,
        height: "auto",
    }}>
        {children}
    </Box>
}

export default ContainerComponent