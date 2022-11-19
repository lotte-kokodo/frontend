import React, {useContext, useEffect, useState} from "react";
import SellerInfoBox from "./sellerInfoBox";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import axios from "axios";
import {moneyComma} from "../../../common/calculate/function";

export default function SellerTodayOrder(){

    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);

    const orderCountInitData = {
        todayOrderCount: 0,
        upDownFlag: true,
        changeNumberInfo: 0,
        changeNumberPercent: 0
    }
    const [orderCountDto, setOrderCountDto] = useState(orderCountInitData);
    const titleName = "당일 주문건수"
    const unit = " 건"


    useEffect(()=>{
        getTodayOrderCount();
    },[]);

    const getTodayOrderCount = async () => {
        const api = url + "/seller-service/orders/count";

        await axios.get(api, {headers: sellerHeaders})
        .then((resp) => {
            setOrderCountDto(resp.data.result.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <>
            <SellerInfoBox titleName={titleName}
                           numberInfo={orderCountDto.todayOrderCount}
                           updownFlag={orderCountDto.upDownFlag ? 1 : 0}
                           changeNumberInfo={orderCountDto.changeNumberInfo}
                           changNumberPercent={orderCountDto.changeNumberPercent}
                           unit={unit}/>
        </>
    )
}