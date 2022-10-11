import React from "react"
import {Routes, Route} from "react-router-dom"

import SellerHeader from "./sellerHeader"
import SellerNav from "./sellerNav"

function Seller() {
    return(
        <div>
            <SellerHeader />
            <hr className="headerBottom-hr"></hr>
            <SellerNav />

            <main>
                <div>
                    <Routes>
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default Seller;