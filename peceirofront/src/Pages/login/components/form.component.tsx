import React from 'react'

import { propsLogin } from '../types/props.login'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormLogin } from '../../../style/components';
import { withStyles } from '@material-ui/core';
import { Box } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const ColorButton = withStyles(() => ({
    root: {
        color: "white",
        backgroundColor: "#6cbdb5",
        '&:hover': {
            backgroundColor: "#00b5b9",
        },
    },
}))(Button);

const LoginFormComponent = ({ formik }: propsLogin) => {
    const mobile = useMediaQuery("(max-width: 600px)")
    return <FormLogin onSubmit={formik.handleSubmit}>
        <Box component="div" style={{
            width: "100%",
            textAlign: "center",
        }}>
            <p style={{
                fontSize: !mobile ? "2rem" : "1.4rem",
                marginBottom: "2rem",
                fontWeight: "600"
            }}>Bem vindo, novamente!</p>
        </Box>
        <TextField
            label="Seu email"
            type='email'
            color="primary"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email.toString() : ""}
        />

        <TextField
            label="Sua senha"
            type='password'
            color="primary"
            name="password"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password ? true : false}
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password.toString() : ""}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
        />

        <ColorButton variant="contained" color="primary" type="submit">
            Entrar
        </ColorButton>


    </FormLogin>
}

export default LoginFormComponent