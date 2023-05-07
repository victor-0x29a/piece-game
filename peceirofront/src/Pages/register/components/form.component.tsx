import React from 'react'

import { propsRegister } from '../types/props.register'
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

const RegisterFormComponent = ({ formik }: propsRegister) => {
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
            }}>Venha, com a gente!</p>
        </Box>

        <TextField
            label="Seu nome"
            type='username'
            color="primary"
            name="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name ? formik.errors.name.toString() : ""}
            style={{ marginTop: "0.8rem", marginBottom: "0rem" }}
        />

        <TextField
            label="Seu email"
            type='email'
            color="primary"
            name="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email.toString() : ""}
            style={{ marginTop: "0.8rem", marginBottom: "0rem" }}
        />

        <TextField
            label="Seu telefone"
            type='phone'
            color="primary"
            name="phone"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.phone && formik.errors.phone ? true : false}
            helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone.toString() : ""}
            style={{ marginTop: "0.8rem", marginBottom: "0rem" }}
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
            style={{ marginTop: "0.8rem", marginBottom: "0rem" }}
        />

        <TextField
            label="Sua senha novamente"
            type='password'
            color="primary"
            name="passwordconfirm"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.passwordconfirm && formik.errors.passwordconfirm ? true : false}
            helperText={formik.touched.passwordconfirm && formik.errors.passwordconfirm ? formik.errors.passwordconfirm.toString() : ""}
            style={{ marginTop: "0.8rem", marginBottom: "2rem" }}
        />

        <ColorButton variant="contained" color="primary" type="submit">
            Enviar
        </ColorButton>


    </FormLogin>
}

export default RegisterFormComponent