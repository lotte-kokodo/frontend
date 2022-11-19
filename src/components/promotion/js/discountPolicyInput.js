import DatePicker from "react-datepicker";
import { styled } from '@mui/material/styles';
import { Radio, TableContainer, TableBody, TableRow, TableHead, Table, Paper, TextField, TableCell, tableCellClasses, tableRowClasses, FormControl, RadioGroup, FormControlLabel } from '@mui/material';
import React, { useState, useRef, useEffect } from 'react';
import moment from 'moment'



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



const DiscountPolicyInput = (props) => {
    const [discountPolicyName, setDiscountPolicyName] = useState('');
    const [startDate, setStartDate] = useState(new Date(), 'YYYY-MM-DD hh:mm:ss');//useState(new Date(), 'YYYY:MM:DDTHH:mm:ss');
    const [endDate, setEndDate] = useState(new Date(), 'YYYY-MM-DD hh:mm:ss');//useState(new Date(), 'YYYY:MM:DDTHH:mm:ss');
    const [radioCheck, setRadioCheck] = useState('rate');
    const [rateMinPrice, setRateMinPrice] = useState();
    const [ratePercent, setRatePercent] = useState();
    const [fixMinPrice, setFixMinPrice] = useState();
    const [fixWon, setFixWon] = useState();

    const regDate = moment().format('YYYY-MM-DDTHH:mm:ss');

    useEffect(()=> {
        startDate.setHours(0, 0, 0);
        endDate.setHours(23, 59, 59);
        sendParent();
    });

    const setPropDiscountPolicyName = (discountPolicyName) => {
        setDiscountPolicyName(discountPolicyName);
        props.setPropDiscountPolicyName(discountPolicyName);
    }

    const setPropStartDate = (startDate) => {
        setStartDate(startDate);
        startDate.setHours(0, 0, 0);
        props.setPropStartDate(startDate);
    }

    const setPropEndDate = (endDate) => {
        setEndDate(endDate);
        endDate.setHours(23, 59, 59);
        props.setPropEndDate(endDate);
    }

    const setPropRadioCheck = (radioCheckProp) => {
        setRadioCheck(radioCheckProp);
        props.setPropRadioCheck(radioCheck);
    }

    const setPropRateMinPrice = (minPrice) => {
        setRateMinPrice(minPrice);
        props.setPropRateMinPrice(minPrice);
    }

    const setPropRatePercent = (ratePercent) => {
        setRatePercent(ratePercent);
        props.setPropRatePercent(ratePercent);
    }

    const setPropFixMinPrice = (fixMinPrice) => {
        setFixMinPrice(fixMinPrice);
        props.setPropFixMinPrice(fixMinPrice);
    }

    const setPropFixWon = (fixWon) => {
        setFixWon(fixWon);
        props.setPropFixWon(fixWon);
    }

    const sendParent = () => {
        setPropDiscountPolicyName(discountPolicyName)
        setPropStartDate(startDate)
        setPropEndDate(endDate)
        setPropRatePercent(ratePercent)
        setPropRateMinPrice(rateMinPrice)
        setPropFixWon(fixWon)
        setPropFixMinPrice(fixMinPrice)
        setPropRadioCheck(radioCheck)
    }

    const getDifferenceDay = () => {
        var result = 0;
        result += moment.duration(endDate - startDate).asDays() + 1;
        return Math.ceil(result);
    }

    const handleClickRadio = (e) => {
        setPropRadioCheck(e.target.value);
    }

    return (
        <>
            <h2>할인 정보 입력</h2>
            <FormControl>
                <RadioGroup defaultValue="rate">
                    <Table aria-label="customized table">
                        <TableBody>

                            <StyledTableRow>
                                {/* align="center" */}
                                <StyledTableCell align="center" >정책명</StyledTableCell>
                                <StyledTableCell colSpan={3}><input type="input" value={discountPolicyName} onChange={(e) => { setPropDiscountPolicyName(e.target.value) }}></input></StyledTableCell>

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
                                        onChange={(date) => setPropStartDate(date)}
                                        selectsStart
                                        startDate={startDate}
                                        endDate={endDate}
                                    />
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    <DatePicker
                                        selected={endDate}
                                        onChange={(date) => setPropEndDate(date)}
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
                                    <input type="input" value={rateMinPrice} onChange={(e) => setPropRateMinPrice(e.target.value)}></input>원 이상 구매시 <input type="input" value={ratePercent} onChange={(e) => setPropRatePercent(e.target.value)}></input>% 할인
                                </StyledTableCell>
                            </StyledTableRow>
                            <StyledTableRow>

                                <StyledTableCell>
                                    <FormControlLabel value="fix" control={<Radio />} label="정액" onChange={(e) => { handleClickRadio(e) }} />
                                </StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell colSpan={1}>
                                    <input type="input" value={fixMinPrice} onChange={(e) => setPropFixMinPrice(e.target.value)}></input>원 이상 구매시 <input type="input" value={fixWon} onChange={(e) => setPropFixWon(e.target.value)}></input>원 할인
                                </StyledTableCell>
                            </StyledTableRow>

                        </TableBody>
                    </Table>
                </RadioGroup>
            </FormControl>
        </>
    )

}

export default React.memo(DiscountPolicyInput);