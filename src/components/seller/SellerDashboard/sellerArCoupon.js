import SellerInfoBox from "./sellerInfoBox";
import React, {useContext, useState, useEffect} from "react";
import axios from "axios";
import {ServerConfigContext} from "../../../context/serverConfigProvider"
import {AuthContext} from "../../../context/authProvider"

export default function SellerArCoupon(){
    const { url } = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);
    const sellerId = localStorage.getItem("sellerId");

    let titleName = "셀러 상품 등록 수"
    let unit = "건"
    const [numberInfo, setNumberInfo] = useState("0");

    const findByProductTotal = async () => {
        await axios({
            method: "get",
            url: url + `/seller-service/product/count/${sellerId}`,
            headers: sellerHeaders
        }) 
        .then(function(response){
            console.log(response);
            setNumberInfo(response.data.result.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    useEffect(()=>{
        findByProductTotal();
    },[]);

    return(
        // <Link to={`/seller/${sellerId}/productSearch`} style={{textDecoration: "none", height: 150}}>
            <SellerInfoBox titleName={titleName} updownFlag={"0"} numberInfo={numberInfo} unit={unit} />
        // </Link>
    )
}