import SellerInfoBox from "./sellerInfoBox";
import {AuthContext} from '../../../context/authProvider';
import  { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { ServerConfigContext } from "../../../context/serverConfigProvider";
import React from "react";
import axios from 'axios';
import {Link} from "react-router-dom"

export default function SellerApplyCouponPolicy(){

    const { url } = useContext(ServerConfigContext);
    const [numberInfo, setNumberInfo]=useState('');
    const sellerId = localStorage.getItem("sellerId");


    const couponData= async () => {
        console.log("response>>>>");
        await axios({
            method: "get",
            url: url + "/promotion-service/userCoupon/dashboard",
            headers: {sellerId : 1}
        })
        .then(function (resp) {
            console.log(resp.data.result.data);
            setNumberInfo(resp.data.result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    
        useEffect(() => {
            couponData();
        }, []);
    

    return(
        // <Link to={`/seller/${sellerId}/promotion/coupon`} style={{textDecoration: "none", height: 10}}>
            <SellerInfoBox updownFlag={"0"} numberInfo={numberInfo} titleName="주간 Best 쿠폰"></SellerInfoBox>
        // </Link>
    )
}