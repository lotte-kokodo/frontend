import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductDetailNavBar from '../../../Components/Product/ProductDetailNavBar';
import ProductDetailInfo from '../../../Components/Product/ProductDetailInfo';
import Review from '../../../Components/Product/Review';

import "./productDetail.css";

function ProductDetail() {

    let { productId } = useParams(null);

    console.log(productId);


    return (
        <div>
            <div id="productDetailInfo">
            <ProductDetailInfo></ProductDetailInfo>
            </div>
            <div id="productDetailNavBar">
            <ProductDetailNavBar></ProductDetailNavBar>
            </div>
        </div>
    )

}

export default ProductDetail;