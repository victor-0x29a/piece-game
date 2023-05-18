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


const PieceTableComponent = ({ pieces, categories, setLoading }: piecePropsComponent) => {
    const [open, setOpen] = useState(false)
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
    return <>
        <Paper sx={{ width: mobile ? '90%' : "60%", overflow: 'hidden', height: "440px", boxShadow: !mobile ? "0 0 1em black" : "0 0 0.1em black" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" sx={{
                }}>
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
                        {pieces.map((piece) => {
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
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={pieces.length}
                rowsPerPage={10}
                page={page}
                onPageChange={(event: unknown, page: number) => setPage(page)}
            />
        </Paper>
        <PieceDialogComponent Piece={select} Open={open} setOpen={setOpen} key={1} Categories={categories} setLoading={setLoading} />
    </>
}

export default PieceTableComponent