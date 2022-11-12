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
    const sellerId = localStorage.getItem("sellerId");

    return(
        <div className="seller-nav-container">
            <div 
            
            className="seller-nav-total1">
                <div className="seller-nav-title">
                <img className="seller-nav-icon" alt="producct" src={product}/>
                
                <strong className="seller-nav-title">상품 관리</strong>
                </div>
                <div className="seller-hover-parent">
                    <div className='seller-nav-child-hover'>
                        <div className="seller-hover-child">
                            <Link to={`/seller/${sellerId}/sellerProductRegister`} style={{textDecoration: "none", color: "#000"}}>
                                <div className='seller-hover-child-span'>상품 등록</div>
                            </Link>
                        </div>
                    </div>
                    <div className='seller-nav-child-hover'>
                        <div className="seller-hover-child">
                            <Link to={`/seller/${sellerId}/productSearch`} style={{textDecoration: "none", color: "#000"}}>
                                <div className='seller-hover-child-span'>상품 조회/수정</div>
                            </Link>
                        </div>
                    </div>
                    {/* <div className='seller-nav-child-hover'>
                    <div className="seller-hover-child"><Link to={`/seller/${sellerId}/productNotice`} style={{textDecoration: "none", color: "#000"}}>상품 알림</Link></div>
                    </div> */}
                </div>
               
            </div>

            {/* <div className="seller-nav-total1">
                <img className="seller-nav-icon" alt="order" src={order}/>
                <strong className="seller-nav-title">주문/배송</strong>
                <div className="seller-hover-parent">

                    <div className='seller-nav-child-hover'>
                        <div className="seller-hover-child">
                            <Link to={`/seller/${sellerId}`} style={{textDecoration: "none", color: "#000"}}>
                            <div className='seller-hover-child-span'>배송 관리</div></Link>
                        </div>
                    </div>
                
                    <div className='seller-nav-child-hover'>
                        <div className="seller-hover-child">
                            <Link to={`/seller/${sellerId}`} style={{textDecoration: "none", color: "#000"}}>
                                <div className='seller-hover-child-span'>반품 관리
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className='seller-nav-child-hover'>
                       <div className="seller-hover-child">
                            <Link to={`/seller/${sellerId}`} style={{textDecoration: "none", color: "#000"}}>
                                <div className='seller-hover-child-span'>교환 관리</div>
                            </Link>
                        </div>
                    </div>

                    <div className='seller-nav-child-hover'>
                        
                                <Link to={`/seller/${sellerId}`} style={{textDecoration: "none", color: "#000"}}>
                                <div className="seller-hover-child">주문 조회</div></Link>
                    </div>
                </div>
            </div> */}

            <div 
           
            className="seller-nav-total1">
                <img className="seller-nav-icon" alt="calculation" src={calculation}/>
                <strong className="seller-nav-title">정산</strong>
                <div className="seller-hover-parent">

                <div className='seller-nav-child-hover'>
                        <Link to={`/seller/${sellerId}/calculateList`} style={{textDecoration: "none", color: "#000"}}>
                        <div className="seller-hover-child">정산 현황</div></Link>
                </div>
                <div className='seller-nav-child-hover'>
                    <Link to={`/seller/${sellerId}/saleList`} style={{textDecoration: "none", color: "#000"}}>
                    <div className="seller-hover-child">
                        매출 내역
                        </div></Link>
                    </div>
                </div>
            </div>

            <div 
          
            className="seller-nav-total1">
                <img className="seller-nav-icon" alt="promotion" src={promotion}/>
                <strong className="seller-nav-title">프로모션</strong>
                <div className="seller-hover-parent">
                    <div className="seller-nav-child-hover">
                        
                        <Link to={`/seller/${sellerId}/discountPolicyManagement`} style={{textDecoration: "none", color: "#000"}}>
                        <div className="seller-hover-child">할인정책 관리</div></Link>
                    </div>
                    <div className="seller-nav-child-hover">
                        <Link to={`/seller/${sellerId}`} style={{textDecoration: "none", color: "#000"}}>
                            <div className="seller-hover-child">할인상품 조회</div>
                        </Link>
                    </div>
                    <div className="seller-nav-child-hover">
                        <Link to={`/seller/${sellerId}/promotion/coupon`} style={{textDecoration: "none", color: "#000"}}>
                        <div className="seller-hover-child">할인 쿠폰 관리</div></Link></div>
                </div>
            </div>
        </div>
    )
}

export default SellerNav;