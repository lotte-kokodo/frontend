import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import { Box } from '@mui/system';
import { ServerConfigContext } from "../../../context/serverConfigProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#F5A9BC',
        color: theme.palette.common.black,
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(couponId, couponName, expirationDate, status, quantity) {
    return { couponId, couponName, expirationDate, status, quantity };
}

export default function RateDiscountPolicyList() {
    const sellerId = useParams().sellerId;
    const { url } = useContext(ServerConfigContext);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('reqDate');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = useState([]);
    // const [sellerId, setSellerId] = useState(1);

    const fetchRowDiscountPolicyList = async() => {
        //sellerId 확인 필요
        
        await axios.get(url + "promotion-service/fix-discount/seller/1", {   
        // params: {
        //     sellerId: sellerId
        // }
        })
            .then(function (resp) {
                for(var i=0;i<resp.data.result.data.length;i++) {
                    setRows(resp.data.result.data);
                }
            })
            .catch(function (error) {
                alert(error);
            })
    }

    useEffect(() => {
        // setSellerId(1);
		fetchRowDiscountPolicyList();
	}, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper>
                <TableContainer component={Paper} sx={{ width: '85%' }}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>고정정책ID</StyledTableCell>
                                <StyledTableCell align="center">상품ID</StyledTableCell>
                                <StyledTableCell align="center">정책명</StyledTableCell>
                                <StyledTableCell align="center">생성일시</StyledTableCell>
                                <StyledTableCell align="center">시작일시</StyledTableCell>
                                <StyledTableCell align="center">종료일시</StyledTableCell>
                                <StyledTableCell align="center">최소금액</StyledTableCell>
                                <StyledTableCell align="center">할인금액</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <StyledTableRow key={row.couponId}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.fixDiscountPolicyId}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.productId}</StyledTableCell>
                                    <StyledTableCell align="center">{row.name}</StyledTableCell>
                                    <StyledTableCell align="center">{row.regDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.startDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.endDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.minPrice}</StyledTableCell>
                                    <StyledTableCell align="center">{row.price}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}