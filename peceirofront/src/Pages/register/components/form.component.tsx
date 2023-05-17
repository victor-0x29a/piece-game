import React from 'react'

import { propsRegister } from '../types/props.register'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormLogin } from '../../../style/components';
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'


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
            value={formik.values["name"]}
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
            value={formik.values["email"]}
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
            value={formik.values["phone"] === 0 ? '' : formik.values["phone"]}
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
            value={formik.values["password"]}
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
            value={formik.values["passwordconfirm"]}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={formik.touched.passwordconfirm && formik.errors.passwordconfirm ? true : false}
            helperText={formik.touched.passwordconfirm && formik.errors.passwordconfirm ? formik.errors.passwordconfirm.toString() : ""}
            style={{ marginTop: "0.8rem", marginBottom: "2rem" }}
        />

        <Button variant="contained" color="primary" type="submit" sx={{
            color: "white",
            backgroundColor: "#6cbdb5",
            '&:hover': {
                backgroundColor: "#00b5b9",
            },
        }}>
            Enviar
        </Button>


    </FormLogin>
}

export default RegisterFormComponent