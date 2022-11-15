import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useContext } from "react";
import { useParams } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { styled } from '@mui/material/styles';
import {  Box } from '@mui/system';
import { Radio, TableContainer, TableBody, TableRow, TableHead, Table, Paper, TextField, TableCell, tableCellClasses, tableRowClasses, FormControl, RadioGroup, FormControlLabel } from '@mui/material';

import IssueList from '../../../../components/promotion/js/checkBoxComponent';
import "../css/makeDiscountPolicy.css";
import { ServerConfigContext } from "../../../../context/serverConfigProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.root}`]: {
        height: "30px",
        padding: "10px",
    },
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#FFFFFF',
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

function MakeDiscountPolicy() {
    const { url } = useContext(ServerConfigContext);
    // const sellerId = useParams().sellerId;

    const [discountPolicyName, setDiscountPolicyName] = useState('');
    const [checkedItems, setCheckedItems] = useState(new Set());
    const regDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    const [startDate, setStartDate] = useState(new Date(), 'YYYY-MM-DD hh:mm:ss');//useState(new Date(), 'YYYY:MM:DDTHH:mm:ss');
    const [endDate, setEndDate] = useState(new Date(), 'YYYY-MM-DD hh:mm:ss');//useState(new Date(), 'YYYY:MM:DDTHH:mm:ss');
    const sellerId = Number(1);

    const [radioCheck, setRadioCheck] = useState('rate');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [productList, setProductList] = React.useState([]);

    const [productName, setProductName] = useState();
    const [rateMinPrice, setRateMinPrice] = useState();
    const [ratePercent, setRatePercent] = useState();
    const [fixMinPrice, setFixMinPrice] = useState();
    const [fixWon, setFixWon] = useState();

    const handleClickRadio = (e) => {
        setRadioCheck(e.target.value);
    }

    const checkedItemHandler = (idList) => {
        setCheckedItems(idList);
    };

    const makePolicy = () => {

        setStartDateAndEndDate();

        if(checkCheckedItems()) {
            if (radioCheck === 'fix') {
                if(checkFixItems()) makeFixPolicy();
            }
            else if (radioCheck === 'rate') {
                if(checkRateItems()) makeRatePolicy();
            }
        }
    }

    const makeRatePolicy = async () => {
        let ratePolicyDto = {
            name: discountPolicyName,
            regDate: regDate,
            startDate: startDate,
            endDate: endDate,
            rate: Number(ratePercent),
            minPrice: Number(rateMinPrice),
            productId: Array.from(checkedItems),
            sellerId: sellerId
        }
        await axios({
            method: "post",
            url: url + "/promotion-service/rate-discount/save",
            data: ratePolicyDto
        })
            .then(function (resp) {
                if (resp.request.status == 200) {
                    alert('등록완료!')
                    window.location.reload();
                }
            })
            .catch(function (error) {
                alert(error.value);
            })
    }

    const makeFixPolicy = async () => {
        let fixPolicyDto = {
            name: discountPolicyName,
            regDate: regDate,
            startDate: startDate,
            endDate: endDate,
            price: Number(fixWon),
            minPrice: Number(fixMinPrice),
            productId: Array.from(checkedItems),
            sellerId: sellerId
        }
        console.log(fixPolicyDto);
        await axios({
            method: "post",
            url: url + "/promotion-service/fix-discount/save",
            data: fixPolicyDto
        })
            .then(function (resp) {
                if (resp.request.status == 200) {
                    alert('등록완료!')
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function getDifferenceDay() {
        var result = 0;
        result += moment.duration(endDate - startDate).asDays() + 1;
        return Math.ceil(result);
    }

    const FetchProduct = () => {
        console.log("프로덕트 아이디");
        console.log(productName);
        if (productName === undefined) {
            alert('이름을 입력해주세요!');
            return;
        }
        const fetchProduct = () => {
            axios.get(
                url + "/product-service/product/detail/name", {
                params: {
                    productName: productName
                }
            })
                .then(function (resp) {
                    setProductList(resp.data.result.data);
                })
                .catch(function (error) {
                    alert(error);
                })

        }

        fetchProduct();
    }

    const setStartDateAndEndDate = () => {
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
    }

    function checkCheckedItems() {
        if(checkedItems.size == 0) {
            alert("상품을 체크해주세요!")
            return false;
        }else if(discountPolicyName == '') {
            alert("정책명을 입력해주세요!")
            return false;
        }
        return true;
    }

    function checkRateItems() {
        console.log(ratePercent)
        console.log(rateMinPrice)
        if(ratePercent == undefined) {
            alert("비율을 입력해주세요!")
            return false;
        }
        else if (rateMinPrice == undefined) {
            alert("최소 금액을 입력해주세요!")
            return false;
        }
        return true;
    }

    function checkFixItems() {
        if(fixWon == undefined) {
            alert("할인 금액을 입력해주세요!")
            return false;
        }
        else if (fixMinPrice == undefined) {
            alert("최소 금액을 입력해주세요!")
            return false;
        }
        return true;
    }

    return (
        <div id="makeDiscountPolicy">
            <div>
                <Box sx={{ width: '100%' }}>
                    <Paper>

                        <TableContainer component={Paper}>
                            <h2>할인 정보 입력</h2>
                            <FormControl>
                                <RadioGroup defaultValue="rate">
                                    <Table aria-label="customized table">
                                        <TableBody>

                                            <StyledTableRow>
                                                {/* align="center" */}
                                                <StyledTableCell align="center" >정책명</StyledTableCell>
                                                <StyledTableCell colSpan={3}><input type="input" value={discountPolicyName} onChange={(e) => { setDiscountPolicyName(e.target.value) }}></input></StyledTableCell>

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
                                                    <FormControlLabel value="rate" control={<Radio />} label="정률" onChange={(e) => { handleClickRadio(e) }} />
                                                </StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell colSpan={1}>
                                                    <input type="input" value={rateMinPrice} onChange={(e) => setRateMinPrice(e.target.value)}></input>원 이상 구매시 <input type="input" value={ratePercent} onChange={(e) => setRatePercent(e.target.value)}></input>% 할인
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>

                                                <StyledTableCell>
                                                    <FormControlLabel value="fix" control={<Radio />} label="정액" onChange={(e) => { handleClickRadio(e) }} />
                                                </StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell colSpan={1}>
                                                    <input type="input" value={fixMinPrice} onChange={(e) => setFixMinPrice(e.target.value)}></input>원 이상 구매시 <input type="input" value={fixWon} onChange={(e) => setFixWon(e.target.value)}></input>원 할인
                                                </StyledTableCell>
                                            </StyledTableRow>

                                        </TableBody>
                                    </Table>
                                </RadioGroup>
                            </FormControl>
                            <div>
                                <h2>정책 적용 상품 찾기</h2>
                            </div>
                            <div className='find-product-component'>
                                <div className='find-product-component-title'>
                                    <div>
                                        상품명으로 찾기
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <input type="input" value={productName} onChange={(e) => setProductName(e.target.value)}></input>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <button onClick={() => { FetchProduct() }} style={{
                                            backgroundColor: "#FFFFFF", padding: "10px", paddingLeft: "40px", paddingRight: "40px", textAlign: "center",
                                            color: "#000", borderRadius: "10px", border: "solid black 1px"
                                        }}>조회</button>
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
                                    <IssueList props={{ productList, page, rowsPerPage }} propFunction={checkedItemHandler} ></IssueList>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>

            <button onClick={() => { makePolicy() }} style={{
                backgroundColor: "#FFFFFF", padding: "10px", paddingLeft: "40px", paddingRight: "40px", textAlign: "center",
                color: "#000", borderRadius: "10px", marginTop: "10px", border: "solid black 1px"
            }}>등록</button>
        </div>
    )
}

export default MakeDiscountPolicy;
