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
import AuthProvider from "../../../../context/authProvider";

function Seller() {
    const sellerId = localStorage.getItem("sellerId");
    console.log("sellerId" + sellerId);
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
            <ServerConfigProvider>
              <AuthProvider>
                <SellerHeader />
                <hr className="headerBottom-hr"></hr>
                <SellerNav />

                <main>
                  <Routes>
                    <Route path={`/${sellerId}`} element={<SellerHome />}></Route>

                    {/* Seller Product */}
                    <Route path={`/${sellerId}/sellerProductRegister`} element={<SellerProductRegister />}></Route>
                    <Route path={`/${sellerId}/productNotice`} element={<ProductNotice />}></Route>
                    <Route path={`/${sellerId}/productSearch`} element={<ProductSearch />}></Route>

                    {/* Seller Calculate */}
                    <Route path={`/${sellerId}/calculateList`} element={<CalculatePresent />}></Route>
                    <Route path={`/${sellerId}/saleList`} element={<SaleList />}></Route>

                    {/* Seller Promotion */}
                    <Route path={`${sellerId}/discountPolicyManagement`} element={<DiscountPolicyManagement />}></Route>
                    <Route path={`${sellerId}/promotion/coupon`} element={<CouponManagement />}></Route>
                  </Routes>
                </main>
                </AuthProvider>
            </ServerConfigProvider>
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