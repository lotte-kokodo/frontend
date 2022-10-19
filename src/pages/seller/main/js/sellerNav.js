import React, { useState} from 'react';
import {Link, useParams} from "react-router-dom"

import "../css/sellerNav.css"

import product from '../../../../src_assets/seller/nav/product.png'
import order from '../../../../src_assets/seller/nav/order.png'
import calculation from '../../../../src_assets/seller/nav/calculation.png'
import promotion from '../../../../src_assets/seller/nav/promotion.png'

function SellerNav() {
    const [isListHover, setIsListHover] = useState(false);
    const [isListHover1, setIsListHover1] = useState(false);
    const [isListHover2, setIsListHover2] = useState(false);
    const [isListHover3, setIsListHover3] = useState(false);
    const params = useParams();

    return(
        <div className="seller-nav-container">
            <div 
            onMouseOver={() => {
                    setIsListHover(true);
                }
            }
            onMouseOut={() => setIsListHover(false)}
            className="seller-nav-total1">

                <img className="seller-nav-icon" alt="producct" src={product}/>
                <strong className="seller-nav-title">상품 관리</strong>
                {isListHover ?
                <div className="seller-hover-parent">
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/sellerProductRegister`}>상품 등록</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}`}>상품 일괄 등록</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/productSearch`}>상품 조회/수정</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/productNotice`}>상품 알림</Link></div>
                </div>
                :
                <div></div>
                }
            </div>

            <div 
            onMouseOver={() => {
                setIsListHover1(true);
                }
            }
            onMouseOut={() => setIsListHover1(false)}
            className="seller-nav-total1">
                <img className="seller-nav-icon" alt="order" src={order}/>
                <strong className="seller-nav-title">주문/배송</strong>
                {isListHover1 ?
                <div className="seller-hover-parent">
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}`}>배송 관리</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}`}>반품 관리</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}`}>교환 관리</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}`}>주문 조회</Link></div>
                </div>
                :
                <div></div>
                }
            </div>

            <div 
            onMouseOver={() => {
                setIsListHover2(true);
                }
            }
            onMouseOut={() => setIsListHover2(false)}
            className="seller-nav-total2">
                <img className="seller-nav-icon" alt="calculation" src={calculation}/>
                <strong className="seller-nav-title">정산</strong>
                {isListHover2 ?
                <div className="seller-hover-parent">
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/calculateList`}>정산 현황</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/saleList`}>매출 내역</Link></div>
                </div>
                :
                <div></div>
                }
            </div>

            <div 
            onMouseOver={() => {
                setIsListHover3(true);
                }
            }
            onMouseOut={() => setIsListHover3(false)}
            className="seller-nav-total2">
                <img className="seller-nav-icon" alt="promotion" src={promotion}/>
                <strong className="seller-nav-title">프로모션</strong>
                {isListHover3 ?
                <div className="seller-hover-parent">
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/discountPolicyManagement`}>할인정책 관리</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}`}>할인상품 조회</Link></div>
                    <div className="seller-hover-child"><Link to={`/seller/${params.sellerId}/promotion/coupon`}>할인 쿠폰 관리</Link></div>
                </div>
                :
                <div></div>
                }
            </div>
        </div>
    )
}

export default SellerNav;