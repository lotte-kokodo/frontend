import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductDetailNavBar from '../../Components/product/ProductDetailNavBar';
import ProductDetailInfo from '../../Components/product/ProductDetailInfo';
import Review from '../../Components/product/Review';

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