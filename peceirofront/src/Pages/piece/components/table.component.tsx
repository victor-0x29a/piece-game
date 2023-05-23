import React, { useState } from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import PieceDialogComponent from './dialog.component';
import useMediaQuery from '@mui/material/useMediaQuery'
import { columns } from '../../../data/piece.data'
import { piecePropsComponent } from '../types/props.pieces';
import { CreatePieceDto } from '../../../dto/piece.dto';
import Button from "@mui/material/Button"
import Box from '@mui/material/Box'
import PieceCreateComponent from './create.component';

const PieceTableComponent = ({ pieces, categories, setLoading }: piecePropsComponent) => {
    const [open, setOpen] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const [rowsPerPage, setRowsPerPage] = useState(7);
    const [select, setSelect] = useState<CreatePieceDto>({
        id: 0,
        product: "Nenhum",
        category: {
            id: 0,
            name: "Nenhuma"
        }
    })
    const [page, setPage] = useState(0)
    const mobile = useMediaQuery("(max-width: 612px)")

    const openDialog = (Piece: CreatePieceDto) => {
        if (open) return false
        setSelect(Piece)
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
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={"center"}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {pieces.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((piece) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={piece.id}>
                                    {columns.map((column) => {
                                        return (
                                            <TableCell key={column.id} align={"center"} onClick={() => openDialog(piece)}>
                                                {column.label === "Nome" ? piece.product : piece.category.name}
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
                    count={pieces.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(event: unknown, page: number) => setPage(page)}
                />
            </Box>
        </Paper>
        <PieceDialogComponent Piece={select} Open={open} setOpen={setOpen} key={1} Categories={categories} setLoading={setLoading} />
        <PieceCreateComponent Open={openCreate} setOpen={setOpenCreate} key={1} Categories={categories} setLoading={setLoading} />
    </>
}

export default PieceTableComponent