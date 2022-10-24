import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../css/productDetailNavBar.css";
import Review from "./review";
import DetailImage from "./detailImage";

// const st1 = { transitionDuration: "300ms" }
// const st2 = { width: "480px", opacity: "1", transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
// const st3 = { transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
// const st4 = { width: "88px", marginRight: "10px" }

export default function ProductDetailNavBar() {

    // let { productId } = useParams(null);

    const [checked, setChecked]=useState(false);
    const getDetailImage = () =>{
        setChecked(false);
    }

    const getReviews = () => {
        setChecked(true);
    }

    return (

        <div>
        <div data-area="product_stickytab" className="stickyTab vue-affix affix-top" style={{}}></div>
            <div className="scrollTab full">
                <div className="scrollTabInner">
                    <ul className="scrollTabWrapper">
                        <li className="targetTab" data-ant-status="observed">
                            <a onClick={getDetailImage}>
                                <strong>상세정보</strong>
                            </a>
                        </li>
                        <li className="targetTab" data-ant-status="observed">
                            <a onClick={getReviews}>
                                <strong>리뷰</strong>
                            </a>
                        </li>
                        
                    </ul>
                </div>
                    {
                        checked==false? <DetailImage></DetailImage> : <Review></Review>
                    }
                    
            </div>

        </div>
    )
}