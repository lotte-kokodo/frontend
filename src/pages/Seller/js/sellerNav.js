import React, { useState} from 'react';
import "../css/sellerNav.css"

function SellerNav() {
    const [isListHover, setIsListHover] = useState(false);
    const [isListHover1, setIsListHover1] = useState(false);
    const [isListHover2, setIsListHover2] = useState(false);
    const [isListHover3, setIsListHover3] = useState(false);


    return(
        <div>
            <div className="seller-nav-container">
                <div 
                onMouseOver={() => {
                        setIsListHover(true);
                    }
                }
                onMouseOut={() => setIsListHover(false)}
                className="seller-nav-total1">

                    <img className="seller-nav-icon" alt="producct" src="img/seller/product.png"/>
                    <strong className="seller-nav-title">상품 관리</strong>
                    {isListHover ?
                    <div className="seller-hover-parent">
                        <div className="seller-hover-child">상품 등록</div>
                        <div className="seller-hover-child">상품 일괄 등록</div>
                        <div className="seller-hover-child">상품 조회/수정</div>
                        <div className="seller-hover-child">상품 알림</div>
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
                    <img className="seller-nav-icon" alt="order" src="img/seller/order.png"/>
                    <strong className="seller-nav-title">주문/배송</strong>
                    {isListHover1 ?
                    <div className="seller-hover-parent">
                        <div className="seller-hover-child">배송 관리</div>
                        <div className="seller-hover-child">반품 관리</div>
                        <div className="seller-hover-child">교환 관리</div>
                        <div className="seller-hover-child">주문 조회</div>
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
                    <img className="seller-nav-icon" alt="calculation" src="img/seller/calculation.png"/>
                    <strong className="seller-nav-title">정산</strong>
                    {isListHover2 ?
                    <div className="seller-hover-parent">
                        <div className="seller-hover-child">정산 현황</div>
                        <div className="seller-hover-child">매출 내역</div>
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
                    <img className="seller-nav-icon" alt="promotion" src="img/seller/promotion.png"/>
                    <strong className="seller-nav-title">프로모션</strong>
                    {isListHover3 ?
                    <div className="seller-hover-parent">
                        <div className="seller-hover-child">할인쿠폰 관리</div>
                        <div className="seller-hover-child">할인상품 조회</div>
                    </div>
                    :
                    <div></div>
                    }
                </div>
            </div>
        </div>
    )
}

export default SellerNav;

//성은 짱짱
//성은 최고