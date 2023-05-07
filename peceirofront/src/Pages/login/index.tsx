import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";
import LoginFormComponent from './components/form.component'
import { Box } from '@material-ui/core'


const LoginPage = () => {
    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email("E-mail inválido.").required("O email é obrigatório."),
            password: yup.string().min(8).max(48).required("A senha é obrigatória.")
        }),
        onSubmit: (values) => {
            alert(values)
        }
    })
    return <Box component={"div"} style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    }}>
        <Box component={"section"} style={{
            width: "400px",
            minWidth: "400px"
        }}>
            <LoginFormComponent formik={Formik} />
        </Box>
    </Box>
}

export default LoginPage