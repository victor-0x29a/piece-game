import React from 'react'

import { useFormik } from "formik";
import * as yup from "yup";
import LoginFormComponent from './components/form.component'
import { Box } from '@mui/material'
import vUseAlert from '../../customHooks/vUseAlert';
import vUseFetch from '../../customHooks/vUseFetch';
import { LoginDTO } from '../../dto/user.dto';
import { connect } from 'react-redux';
import { account, stateType } from '../../store/types/state.type';
import { propsIndex } from './types/props.login'
import vUseDecoded from '../../customHooks/vUseDecoded';

const MapStateToProps = (state: stateType) => ({
    account: state.account
})

const MapActionsToProps = (dispatch: any) => ({
    setAccount: (values: account) => {
        dispatch({ type: "set_user", payload: values })
    }
})



const LoginPage = ({ account, setAccount }: propsIndex) => {
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
                endpoint: "/autenticacao/entrar",
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
                Formulario.setValues({ email: '', password: '' })
                Formulario.setTouched({ email: false, password: false })
                const decoded = vUseDecoded(data.data.data["token"])
                setAccount({
                    logged: true,
                    token: data.data.data["token"],
                    expiresIn: data.data.data["expiresIn"],
                    authLevel: decoded.authLevel,
                    info: {
                        name: data.data.data["name"],
                        email: data.data.data["email"],
                        telefone: Number(data.data.data["phone"])
                    }
                })
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

export default connect(MapStateToProps, MapActionsToProps)(LoginPage)