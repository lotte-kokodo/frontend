import SellerChart from "../../../../components/seller/SellerDashboard/sellerchart";
import React from "react";
import "../css/sellerHome.css"
import "../../../../components/seller/css/sellerInfoBox.css"
import SellerInfoBox from "../../../../components/seller/SellerDashboard/sellerInfoBox";
import SellerTodayOrder from "../../../../components/seller/SellerDashboard/sellerTodayOrder";
import SellerExpectCalculate from "../../../../components/seller/SellerDashboard/sellerExpectCalculate";
import SellerStockInfo from "../../../../components/seller/SellerDashboard/sellerStockInfo";
import SellerApplyCouponPolicy from "../../../../components/seller/SellerDashboard/sellerApplyCouponPrice";
import SellerApplyPolicy from "../../../../components/seller/SellerDashboard/sellerApplyPolicy";
import SellerArCoupon from "../../../../components/seller/SellerDashboard/sellerArCoupon";

function SellerHome(){

    return (
        <div className="sellerhom-out-layout l-margin">
            <div className="sellerhome-first-layout">
                <div className="seller-info-box-outline-layout">
                    <SellerTodayOrder></SellerTodayOrder>
                    <SellerExpectCalculate></SellerExpectCalculate>
                    <SellerStockInfo></SellerStockInfo>
                </div>
            </div>
            <div className="sellerhome-second-layout">
                <div className="seller-info-box-outline-layout">
                    <SellerApplyCouponPolicy></SellerApplyCouponPolicy>
                    <SellerApplyPolicy></SellerApplyPolicy>
                    <SellerArCoupon></SellerArCoupon>
                </div>
            </div>
            <div className="sellerhome-third-layout">
                {/*<div>*/}
                <div className="sellerhome-chart-out-layout">
                    <SellerChart></SellerChart>
                </div>
                {/*</div>*/}
            </div>
        </div>
    )
}
export default SellerHome;

