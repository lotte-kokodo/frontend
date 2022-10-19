import {useState, useEffect} from "react";

import SellerTitle from '../../../../components/seller/sellerTitle';
import CouponTable from '../../../../components/promotion/js/couponTable';

import "../css/couponManagement.css"

function CouponManagement() {

    return (
        <div className="board">
            <SellerTitle title="쿠폰 관리"></SellerTitle>
            <button className="origin-button">+  할인 쿠폰 만들기</button>

            <div className="">
                <CouponTable></CouponTable>

            </div>
        </div>
    )

}



export default CouponManagement;