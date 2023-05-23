import React from 'react'

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormLogin } from '../../../style/components';
import { Box } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { propsForm } from '../types/form.component'

const ProfileFormComponent = ({ formik, handleEmail, handleName, handlePhone }: propsForm) => {
    const mobile = useMediaQuery("(max-width: 600px)")
    return <FormLogin onSubmit={formik.handleSubmit}>

        <TextField
            label="Seu email"
            type='email'
            color="primary"
            name="email"
            value={formik.values["email"]}
            onBlur={formik.handleBlur}
            onChange={handleEmail}
            error={formik.touched.email && formik.errors.email ? true : false}
            helperText={formik.touched.email && formik.errors.email ? formik.errors.email.toString() : ""}
        />

        <TextField
            label="Seu telefone"
            type='phone'
            color="primary"
            name="phone"
            value={formik.values["phone"]}
            onBlur={formik.handleBlur}
            onChange={handlePhone}
            error={formik.touched.phone && formik.errors.phone ? true : false}
            helperText={formik.touched.phone && formik.errors.phone ? formik.errors.phone.toString() : ""}
            style={{ marginTop: "2rem" }}
        />

        <TextField
            label="Seu nome"
            type='username'
            color="primary"
            name="name"
            value={formik.values["name"]}
            onBlur={formik.handleBlur}
            onChange={handleName}
            error={formik.touched.name && formik.errors.name ? true : false}
            helperText={formik.touched.name && formik.errors.name ? formik.errors.name.toString() : ""}
            style={{ marginTop: "2rem", marginBottom: "2rem" }}
        />

        <Button variant="contained" color="primary" type="submit" sx={{
            color: "white",
            backgroundColor: "#6cbdb5",
            '&:hover': {
                backgroundColor: "#00b5b9",
            },
        }}>
            Salvar
        </Button>


    </FormLogin>
}

export default ProfileFormComponent