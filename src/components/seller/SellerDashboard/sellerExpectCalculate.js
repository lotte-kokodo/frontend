import SellerInfoBox from "./sellerInfoBox";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {oneWeekDateParseToLocalDate,dateParseToSimple, moneyComma, parseToLocalDate, weekDateParseToLocalDate, monthDateParseToLocalDate} from "../../../common/calculate/function"
import {useParams} from "react-router-dom";
import {AuthContext} from "../../../context/authProvider";

export default function SellerExpectCalculate(){
    const { url } = useContext(ServerConfigContext);
    const {sellerHeaders} = useContext(AuthContext);

    const sellerId = localStorage.getItem("sellerId");
    let titleName = "이번주 정산 예정 금액"
    let unit = "원"
    const [numberInfo, setNumberInfo] = useState("");
    const [changeNumberInfo, setChangeNumberInfo] = useState("");

    const getCalculateExpectMount = async () => {
        await axios.get( url + `/calculate-service/calculate/${sellerId}/SellerDashBoardExpectMoney`,{headers : sellerHeaders})
        .then(function (resp) {
            setChangeNumberInfo(resp.data.result.data.changeNumberInfo);
            setNumberInfo(moneyComma(resp.data.result.data.numberInfo));
        }).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(()=>{
        getCalculateExpectMount();
    },[]);

    let idx = changeNumberInfo.indexOf('(');
    return(
        <SellerInfoBox titleName={titleName} numberInfo={numberInfo} updownFlag={changeNumberInfo.substring(0, 1) == '^' ? true : false} changeNumberInfo={moneyComma(changeNumberInfo.substring(1, idx - 1))} changNumberPercent={changeNumberInfo.substring(idx)} unit={unit}></SellerInfoBox>
    )
}