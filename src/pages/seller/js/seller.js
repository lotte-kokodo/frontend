import React from "react"
import {Routes, Route} from "react-router-dom"

import SellerHeader from "./sellerHeader"
import SellerNav from "./sellerNav"
import SellerHome from "./sellerHome"

import SellerProductRegister from "./sellerProductRegister"
import CalculatePresent from "../../calculate/js/calculate"

function Seller() {
    return(
        <div>
            <SellerHeader />
            <hr className="headerBottom-hr"></hr>
            <SellerNav />

            <main>
                <Routes>
                    <Route path="/" element={<SellerHome />}></Route>

                    <Route path="/sellerProductRegister" element={<SellerProductRegister />}></Route>
                    <Route path="/calculate" element={<CalculatePresent />}></Route>

                </Routes>
            </main>
        </div>
    )
}

export default Seller;