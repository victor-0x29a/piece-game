import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";
import LoginFormComponent from './components/form.component'
import { Box } from '@material-ui/core'
import vUseAlert from '../../customHooks/vUseAlert';
import vUseFetch from '../../customHooks/vUseFetch';
import { LoginDTO } from '../../dto/user.dto';


const LoginPage = () => {
    const Formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: yup.object({
            email: yup.string().email("E-mail inválido.").required("O email é obrigatório."),
            password: yup.string().min(8, "A senha deve ter 8 caracteres.").max(48, "Máximo de 48 caracteres.").required("A senha é obrigatória.")
        }),
        onSubmit: async (values: LoginDTO, Formulario) => {
            await vUseFetch({
                endpoint: "/autenticacao/cadastro",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: {
                    "email": values.email,
                    "password": values.password
                }
            }).then(async (data) => {
                await vUseAlert('success', data.data.message)
                Formulario.setValues({ email: '', password: ''})
                Formulario.setTouched({ email: false, password: false})
            }).catch(async (err) => {
                await vUseAlert('error', err.data.error)
            })
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