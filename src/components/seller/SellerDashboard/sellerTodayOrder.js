import React, {useContext, useEffect, useState} from "react";
import SellerInfoBox from "./sellerInfoBox";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";
import axios from "axios";

export default function SellerTodayOrder(){

    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);

    const [todayOrderCount, setTodayOrderCount] = useState(0);


    useEffect(()=>{
        getTodayOrderCount();
    },[]);

    const getTodayOrderCount = async () => {
        const api = url + "/seller-service/orders/todayCount";

        await axios.get(api, {headers: sellerHeaders})
        .then((resp) => {
            setTodayOrderCount(resp.data.result.data);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    return(
        <SellerInfoBox numberInfo={todayOrderCount} titleName={"당일 주문건수"} unit={"건"}/>
    )
}