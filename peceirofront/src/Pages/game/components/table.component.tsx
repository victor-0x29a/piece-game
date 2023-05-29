import React, { useState } from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import GameDialogComponent from './dialog.component';
import useMediaQuery from '@mui/material/useMediaQuery'
import { columns } from '../../../data/game.data'
import { gamePropsComponent } from '../types/props.pieces';
import Button from "@mui/material/Button"
import Box from '@mui/material/Box'
import GameCreateComponent from './create.component';
import { GameDto } from '../../../dto/game.dto';

const GameTableComponent = ({ games, setLoading }: gamePropsComponent) => {
    const [open, setOpen] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [select, setSelect] = useState<GameDto>({
        id: 0,
        day: "2022-22-22",
        description: "Description",
        sorted: {
        },
        title: "Title"
    })
    const [page, setPage] = useState(0)
    const mobile = useMediaQuery("(max-width: 612px)")

    const openDialog = (Game: GameDto) => {
        if (open) return false
        setSelect(Game)
        setOpen(true)
    }

    const openDialogCreate = () => {
        if (openCreate) return false
        setOpenCreate(true)
    }
    return <>
        <Paper sx={{ width: mobile ? '90%' : "60%", overflow: 'hidden', boxShadow: !mobile ? "0 0 1em black" : "0 0 0.1em black" }}>
            <TableContainer sx={{ height: "440px" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, indexColumn) => (
                                <TableCell
                                    key={indexColumn * 30000}
                                    align={"center"}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {games.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((game, indexPiece) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={indexPiece * 10000} >
                                    {columns.map((column, indexColumnPiece) => {
                                        return (
                                            <TableCell align={"center"} onClick={() => openDialog(game)} key={indexColumnPiece * 20000}>
                                                {column.label === "Título" ? game.title : game.day}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box component="div" sx={{
                height: "60px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <Button variant="contained" color="primary" type="submit" onClick={() => openDialogCreate()} sx={{
                    color: "white",
                    backgroundColor: "#6cbdb5",
                    '&:hover': {
                        backgroundColor: "#00b5b9",
                    },
                    fontSize: !mobile ? "1rem" : "1.15rem",
                    height: "40px",
                    marginLeft: "10px"
                }}>
                    Criar
                </Button>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={games.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event: unknown, page: number) => setPage(page)}
                />
            </Box>
        </Paper>

        <GameDialogComponent Open={open} setOpen={setOpen} key={500001} setLoading={setLoading} Game={select} />


        <GameCreateComponent Open={openCreate} setOpen={setOpenCreate} key={500002} Game={select} setLoading={setLoading} />
    </>
}

export default GameTableComponent