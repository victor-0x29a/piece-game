import React from 'react'

import { propsLogin } from '../types/props.login'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormLogin } from '../../../style/components';
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'


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
            value={formik.values["email"]}
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
            value={formik.values["password"]}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.password && formik.errors.password ? true : false}
            helperText={formik.touched.password && formik.errors.password ? formik.errors.password.toString() : ""}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
        />

        <Button variant="contained" color="primary" type="submit" sx={{
            color: "white",
            backgroundColor: "#6cbdb5",
            '&:hover': {
                backgroundColor: "#00b5b9",
            },
        }}>
            Entrar
        </Button>


    </FormLogin>
}

export default LoginFormComponent