import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductDetailNavBar from '../../../../components/product/js/ProductDetailNavBar';
import ProductDetailInfo from '../../../../components/product/js/ProductDetailInfo';

import "../css/productDetail.css";

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