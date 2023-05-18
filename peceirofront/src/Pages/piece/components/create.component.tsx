import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pieceCreatePropsComponent } from '../types/props.pieces'
import { useFormik } from "formik";
import * as yup from "yup";
import vUseAlert from '../../../customHooks/vUseAlert';
import vUseFetch from '../../../customHooks/vUseFetch';
import { connect } from 'react-redux';
import { stateType } from '../../../store/types/state.type';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery'

const PieceCreateComponent = ({ Open, setOpen, Categories, Account, setLoading, Atualization }: pieceCreatePropsComponent) => {
    const [name, setName] = React.useState("")
    const [category, setCategory] = React.useState(0)
    const mobile = useMediaQuery("(max-width: 612px)")

    const Formik = useFormik({
        initialValues: {
            product: name,
        },
        validationSchema: yup.object({
            product: yup.string().min(4, "Mínimo de 4 caracteres.").max(64, "Máximo de 64 caracteres.").required("O nome do produto é obrigatório.")
        }),
        onSubmit: async (values, Formulario) => {
            setLoading(true)
            await vUseFetch({
                endpoint: `/pieces`,
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": Account.token
                },
                data: {
                    category: {
                        "id": Categories[category][0],
                        "name": Categories[category][1]
                    },
                    product: name
                }
            }).then(async (data) => {
                await vUseAlert('success', "Componente criado.")
                Formulario.setValues({ product: '' })
                Formulario.setTouched({ product: false })
                setOpen(false)
                setLoading(false)
                Atualization()
            }).catch(async (err) => {
                if (err.data.error) {
                    await vUseAlert('error', err.data.error)
                } else {
                    await vUseAlert('error', "Entre novamente na sua conta.")
                }
                setOpen(false)
                setLoading(false)
            })
        }
    })

    React.useEffect(() => {
        setName("Coloque um nome")
        Formik.values.product = "Coloque um nome"
    }, [])


    const handleName = (e: React.ChangeEvent<any>) => {
        setName(e.target.value)
        Formik.handleChange(e)
    }

    const handleClose = async () => {
        setName("Coloque um nome")
        Formik.values.product = "Coloque um nome"
        setOpen(false)
        setLoading(false)
    }

    return <Dialog open={Open} sx={{
        zIndex: 900
    }} >
        <DialogTitle>{name}</DialogTitle>
        <Box component={"form"} onSubmit={Formik.handleSubmit} sx={{
            width: "500px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <TextField
                sx={{
                    marginTop: "1rem",
                    width: "80%"
                }}
                label="Nome do produto"
                type='text'
                color="primary"
                name="product"
                value={name}
                onBlur={Formik.handleBlur}
                onChange={handleName}
                error={Formik.touched.product && Formik.errors.product ? true : false}
                helperText={Formik.touched.product && Formik.errors.product ? Formik.errors.product.toString() : ""}
            />
            <TextField
                sx={{
                    marginTop: "0.8rem",
                    marginBottom: "0.8rem",
                    width: "80%"
                }}
                id="outlined-select-category"
                select
                label="Categoria"
                defaultValue={0}
                helperText="Selecione a categoria"
                onChange={(e) => setCategory(Number(e.target.value))}
            >
                {Categories.map((category, index) => (
                    <MenuItem key={index} value={index}>
                        {category[1]}
                    </MenuItem>
                ))}
            </TextField>

            <Box component={"section"} sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                paddingBottom: "1rem"
            }}>
                <Button variant="contained" color="primary" type="submit" sx={{
                    color: "white",
                    backgroundColor: "#6cbdb5",
                    '&:hover': {
                        backgroundColor: "#00b5b9",
                    },
                    fontSize: !mobile ? "1rem" : "1.15rem"
                }}>
                    Criar
                </Button>
                <Button variant="contained" color="primary" type="reset" onClick={() => handleClose()} sx={{
                    color: "white",
                    backgroundColor: "#bd6c6c",
                    '&:hover': {
                        backgroundColor: "#b90000",
                    },
                    fontSize: !mobile ? "1rem" : "1.15rem"
                }}>
                    Voltar
                </Button>
            </Box>
        </Box>
    </Dialog>
}

const MapStateToProps = (state: stateType) => ({
    Account: state.account
})

const MapActionToProps = (dispatch: any) => ({
    Atualization: () => {
        dispatch({ type: "att_pieces" })
    }
})

export default connect(MapStateToProps, MapActionToProps)(React.memo(PieceCreateComponent))