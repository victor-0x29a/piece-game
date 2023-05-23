import React from 'react'

import { useFormik } from 'formik'
import * as yup from "yup";
import vUseAlert from '../../customHooks/vUseAlert'
import vUseFetch from '../../customHooks/vUseFetch'
import ProfileFormComponent from './components/form.component';
import { Box } from '@mui/material';
import { connect } from 'react-redux'
import { stateType } from '../../store/types/state.type';
import { mainProps } from './types/myaccount'
import LoadingComponent from '../../Components/loading.component';

const MapStateToProps = (state: stateType) => ({
    Account: state.account,
    Token: state.account.token
})

const MapActionToProps = (dispatch: any) => ({
    setData: (data: any) => {
        dispatch({ type: "change_account", payload: data })
    }
})

const MyAccountPage = ({ Account, Token, setData }: mainProps) => {
    const [email, setEmail] = React.useState(Account.info.email)
    const [name, setName] = React.useState(Account.info.name)
    const [phone, setPhone] = React.useState(Account.info.telefone)
    const [loading, setLoading] = React.useState(false)

    const Formik = useFormik({
        initialValues: {
            email: email,
            name: name,
            phone: phone,
        },
        validationSchema: yup.object({
            email: yup.string().email("E-mail inválido.").required("O email é obrigatório.").min(12, "O e-mail deve ter no mínimo 12 caracteres.").max(128, "O e-mail deve ter no máximo 128 caracteres."),
            phone: yup.number(),
            name: yup.string().min(12, "Nome inválido.").max(64, "Nome inválido.").required("O nome é obrigatório.")
        }),
        onSubmit: async (values, Formulario) => {
            setLoading(true)
            try {
                await vUseFetch({
                    endpoint: "/user/account/update",
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": Token
                    },
                    data: {
                        "email": values.email,
                        "phone": Number(values.phone),
                        "name": values.name
                    }
                }).then(async (data) => {
                    const body = data.data
                    //Formulario.setValues({ email: '', phone: null, name: '' })
                    //Formulario.setTouched({ email: false, phone: false, name: false })
                    await setData({ name: body.data.user["name"], email: body.data.user["email"], telefone: Number(body.data.user["phone"]) })
                    setLoading(false)
                    await vUseAlert('success', body.message)
                }).catch(async (err) => {
                    if (err.data.error) {
                        await vUseAlert('error', err.data.error)
                    }

                    setLoading(false)
                })
            } catch (e) {

                await vUseAlert('success', "Suas informações foram atualizadas.")
                setLoading(false)
            }
        }
    })

    const handleName = (e: React.ChangeEvent<any>) => {
        setName(e.target.value)
        Formik.handleChange(e)
    }
    const handleEmail = (e: React.ChangeEvent<any>) => {
        setEmail(e.target.value)
        Formik.handleChange(e)
    }
    const handlePhone = (e: React.ChangeEvent<any>) => {
        setPhone(e.target.value)
        Formik.handleChange(e)
    }

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
            <ProfileFormComponent formik={Formik} handleName={handleName} handleEmail={handleEmail} handlePhone={handlePhone} />
        </Box>
        <LoadingComponent state={loading} />
    </Box>
}


export default connect(MapStateToProps, MapActionToProps)(MyAccountPage)