import * as React from 'react';
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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#D8D8D8',
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

function createData(couponId, couponName, reqDate, reqContent, reqStatus, reqResult) {
    return { couponId, couponName, reqDate, reqContent, reqStatus, reqResult };
}

const rows = [
    createData('14717750', '첫 구매 할인', '2019-05-13 09:27', '쿠폰적용(상품추가)', '완료', '총 11건:성공 11건'),
    createData('14771512', 'vip 고객 할인', '2019-05-12 00:05', '쿠폰사용중지', '완료', '총 11건:성공 11건'),
    createData('14783035', '기간 한정 할인', '2019-05-09 19:27', '쿠폰적용(상품추가)', '완료', '총 942건:성공 942건'),
    createData('14783026', '한글날 기념 할인', '2019-05-09 19:22', '쿠폰적용(상품추가)', '완료', '총 647건:성공 647건'),
    createData('14783024', '이벤트 할인', '2019-05-09 19:22', '쿠폰적용(상품추가)', '완료', '총 825건:성공 825건'),
    createData('14783020', '기간 한정 할인', '2019-05-09 19:16', '쿠폰적용(상품추가)', '요청불가', '총 942건:성공 0건 실패 942건'),
];

export default function DiscountPolicyReqList() {
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('reqDate');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>정책ID</StyledTableCell>
                                <StyledTableCell align="center">정책명</StyledTableCell>
                                <StyledTableCell align="center">요청일시</StyledTableCell>
                                <StyledTableCell align="center">요청사항</StyledTableCell>
                                <StyledTableCell align="center">요청상태</StyledTableCell>
                                <StyledTableCell align="center">요청결과</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <StyledTableRow key={row.couponId}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.couponId}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.couponName}</StyledTableCell>
                                    <StyledTableCell align="center">{row.reqDate}</StyledTableCell>
                                    <StyledTableCell align="center">{row.reqContent}</StyledTableCell>
                                    <StyledTableCell align="center">{row.reqStatus}</StyledTableCell>
                                    <StyledTableCell align="center">{row.reqResult}</StyledTableCell>
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
