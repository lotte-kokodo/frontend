import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ProductDetailNavBar from '../../Components/product/ProductDetailNavBar';
import ProductDetailInfo from '../../Components/product/ProductDetailInfo';
import Review from '../../Components/product/Review';

function ProductDetail() {

    let { productId } = useParams(null);

    console.log(productId);


    return (
        <div>
            <ProductDetailInfo></ProductDetailInfo>
            <br/>
            <br/>
            <ProductDetailNavBar></ProductDetailNavBar>
            <br/>
            <Review></Review>
            <br/>

            <br/>
        </div>
    )

}

export default ProductDetail;