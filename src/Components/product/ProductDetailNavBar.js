import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./productDetailNavBar.css";

const st1 = { transitionDuration: "300ms" }
const st2 = { width: "480px", opacity: "1", transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
const st3 = { transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
const st4 = { width: "88px", marginRight: "10px" }



export default function ProductDetailNavBar() {


    return (

        <div>
        <div data-area="product_stickytab" className="stickyTab vue-affix affix-top" style={{}}></div>
            <div className="scrollTab full">
                <div className="scrollTabInner">
                    <ul className="scrollTabWrapper">
                        <li data-object="tab_type=detailtab" className="targetTab customActive" data-ant-status="observed">
                            <a>
                                <strong>상세정보</strong>{/**/}
                            </a>
                        </li>
                        <li data-object="tab_type=reviewtab&count=181" className="targetTab" data-ant-status="observed">
                            <a>
                                <strong>리뷰</strong>
                                <span className="count">(181)</span>
                            </a>
                        </li>
                        <li data-object="tab_type=qnatab&count=79" className="targetTab" data-ant-status="observed">
                            <a>
                                <strong>Q&amp;A</strong>
                                <span className="count">(79)</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

        </div>
    )
}