import { useParams } from "react-router-dom";

import ProductDetailNavBar from '../../../../components/product/js/productDetailNavBar';
import ProductDetailInfo from '../../../../components/product/js/productDetailInfo';

import "../css/productDetail.css";
import {useEffect} from "react";

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