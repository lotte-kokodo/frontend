import React from "react"
import {Routes, Route, useParams} from "react-router-dom"

import SellerHeader from "./sellerHeader"
import SellerNav from "./sellerNav"
import SellerHome from "./sellerHome"
import SellerProductRegister from "../../product/js/sellerProductRegister"
import ProductNotice from "../../product/js/productNotice"
import ProductSearch from "../../product/js/productSearch"

import CalculatePresent from "../../calculate/js/calculate"
import SaleList from "../../calculate/js/saleList"

import DiscountPolicyManagement from "../../promotion/js/discountPolicyManagement"
import CouponManagement from '../../promotion/js/couponManagement'

import ServerConfigProvider from "../../../../context/serverConfigProvider";
import SellerLogin from "../../seller/js/sellerLogin";

function Seller() {
    const sellerId = localStorage.getItem("sellerId");

    const sellerLogin = () => {
      return (
          <>
            <main>
              <Routes>
                <Route path="/" element={<SellerLogin />}></Route>
              </Routes>
            </main>
          </>
      );
    }

    const seller = () => {
      return (
          <>
            <SellerHeader />
            <hr className="headerBottom-hr"></hr>
            <SellerNav />

            <main>
              <Routes>
                <Route path={`/${sellerId}`} element={<SellerHome />}></Route>

                {/* Seller Product */}
                <Route path="/sellerProductRegister" element={<SellerProductRegister />}></Route>
                <Route path="/productNotice" element={<ProductNotice />}></Route>
                <Route path="/productSearch" element={<ProductSearch />}></Route>

                {/* Seller Calculate */}
                <Route path="/calculateList" element={<CalculatePresent />}></Route>
                <Route path="/saleList" element={<SaleList />}></Route>

                {/* Seller Promotion */}
                <Route path="/discountPolicyManagement" element={<DiscountPolicyManagement />}></Route>
                <Route path="/promotion/coupon" element={<CouponManagement />}></Route>
              </Routes>
            </main>
          </>
      );
    }

    return(
        <div>
            <ServerConfigProvider>

              {
                sellerId ? seller() : sellerLogin()
              }
            </ServerConfigProvider>
        </div>
    );
}

export default Seller;