import SellerInfoBox from "./sellerInfoBox";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {ServerConfigContext} from "../../../context/serverConfigProvider"
import {AuthContext} from "../../../context/authProvider"

export default function SellerStockInfo(){
    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);
    const sellerId = localStorage.getItem("sellerId");

    let titleName = "재고 위험 상품 수"
    let unit = "건"
    const [numberInfo, setNumberInfo] = useState("");

    const findByProductStockLack = async () => {
        await axios({
            method: "get",
            url: url + `/seller-service/product/stock/${sellerId}/1`,
            headers: sellerHeaders
        }) 
        .then(function(response){
            setNumberInfo(response.data.totalCount);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=>{
        findByProductStockLack();
    },[]);

    return(
        <SellerInfoBox titleName={titleName} numberInfo={numberInfo} unit={unit}></SellerInfoBox>
    )
}