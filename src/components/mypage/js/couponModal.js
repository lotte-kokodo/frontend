import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
import '../css/couponModal.css';

export default function CouponModal(props) {

    const [couponList, setCouponList] = useState([]);

    const convertDate = (day)=>{
        let endDate = new Date(day);

        console.log(endDate);
        let year = endDate.getFullYear();
        let month = endDate.getMonth()+1;
        let date = endDate.getDate();

        let str = year+"."+month+"."+date;
        
        return str;
    }

    const featchCouponData =  async () => {

        console.log(localStorage.getItem('memberId'));
        await axios({
            method: "get",
            url: "http://localhost:8001/promotion-service/userCoupon",
            headers: {
                'memberId': localStorage.getItem('memberId')
            }
        }) 
            .then(function (resp) {
                setCouponList(resp.data.result.data);
                console.log(resp.data.result.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    useEffect(() => {
        featchCouponData();
    },[]);

    return (
        <div className="mypage-coupon-modal-container">
            <div style={{display:"flex"}}>
                <h3 className="coupon-product-title">나의 쿠폰 보기</h3>

                <button onClick={props.onModalDisplay} style={{marginLeft:"680px"}} >X</button>
            </div>
            <div className="mypage-coupon-container" >
            <div data-v-10ba636e="" data-v-6e428e76="" className="couponGroup">
                <ul data-v-10ba636e="" className="couponUseEvent">


                {
                    couponList.map( function(object, i){ 
                        if(object.fixCoupon === null )
                            return (
                            
                            <li data-v-10ba636e="" className="fresh" >
                                <div data-v-10ba636e="" className="product" >
                                    <div data-v-10ba636e="" className="txt" >
                                    <p data-v-10ba636e="" className="mainTxt">{object.rateCoupon.name}</p>
                                    <span data-v-10ba636e="" className="percent">{object.rateCoupon.rate}<em data-v-10ba636e="">%</em>
                                        <em data-v-10ba636e="" className="flag">할인쿠폰</em>
                                    </span><div data-v-10ba636e="" className="discountInfo">
                                <span data-v-10ba636e="">{object.rateCoupon.minPrice}원 이상 구매시</span>
                                <span data-v-10ba636e=""></span>
                                <span data-v-10ba636e=""> (~ {convertDate(object.rateCoupon.endDate)}) 까지</span>
                                </div>
                                <div data-v-10ba636e="" className="couponsubText"></div>
                                </div>
                                <div data-v-10ba636e="" className="down">
                                    <div data-v-10ba636e="" className="couponImg">
                                        <span data-v-10ba636e="">
                                            <em data-v-10ba636e="" className="hiddenTxt">계열사 로고</em>
                                        </span>
                                    </div>
                                    <p data-v-10ba636e="" className="couponNum"></p>
                                </div>
                                </div>
                            </li>
                        )
                        else if(object.rateCoupon === null)
                                return(
                            <li data-v-10ba636e="" className="fresh" >
                                <div data-v-10ba636e="" className="product">
                                    <div data-v-10ba636e="" className="txt">
                                    <p data-v-10ba636e="" className="mainTxt">{object.fixCoupon.name}</p>
                                    <span data-v-10ba636e="" className="percent">{object.fixCoupon.price}<em data-v-10ba636e="">원</em>
                                        <em data-v-10ba636e="" className="flag">무료배송쿠폰</em>
                                    </span><div data-v-10ba636e="" className="discountInfo">
                                <span data-v-10ba636e="">{object.fixCoupon.minPrice}원 이상 구매시</span>
                                <span data-v-10ba636e=""></span>
                                <span data-v-10ba636e=""> (~ {convertDate(object.fixCoupon.endDate)}) 까지</span>
                                </div>
                                <div data-v-10ba636e="" className="couponsubText"></div>
                                </div>
                                <div data-v-10ba636e="" className="down">
                                    <div data-v-10ba636e="" className="couponImg">
                                        <span data-v-10ba636e="">
                                            <em data-v-10ba636e="" className="hiddenTxt">계열사 로고</em>
                                        </span>
                                    </div>
                                    <p data-v-10ba636e="" className="couponNum"></p>
                                </div>
                                </div>
                            </li>
                                )


                    })
                }

                    
        </ul>
        <div data-v-10ba636e="" className="btnArea"></div></div>

        </div>
        </div>
    )

}