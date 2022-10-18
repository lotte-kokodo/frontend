import React from "react"
import {Routes, Route, useParams} from "react-router-dom"

import SellerHeader from "./sellerHeader"
import SellerNav from "./sellerNav"
import SellerHome from "./sellerHome"

import SellerProductRegister from "../../product/js/sellerProductRegister"
import ProductNotice from "../../product/js/productNotice"
import ProductSearch from "../../product/js/productSearch"

import CalculatePresent from "../../calculate/js/calculate"

import DiscountPolicyManagement from "../../promotion/js/discountPolicyManagement"
import CouponManagement from "../../promotion/js/couponManagement"

function Seller() {
    const params = useParams();

    return(
        <div>
            <SellerHeader />
            <hr className="headerBottom-hr"></hr>
            <SellerNav />

            <main>
                <Routes>
                    <Route path="/" element={<SellerHome />}></Route>

                    {/* Seller Product */}
                    <Route path="/sellerProductRegister" element={<SellerProductRegister />}></Route>
                    <Route path="/productNotice" element={<ProductNotice />}></Route>
                    <Route path="/productSearch" element={<ProductSearch />}></Route>

                    {/* Seller Calculate */}
                    <Route path="/calculate" element={<CalculatePresent />}></Route>

                    {/* Seller Promotion */}
                    <Route path="/discountPolicyManagement" element={<DiscountPolicyManagement />}></Route>
                    <Route path="/promotion/coupon" element={<CouponManagement />}></Route>

                </Routes>
            </main>
        </div>
    )
}

export default Seller;