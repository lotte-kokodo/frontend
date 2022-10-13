import React from "react"
import {Routes, Route} from "react-router-dom"

import SellerHeader from "./sellerHeader"
import SellerNav from "./sellerNav"
import SellerHome from "./sellerHome"

import SellerProductRegister from "./sellerProductRegister"
import SellerProductTemplate from "./sellerProductTemplate"

function Seller() {
    return(
        <div>
            <SellerHeader />
            <hr className="headerBottom-hr"></hr>
            <SellerNav />

            <main>
                <Routes>
                    <Route path="/seller" element={<SellerHome />}></Route>
                    
                    <Route path="/sellerProductRegister" element={<SellerProductRegister />}></Route>
                    <Route path="/sellerProductTemplate" element={<SellerProductTemplate />}></Route>
                </Routes>
            </main>
        </div>
    )
}

export default Seller;