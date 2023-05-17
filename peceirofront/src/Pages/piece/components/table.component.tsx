import React, { useState } from 'react'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import { columns } from '../../../data/piece.data'
import { piecePropsComponent } from '../types/props.pieces';


const PieceTableComponent = ({ pieces }: piecePropsComponent) => {
    const [page, setPage] = useState(0)
    return <>
        <Paper sx={{ width: '60%', overflow: 'hidden', height: "440px" }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table" sx={{
                    ".MuiTable-root": {
                        backgroundColor: "#6cbdb5"
                    }
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
                                            <TableCell key={column.id} align={column.align}>

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
    </>
}

export default PieceTableComponent