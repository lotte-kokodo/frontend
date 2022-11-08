import SellerChart from "../../../../components/seller/sellerchart";
import styled from 'styled-components';
import { Line } from 'react-chartjs-2';
import React, {useState} from "react";
import "../css/sellerHome.css"
function SellerHome(){

    return (
        <div className="sellerhom-out-layout l-margin">
            <div className="sellerhome-first-layout">
                test
            </div>
            <div className="sellerhome-second-layout">
            </div>
            <div className="sellerhome-third-layout">
                <SellerChart></SellerChart>
            </div>
        </div>
    )
}
export default SellerHome;
