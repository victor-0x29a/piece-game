import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from '@material-ui/core'
import RegisterFormComponent from './components/form.component';

const RegisterPage = () => {
    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email("E-mail inválido.").required("O email é obrigatório.").min(12, "O e-mail deve ter no mínimo 12 caracteres.").max(128, "O e-mail deve ter no máximo 128 caracteres."),
            password: yup.string().min(8, "A senha deve ter no mínimo 8 caracteres.").max(48, "Máximo de 48 caracteres.").required("A senha é obrigatória."),
            passwordconfirm: yup.string().min(8, "A senha deve ter 8 caracteres.").max(48, "Máximo de 48 caracteres.").required("A confirmação de senha é obrigatória."),
            phone: yup.number().min(20, "Número inválido.").max(120, "Número inválido.").required("O telefone é obrigatório."),
            name: yup.string().min(12, "Nome inválido.").max(64, "Nome inválido.").required("O nome é obrigatório.")
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
            <RegisterFormComponent formik={Formik} />
        </Box>
    </Box>
}

export default RegisterPage