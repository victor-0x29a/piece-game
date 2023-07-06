import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import { dataDayJs, gameDialogPropsComponent } from '../types/props.pieces'
import { useFormik } from "formik";
import * as yup from "yup";
import vUseAlert from '../../../customHooks/vUseAlert';
import vUseFetch from '../../../customHooks/vUseFetch';
import { connect } from 'react-redux';
import { stateType } from '../../../store/types/state.type';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery'
import TextareaAutosize from '@mui/base/TextareaAutosize';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import vUseDate from '../../../customHooks/vUseDate';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { key } from '../../piece/types/props.game';
import Typography from '@mui/material/Typography'


const GameDialogComponent = ({ Open, setOpen, Account, setLoading, Atualization, Game }: gameDialogPropsComponent) => {
    const [title, setTitle] = React.useState("")
    const [description, setDescription] = React.useState('')
    const [day, setDay] = React.useState<Dayjs | null>(dayjs('2023-04-17'))
    const mobile = useMediaQuery("(max-width: 612px)")

    const Formik = useFormik({
        initialValues: {
            title: title,
            description: description,
            day: day
        },
        validationSchema: yup.object({
            title: yup.string().min(12, "Mínimo de 12 caracteres.").max(40, "Máximo de 40 caracteres.").required("O título é obrigatório."),
            description: yup.string().min(12, "Mínimo de 12 caracteres.").max(1200, "Máximo de 1200 caracteres.").required("A descrição é obrigatória."),
            day: yup.date()
        }),
        onSubmit: async (values, Formulario) => {
            setLoading(true)
            let data = dayjs(values.day).toISOString()
            await vUseFetch({
                endpoint: `/main-game/${Game.id}`,
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": Account.token
                },
                data: {
                    "title": title,
                    "description": description,
                    "day": data
                }
            }).then(async (data) => {
                await vUseAlert('success', "Jogo modificado.")
                Formulario.setValues({ title: '', description: '', day: dayjs('2023-04-17') })
                Formulario.setTouched({ title: false, description: false })
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
        setTitle(Game.title)
        Formik.values.title = Game.title
        setDescription(Game.description)
        Formik.values.description = Game.description
        setDay(vUseDate(Game.day).lib)
        Formik.values.day = vUseDate(Game.day).lib
    }, [Game])


    const handleTitle = async (e: React.ChangeEvent<any>) => {
        if (title.length >= 40) {
            setTitle(title)
            await vUseAlert('warning', 'Máximo de caracteres atingido.')
        }
        setTitle(e.target.value)
        Formik.handleChange(e)
    }

    const handleDescription = async (e: React.ChangeEvent<any>) => {
        if (description.length >= 1200) {
            setDescription(description)
            await vUseAlert('warning', 'Máximo de caracteres atingido.')
        }
        setDescription(e.target.value)
        Formik.handleChange(e)
    }
    const handleDay = (e: dataDayJs) => {
        setDay(dayjs(e["$d"]))
        Formik.values.day = dayjs(e["$d"])
    }

    const handleDelete = async () => {
        setLoading(true)
        await vUseFetch({
            endpoint: `/main-game/${Game.id}`,
            method: "DELETE",
            headers: {
                "authorization": Account.token
            },
            data: null
        }).then(async () => {
            await vUseAlert('warning', "Jogo deletado.")
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

    const getKey = (key: string): key => {
        if(key === "Ambiente") return "Ambiente"
        if (key === "Acessórios") return "Acessórios"
        if (key === "Periféricos") return "Periféricos"
        if (key === "Placa de vídeo") return "Placa de vídeo"
        if (key === "Processadores") return "Processadores"
        if (key === "Refrigeração") return "Refrigeração"
        if (key === "Tela") return "Tela"
        return "Tela";
    }
    return <Dialog open={Open} sx={{
        zIndex: 900
    }} >
        <Box component={"form"} onSubmit={Formik.handleSubmit} sx={{
            width: "500px",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <DialogTitle sx={{width: "80%"}}>{title}</DialogTitle>
            <TextField
                sx={{
                    marginTop: "1rem",
                    width: "80%"
                }}
                label="Título do sorteio"
                type='text'
                color="primary"
                name="product"
                value={title}
                onBlur={Formik.handleBlur}
                onChange={handleTitle}
                error={Formik.touched.title && Formik.errors.title ? true : false}
                helperText={Formik.touched.title && Formik.errors.title ? Formik.errors.title.toString() : ""}
            />

            <TextareaAutosize
                minRows={3}
                value={description}
                onBlur={Formik.handleBlur}
                onChange={handleDescription}
                name="description"
                placeholder='Descrição do jogo'
                style={{
                    marginTop: "1rem",
                    width: "70%",
                    padding: "22px"
                }}
            />

            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker sx={{
                    marginTop: "1rem",
                    width: "80%"
                }} onChange={(e: any) => handleDay(e)}
                    label="Data do jogo" value={day} />
            </LocalizationProvider>

            <Typography variant={"h6"} sx={{
                   marginTop: "1rem",
                   width: "80%",
            }}>    
                Peças sorteadas
            </Typography>
            <List dense={true} sx={{
                  margin: "0",
                  width: "70%",
                  padding: "22px",
            }}>
                {Object.keys(Game.sorted).map((key: string, index: number) => 
                    (
                        <ListItem key={Number(index)} sx={{
                            padding: "0"
                        }}>
                            <ListItemText
                                primary={`${key}: ${Game.sorted[getKey(key)].product}`}
                            />
                        </ListItem>
                    )
                )}
            </List>
            

            <Box component={"section"} sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                flexDirection: "row",
                marginTop: "1rem",
                paddingBottom: "1rem",
                overflow: "hidden"
            }}>
                <Button variant="contained" color="primary" type="submit" sx={{
                    color: "white",
                    backgroundColor: "#6cbdb5",
                    '&:hover': {
                        backgroundColor: "#00b5b9",
                    },
                    fontSize: !mobile ? "1rem" : "1.15rem"
                }}>
                    Salvar
                </Button>
                <Button variant="contained" color="primary" type="reset" onClick={() => handleDelete()} sx={{
                    color: "white",
                    backgroundColor: "#bd6c6c",
                    '&:hover': {
                        backgroundColor: "#b90000",
                    },
                    fontSize: !mobile ? "1rem" : "1.15rem"
                }}>
                    Excluír
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

export default connect(MapStateToProps, MapActionToProps)(React.memo(GameDialogComponent))