import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { styled, withStyles } from '@mui/material/styles';
import { Box } from '@mui/system';
import { pink } from '@mui/material/colors';
import { Button } from '@mui/material';
import { Radio, TableContainer, TableBody, TableRow, TableHead, Table, Paper, TablePagination, TextField, TableCell, tableCellClasses, tableRowClasses, FormControl, RadioGroup, FormControlLabel } from '@mui/material';

import IssueList from '../../../../components/promotion/js/checkBoxComponent';
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

function MakeCoupon() {
    const [couponName, setCouponName] = useState('');
    const [checkedItems, setCheckedItems] = useState(new Set());
    const regDate = moment().format('YYYY-MM-DDTHH:mm:ss');
    const [startDate, setStartDate] = useState(new Date(), 'YYYY-MM-DDTHH:mm:ss');//useState(new Date(), 'YYYY:MM:DDTHH:mm:ss');
    const [endDate, setEndDate] = useState(new Date(), 'YYYY-MM-DDTHH:mm:ss');//useState(new Date(), 'YYYY:MM:DDTHH:mm:ss');
    const sellerId = Number(1);

    const [radioCheck, setRadioCheck] = useState('');

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    let [productList, setProductList] = React.useState([]);

    const [productId, setProductId] = useState();
    const [rateMinPrice, setRateMinPrice] = useState();
    const [ratePercent, setRatePercent] = useState();
    const [fixMinPrice, setFixMinPrice] = useState();
    const [fixWon, setFixWon] = useState();

    const [searchProductName , setSearchProductName] = useState('');
    const [searchStartDate, setSearchStartDate] =useState(null);
    const [searchEndDate, setSearchEndDate] =useState(null);

    const handleClickRadio = (e) => {
        setRadioCheck(e.target.value);
    }

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

    const checkedItemHandler = (idList) => {
        setCheckedItems(idList);
    };

    const makePolicy = () => {
        // e.preventDefault();
        if (radioCheck === 'fix') {
            makeFixPolicy();
        }
        else if (radioCheck === 'rate') {
            makeRatePolicy();
        }
    }


    const makeRatePolicy = async () => {
        console.log(startDate);
        console.log(endDate);

        let ratePolicyDto = {
            name: couponName,
            regDate: regDate,
            startDate: moment(startDate).format('YYYY-MM-DD hh:mm:ss'),
            endDate: moment(endDate).format('YYYY-MM-DD hh:mm:ss'),
            rate: Number(ratePercent),
            minPrice: Number(rateMinPrice),
            productList: Array.from(checkedItems),
            sellerId: sellerId
        }
        await axios({
            method: "post",
            url: "http://localhost:8001/promotion-service/rateCoupon/save",
            data: ratePolicyDto
        })
            .then(function (resp) {
                if(resp.request.status == 200) {
                alert('등록완료!')
                window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error.value);
            })
    }

    const makeFixPolicy = async () => {
        let fixPolicyDto = {
            name: couponName,
            regDate: regDate,
            startDate: moment(startDate).format('YYYY-MM-DD hh:mm:ss'),
            endDate: moment(endDate).format('YYYY-MM-DD hh:mm:ss'),
            price: Number(fixWon),
            minPrice: Number(0),
            productList: Array.from(checkedItems),
            sellerId: sellerId
        }
        await axios({
            method: "post",
            url: "http://localhost:8001/promotion-service/fixCoupon",
            data: fixPolicyDto
        })
            .then(function (resp) {
                if(resp.request.status == 200) {
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

        let sDate =searchStartDate+" 00:00";
        let eDate = searchEndDate+" 00:00";

        // TODO: seller ID 추가
        const fetchProduct = () => {
            axios({
                method: "get",
                url: `http://localhost:8001/product-service/product?productName=${searchProductName}&status=1&startDate=${sDate}&endDate=${eDate}&sellerId=3`
                
                // data: params
            })
                .then(function (resp) {
                    setProductList(resp.data);
                })
                .catch(function (error) {
                    console.log(error);
                })

        }
        fetchProduct();
    }
    // 지원
    const productData= async () => {
            await axios.get(`http://localhost:8001/product-service/product/seller/3`)
                .then(function (resp) {
                    setProductList(resp.data.result.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
    
        useEffect(() => {
            productData();
        }, []);
    
    const changeSearchProductName = (e) => {setSearchProductName(e.target.value);}
    const changeSearchStartDate = (e) => {setSearchStartDate(e.target.value);}
    const changeSearchEndDate = (e) => {setSearchEndDate(e.target.value);}

    return (
        <div id="makeDiscountPolicy">
            <div>
                <Box sx={{ width: '100%' }}>
                    <Paper>

                        <TableContainer component={Paper}>
                            <h2>쿠폰 정보 입력</h2>
                            <FormControl>
                                <RadioGroup>
                                    <Table aria-label="customized table">
                                        <TableBody>

                                            <StyledTableRow>
                                                {/* align="center" */}
                                                <StyledTableCell align="center" >쿠폰명</StyledTableCell>
                                                <StyledTableCell colSpan={3}><input type="input" value={couponName} onChange={(e) => {setCouponName(e.target.value)}}></input></StyledTableCell>

                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">쿠폰 발행일시</StyledTableCell>
                                                <StyledTableCell colSpan={3}>{regDate}</StyledTableCell>

                                            </StyledTableRow>
                                            <StyledTableRow>
                                                <StyledTableCell align="center">
                                                    쿠폰 유효기간
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
                                                    <FormControlLabel value="rate" control={<Radio />} label="비율 할인 쿠폰" onChange={(e) => {handleClickRadio(e)}}/>
                                                </StyledTableCell>
                                                <StyledTableCell></StyledTableCell>
                                                <StyledTableCell colSpan={1}>
                                                    <input type="input" value={rateMinPrice} onChange={(e) => setRateMinPrice(e.target.value)}></input>원 이상 구매시 <input type="input" value={ratePercent} onChange={(e) => setRatePercent(e.target.value)}></input>% 할인
                                                </StyledTableCell>
                                            </StyledTableRow>
                                            <StyledTableRow>

                                                <StyledTableCell>
                                                    <FormControlLabel value="fix" control={<Radio />} label="무료배송"  onChange={(e) => {handleClickRadio(e)}}/>
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
                            <div style={{padding: "10px", marginBottom: "20px", backgroundColor: "#F0F0F0"}}>
                            <div style={{padding: "10px"}}> 
                                <h3>적용할 상품 조회</h3>
                            </div>
                            <div >
                                <div style={{padding: "10px"}}>
                                    <div style={{display: "flex"}}>
                                        <div style={{display: "flex", alignItems:"left", padding: "10px", marginLeft: "20px"}}>상품명
                                            <input type="text" style={{marginLeft: "10px"}} value={searchProductName} onChange={changeSearchProductName}></input></div>
                                        <div style={{display: "flex",  marginLeft: "100px", marginRight:"10px", padding:"10px"}}>등록 날짜 
                                            <input type="date" style={{marginLeft: "10px", marginRight:"10px"}} value={searchStartDate || ''} onChange={changeSearchStartDate}/> 
                                                ~ 
                                            <input type="date" style={{marginLeft: "10px"}} value={searchEndDate || ''} onChange={changeSearchEndDate}/></div>
                                        <div style={{display: "flex",  marginLeft: "90px"}}> 
                                        <button style={{backgroundColor: "#FB7D98", padding: "5px", paddingLeft: "25px", paddingRight: "25px", textAlign: "center",
                                                color: "#fff", borderRadius: "10px"}} onClick={FetchProduct}> 조회</button></div>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">상품ID</StyledTableCell>
                                        <StyledTableCell align="center">카테고리</StyledTableCell>
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
                                    <IssueList props={{ productList, page, rowsPerPage }} propFunction={checkedItemHandler}></IssueList>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={productList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Paper>
                </Box>
            </div>

            <button onClick={() => {makePolicy()}} style={{
                backgroundColor: "#FB7D98", padding: "10px", paddingLeft: "40px", paddingRight: "40px", textAlign: "center",
                color: "#fff", borderRadius: "10px"
            }}>등록</button>
        </div>
    )
}

export default MakeCoupon;