import { useParams } from "react-router-dom";
import {useState, useEffect, useContext} from "react";

import ProductDetailNavBar from '../../../../components/product/js/productDetailNavBar';
import ProductDetailInfo from '../../../../components/product/js/productDetailInfo';

import "../css/productDetail.css";

function ProductDetail() {
    let { productId } = useParams(null);

    const [detailFlag, setDetailFlag] = useState("IMG");

    function changeDetailTemplate(){
        setDetailFlag('TEMPLATE');
    }
    return (
        <div>
            <div id="productDetailInfo">
            <ProductDetailInfo  template={changeDetailTemplate}></ProductDetailInfo>
            </div>
            <div id="productDetailNavBar">
            <ProductDetailNavBar detailFlag={detailFlag}></ProductDetailNavBar>
            </div>
        </div>
    )

}

export default ProductDetail;