import SellerInfoBox from "./sellerInfoBox";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {oneWeekDateParseToLocalDate,dateParseToSimple, moneyComma, parseToLocalDate, weekDateParseToLocalDate, monthDateParseToLocalDate} from "../../../common/calculate/function"
import {useParams} from "react-router-dom";

export default function SellerExpectCalculate(){
    // const { url } = useContext(ServerConfigContext);
    let url = "http://localhost:8001";
    const params = useParams();

    let titleName = "이번주 정산 예정 금액"
    let unit = "원"
    const [numberInfo, setNumberInfo] = useState("");
    const [changeNumberInfo, setChangeNumberInfo] = useState("");

    const getCalculateExpectMount = async () => {
        await axios.get( url + `/calculate-service/calculate/${params.sellerId}/SellerDashBoardExpectMoney`,{
        }).then(function (resp) {
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