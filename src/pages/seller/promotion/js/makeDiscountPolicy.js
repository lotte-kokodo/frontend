import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import { TableContainer, TableBody, TableRow, TableHead, Table, Paper, TextField, TableCell, tableCellClasses, tableRowClasses, FormControl, RadioGroup, FormControlLabel } from '@mui/material';
import IssueList from '../../../../components/promotion/js/checkBoxComponent';
import "../css/makeDiscountPolicy.css";
import { ServerConfigContext } from "../../../../context/serverConfigProvider";
import DiscountPolicyInput from '../../../../components/promotion/js/discountPolicyInput';

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

const MakeDiscountPolicy = () => {
    const { url } = useContext(ServerConfigContext);
    const [checkedItems, setCheckedItems] = useState(new Set());
    const regDate = moment().format('YYYY-MM-DDTHH:mm:ss');

    const sellerId = localStorage.getItem("sellerId");
    const [productList, setProductList] = React.useState([]);
    const [productName, setProductName] = useState();

    var discountPolicyName, startDate, endDate, radioCheck;
    var rateMinPrice, ratePercent;
    var fixMinPrice, fixWon;

    function setPropDiscountPolicyName(e) {
        discountPolicyName = e;
    }

    function setPropStartDate(e) {
        startDate = e;
    }

    function setPropEndDate(e) {
        endDate = e;
    }

    function setPropRadioCheck(e) {
        radioCheck = e;
    }

    function setPropRateMinPrice(e) {
        rateMinPrice = e;
    }

    function setPropRatePercent(e) {
        ratePercent = e;
    }

    function setPropFixMinPrice(e) {
        fixMinPrice = e;
    }

    function setPropFixWon(e) {
        fixWon = e;
    }

    useEffect(() => {
        FetchProduct();
    }, []);

    const checkedItemHandler = (idList) => {
        setCheckedItems(idList);
    };

    const makePolicy = () => {
        if (checkCheckedItems()) {
            if (radioCheck === 'fix') {
                if (checkFixItems()) makeFixPolicy();
            }
            else if (radioCheck === 'rate') {
                if (checkRateItems()) makeRatePolicy();
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
                    alert('????????????!')
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error)
                alert("?????? ????????? ????????? ???????????????!");
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
        await axios({
            method: "post",
            url: url + "/promotion-service/fix-discount/save",
            data: fixPolicyDto
        })
            .then(function (resp) {
                if (resp.request.status == 200) {
                    alert('????????????!')
                    window.location.reload();
                }
            })
            .catch(function (error) {
                console.log(error)
                alert("?????? ????????? ????????? ???????????????!");
            })
    }

    const FetchProduct = () => {
        if (productName === undefined) {
            const fetchProduct = () => {
                axios.get(
                    url + "/product-service/product/detail/all/" + sellerId
                )
                    .then(function (resp) {
                        console.log("?????? ?????????!!!")
                        console.log(resp)
                        setProductList(resp.data.result.data);
                    })
                    .catch(function (error) {
                        alert(error);
                    })
            }
            fetchProduct();
        }
        else {
            const fetchProduct = () => {
                axios({
                    method: "get",
                    url: url + "/product-service/product/detail/name",
                    params: {
                        sellerId: sellerId,
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
    }

    function checkCheckedItems() {
        if (checkedItems.size == 0) {
            alert("????????? ??????????????????!")
            return false;
        } else if ((discountPolicyName === undefined) || (discountPolicyName === '')) {
            alert("???????????? ??????????????????!")
            return false;
        }
        return true;
    }

    function checkRateItems() {
        if (ratePercent == undefined) {
            alert("????????? ??????????????????!")
            return false;
        }
        else if (rateMinPrice == undefined) {
            alert("?????? ????????? ??????????????????!")
            return false;
        }
        return true;
    }

    function checkFixItems() {
        if (fixWon == undefined) {
            alert("?????? ????????? ??????????????????!")
            return false;
        }
        else if (fixMinPrice == undefined) {
            alert("?????? ????????? ??????????????????!")
            return false;
        }
        return true;
    }

    return (
        <div id="makeDiscountPolicy">
            <div>
                <Box sx={{ width: '100%', overflow: "auto",height:"750px"}}>
                    <Paper>

                        <TableContainer component={Paper}>
                            <DiscountPolicyInput setPropRateMinPrice={setPropRateMinPrice} setPropRatePercent={setPropRatePercent}
                                setPropFixMinPrice={setPropFixMinPrice} setPropFixWon={setPropFixWon} setPropDiscountPolicyName={setPropDiscountPolicyName}
                                setPropStartDate={setPropStartDate} setPropEndDate={setPropEndDate} setPropRadioCheck={setPropRadioCheck}/>
                            <div>
                                <h2>?????? ?????? ?????? ??????</h2>
                            </div>
                            <div className='find-product-component'>
                                <div className='find-product-component-title'>
                                    <div>
                                        ??????????????? ??????
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
                                        }}>??????</button>
                                    </div>
                                </div>
                            </div>
                            <h2>?????? ?????? ??????</h2>
                            <Table aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>
                                        </StyledTableCell>
                                        <StyledTableCell align="center">??????ID</StyledTableCell>
                                        <StyledTableCell align="center">?????????</StyledTableCell>
                                        <StyledTableCell align="center">??????</StyledTableCell>
                                        <StyledTableCell align="center">?????????</StyledTableCell>
                                        <StyledTableCell align="center">????????????</StyledTableCell>
                                        <StyledTableCell align="center">?????????</StyledTableCell>
                                        <StyledTableCell align="center">????????????</StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* ????????? props??? ?????? */}
                                    <IssueList props={{ productList }} propFunction={checkedItemHandler} ></IssueList>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>

            <button onClick={() => { makePolicy() }} style={{
                backgroundColor: "#FFFFFF", padding: "10px", paddingLeft: "40px", paddingRight: "40px", textAlign: "center",
                color: "#000", borderRadius: "10px", marginTop: "10px", border: "solid black 1px"
            }}>??????</button>
        </div>
    )
}

export default MakeDiscountPolicy;
