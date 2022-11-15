import SellerInfoBox from "./sellerInfoBox";
import {AuthContext} from '../../../context/authProvider';

import axios from 'axios';
import  { useState, useRef, useEffect } from 'react';
import { useContext } from "react";

import { ServerConfigContext } from "../../../context/serverConfigProvider";

import React from "react";

export default function SellerApplyCouponPolicy(){

    const { sellerHeaders } = useContext(AuthContext);
    const { url } = useContext(ServerConfigContext);
    const [couponTitle, setCouponTitle]=useState('');
    
    useEffect(()=>{
        const fetchData = async () => {
                console.log("wwww");
            await axios({
                method: 'get',
                url: url + `/promotion-service/userCoupon/dashboard`,
                headers: sellerHeaders
            })
              .then(function (resp) {
                console.log(resp);
                setCouponTitle(resp.data.result.data);
    
                })
                .catch(function (error) {
                        console.log(error);
                    })

        }

        fetchData();
    },[]);

    return(
        <SellerInfoBox numberInfo={couponTitle} titleName="주간 Best 쿠폰"></SellerInfoBox>
    )
}