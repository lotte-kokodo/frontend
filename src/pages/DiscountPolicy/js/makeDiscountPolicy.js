import axios from 'axios';
import React, { useState, useRef } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { styled, withStyles } from '@mui/material/styles';
import { Box } from '@mui/system';
import { pink } from '@mui/material/colors';
import { Button } from '@mui/material';
import { Radio, TableContainer, TableBody, TableRow, TableHead, Table, Paper, TablePagination, TextField, TableCell, tableCellClasses, tableRowClasses, FormControl, RadioGroup, FormControlLabel } from '@mui/material';

import IssueList from './checkBoxComponent';
import "../css/makeDiscountPolicy.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        height: "30px",
        padding: "10px",
    },
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
    [`&.${tableRowClasses.root}`]: {
        height: "30px",
        padding: "10px",
    },
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    '&:hover': {
        backgroundColor: pink[700],
    },
}));


function MakeDiscountPolicy() {
    const [discountPolicyName, setDiscountPolicyName] = useState('');
    const regDate = moment().format('YYYY:MM:DDTHH:mm:ss');
    const [startDate, setStartDate] = useState(new Date(), 'yyyy:mm:dd');
    const [endDate, setEndDate] = useState(new Date(), 'yyyy:mm:dd');

    const [rate, setRate] = useState(0);
    const [rateMinPrice, setRateMinPrice] = useState(0);

    const [radioCheck, setRadioCheck] = useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    function createData(product_id, category_id, display_name, price, stock, deadline, delivery_fee, create_date) {
        return { product_id, category_id, display_name, price, stock, deadline, delivery_fee, create_date };
    }

    const rows = [
        createData('1', '1', '잇메이트 프로틴 어묵 스테이크 혼합 100g', '21,900', '100', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
        createData('2', '1', '네이처엠 현미밥 150g', '18,900', '200', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
        createData('3', '1', '네이처엠 현미밥 200g', '20,900', '150', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
        createData('4', '1', '신선애 IQF 생 닭안심살 1kg', '7,500', '130', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
        createData('5', '1', '맛있닭 소스 통 닭가슴살 혼합 100g', '19,900', '120', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
        createData('6', '1', '잇메이트 더블 덮밥 현미베지볶음밥 + 쭈꾸미 & 새우 220g', '22,200', '110', '2022-10-30T00:00:00', '3000', '2022-10-25T00:00:00'),
    ];

    const makePolicy = (e) => {
        e.preventDefault();
        if (radioCheck === 'fix') {
            makeFixPolicy();
        }
        else if (radioCheck === 'rate') {
            makeRatePolicy();
        }
    }

    const makeRatePolicy = async () => {
        let ratePolicyDto = {
            name: discountPolicyName,
            regDate: regDate,
            startDate: startDate,
            endDate: endDate,
            rate: rate,
            minPrice: rateMinPrice,
            productId: 1
            // 추후 체크박스로 갖고오기
        }
        console.log(ratePolicyDto);
        await axios({
            method: "post",
            url: "http://localhost:9011/rate-discount/save",
            data: ratePolicyDto
        })
            .then(function (resp) {
                alert(resp.value);
            })
            .catch(function (error) {
                alert(error.value);
            })
    }

    const makeFixPolicy = async () => {
        await axios({
            method: "post",
            url: "http://localhost:9011/fix-discount/save",
            // data: params
        })
            .then(function (resp) {
                alert(resp.value);
            })
            .catch(function (error) {
                alert(error.value);
            })
    }

    function getDifferenceDay() {
        var result = 0;
        result += moment.duration(endDate - startDate).asDays() + 1;
        return Math.ceil(result);
    }

    function FetchProduct() {
        const fetchProduct = (productId) => {
            axios({
                method: "get",
                url: "http://localhost:8080/product/아이디적어",
                // data: params
            })
                .then(function (resp) {
                    alert(resp);
                })
                .catch(function (error) {
                    alert(error);
                })

        }
        fetchProduct();

        return (
            <tr>
                <td></td>
            </tr>
        )
    }

    return (
        <div id="makeDiscountPolicy">
            <div>
                <Box sx={{ width: '100%' }}>
                    <Paper>

                        <TableContainer component={Paper}>
                            <h2>할인 정보 입력</h2>
                            <FormControl>
                                <RadioGroup>
                                    <Table aria-label="customized table">
                                        <TableBody>

                                            <StyledTableRow>
                                                {/* align="center" */}
                                                <StyledTableCell align="center" >정책명</StyledTableCell>
                                                <StyledTableCell colSpan={3}><TextField id="standard-basic" label="Standard" variant="standard" /></StyledTableCell>

                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">정책 발행일시</StyledTableCell>
                                                <StyledTableCell colSpan={3}>{regDate}</StyledTableCell>

                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">
                                                    정책 유효기간
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
                                                        selectsStart
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell align="center">
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
                                                        selectsEnd
                                                        startDate={startDate}
                                                        endDate={endDate}
                                                        minDate={startDate}
                                                    />
                                                </StyledTableCell>
                                                <StyledTableCell colSpan={2} align="right">
                                                    발행일로부터 : {getDifferenceDay()}일
                                                </StyledTableCell>
                                            </StyledTableRow>

                                            <StyledTableRow>

                                                <StyledTableCell align="center" rowSpan={2}>
                                                    할인 방식
                                                </StyledTableCell>

                                                <StyledTableCell>
                                                    <FormControlLabel value="정률" control={<Radio />} label="정률" />
                                                </StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell colSpan={1}>
                                                    <TextField id="standard-basic" label="Standard" variant="standard" />원 이상 구매시 <TextField id="standard-basic" label="Standard" variant="standard" />% 할인
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>

                                                <StyledTableCell>
                                                    <FormControlLabel value="정액" control={<Radio />} label="정액" />
                                                </StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell colSpan={1}>
                                                    <TextField id="standard-basic" label="Standard" variant="standard" />원 이상 구매시 <TextField id="standard-basic" label="Standard" variant="standard" />원 할인
                                                </StyledTableCell>
                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </RadioGroup>
                            </FormControl>
                            {/* <TextField id="standard-basic" label="Standard" variant="standard" /> <button type='button'> 상품 조회</button> */}
                            <div>
                                <h2>정책 적용 상품 찾기</h2>
                            </div>
                            <div className='find-product-component'>
                                <div className='find-product-component-title'>
                                    <div>
                                        상품 ID로 추가
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <TextField id="standard-basic" label="Standard" variant="standard" />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <ColorButton variant="contained" onClick={FetchProduct} sx={{ marginTop: 1 }}>
                                            조회
                                        </ColorButton>
                                    </div>
                                </div>
                            </div>
                            <h2>할인 적용 상품</h2>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">상품ID</StyledTableCell>
                                        <StyledTableCell align="center">카테고리ID</StyledTableCell>
                                        <StyledTableCell align="center">상품명</StyledTableCell>
                                        <StyledTableCell align="center">가격</StyledTableCell>
                                        <StyledTableCell align="center">재고량</StyledTableCell>
                                        <StyledTableCell align="center">유통기한</StyledTableCell>
                                        <StyledTableCell align="center">배송비</StyledTableCell>
                                        <StyledTableCell align="center">등록일자</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* 데이터 props에 넣기 */}
                                    <IssueList props={{ page, rowsPerPage }}></IssueList>
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
            </div>

            <ColorButton variant="contained" onClick={makePolicy}sx={{ marginTop: 1 }}>
                등록
            </ColorButton>
        </div>
    )
}

export default MakeDiscountPolicy;
