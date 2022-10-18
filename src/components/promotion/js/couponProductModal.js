import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import '../css/couponProductModal.css';
import ProductTable from "./productTable"

export default function CouponProductModal(props) {

    const [productList, setProductList] = useState([]);
    const [couponName, setCouponName] = useState(props.name);



    return (
        <div className="coupon-modal-container">
            <div style={{display:"flex"}}>
            <h3 className="coupon-product-title">쿠폰 적용 상품</h3>
            <button onClick={props.onModalDisplay} style={{marginLeft:"550px"}} >X</button>
            </div>
            <div>
                <ProductTable name={couponName} onModalDisplay={props.onModalDisplay} couponFlag={props.couponFlag}></ProductTable>


            </div>
        </div>
    )

}