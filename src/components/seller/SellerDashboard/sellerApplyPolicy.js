import SellerInfoBox from "./sellerInfoBox";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";

export default function SellerApplyPolicy(){
    const { url } = useContext(ServerConfigContext);
    const {sellerHeaders} = useContext(AuthContext);

    const sellerId = localStorage.getItem("sellerId");
    let titleName = "이번주 적용된 정책 할인 가격";
    let unit = "원"
    const [numberInfo, setNumberInfo] = useState("");

    const getCalculateExpectMount = async () => {
        await axios.get( url + `/promotion-service/rate-discount/seller/${sellerId}/week`,{headers : sellerHeaders})
        .then(function (resp) {
            setNumberInfo(resp.data.result.data);
        }).catch(function (error) {
            console.log(error);
        })
    }

    useEffect(()=>{
        getCalculateExpectMount();
    },[]);

    return(    
        <SellerInfoBox titleName={titleName} 
            numberInfo={numberInfo}
            unit={unit}
            >
        </SellerInfoBox>
    )
}