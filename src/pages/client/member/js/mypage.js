import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink,useNavigate } from "react-router-dom";

import profile from '../../../../src_assets/seller/default_profile.png'
import star from '../../../../src_assets/mypage/star.png'
import OrderList from '../../order/js/orderList'

import '../css/mypage.css'
import {AuthContext} from "../../../../context/authProvider";
import CouponModal from '../../../../components/mypage/js/couponModal';
import {ServerConfigContext} from "../../../../context/serverConfigProvider"

function Mypage() {
    const [name,setName] = useState('');
    const [profileImageUrl, setProfileImageUrl] = useState('');
    const [reviewList,setReviewList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const history = useNavigate();
    const {headers} = useContext(AuthContext);
    const [couponFlag, setCouponFlag] = useState(false);
    const [couponCount, setCouponCount] = useState(0);
    const { url } = useContext(ServerConfigContext);

    const firstEnter = () => {
        if(localStorage.getItem('accessToken') === null || localStorage.getItem('accessToken') === ""){
            alert("로그인 후 이용이 가능합니다.");
            history("/login");
        }else{
            fetchMypage();
        }
    }

    const fetchMypage = async () => {
        await axios({
            method: "get",
            url: url + "/member-service/member/myPage/" + localStorage.getItem("memberId")
        })
        .then(function(response){
            const data = response.data.result.data;
            setName(data.name);
            setProfileImageUrl(data.profileImageUrl);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const haldleMypage = () => {
        history("/mypageRead");
    }

    const clickReview = () => {
        fetchReview();
        setOrderList([]);
    }

    const clickOrder = () => {
        fetchOrder();
        setReviewList([]);
        // setReviewList([]);
    }

    const clickCoupon = () => {
        setReviewList([]);
    }

    const openCouponModal = ()=>{
        setCouponFlag(true);
        console.log(couponFlag);
    }

    const closeCouponModal = ()=>{
        setCouponFlag(false);
    }

    useEffect(() => {
        firstEnter();
        fetchCouponCount();
        // fetchOrder();
        // fetchReview();
    },[]);

    const fetchReview = async () => {
        await axios({
            method: "get",
            url: url + "/member-service/member/mypage/review",
            headers: {
                'memberId': localStorage.getItem('memberId')
            }
        }) 
        .then(function(response){
            console.log(response.data.result.data);
            setReviewList(response.data.result.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const fetchOrder = async() => {
        const id = localStorage.getItem("memberId");

        console.log(id);
        await axios({
            method: "get",
            url: url + `/order-payment-service/orders/${id}`,
            headers: headers
        }) 
        .then(function(response){
            console.log("결과값!");
            console.log(response);

            setOrderList(response.data.result.data);
        })
        .catch(function(error){
            console.log(error);
        })
    }

    const fetchCouponCount = async() => {
        const id = localStorage.getItem("memberId");

        await axios({
            method: "get",
            url: url + "/promotion-service/userCoupon/count",
            headers: {
                'memberId': localStorage.getItem('memberId')
            }
        }) 
        .then(function(response){
            console.log(response);
            setCouponCount(response.data.result.data);

        })
        .catch(function(error){
            console.log(error);
        })
    }

    return(
        <div className='mypage'>
            <div className='mypageTop'>
                <div className='mypage-top-left'>
                    <div className='mypage-top-left-profile'>
                        <div className='mypage-top-button'>
                            {
                                !profileImageUrl ?
                                    <img className='mypage-top-left-profile-image' alt="profile" src={profile} />
                                :
                                    <img className='mypage-top-left-profile-image mypage-profile-img' alt="profile" src={profileImageUrl} />
                            }
                        </div>
                    </div>
                    <div className='mypage-top-left-writing'>
                        <div className='mypage-top-left-profile-ment'>
                            쇼핑하기 좋은 날 이에요!
                        </div>
                        <div className='mypage-top-left-profile-name'>
                            <button className='mypage-top-button' onClick={haldleMypage}>
                                <strong>{name}</strong> 님 {'>'}
                            </button>
                        </div>
                    </div>
                </div>

                <div className='mypage-top-center'></div>

                <div className='mypage-top-right'>
                    <div className='mypage-top-right-coupon'>
                        <button className='mypage-top-button' onClick={openCouponModal}>
                            <div className='mypage-top-right-coupon-one'>나의 쿠폰 {'>'}</div>
                            <div className='mypage-top-right-coupon-two'>{couponCount} 개</div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mypage-nav">
                <ul className='mypage-nav-ul'>
                    <button onClick={() => {clickOrder()}}><li>주문 내역</li></button>
                    <button onClick={() => {clickReview()}}><li>리뷰 내역</li></button>
                </ul>
            </div>
            
            <div className="mypage-main">
                {/* 각자 데이터 뿌려주기 구현*/}
                    {
                        orderList.map( function(object) {
                            return (
                                <OrderList obj={object} />
                            )
                        })
                    }
                    { 
                        reviewList.map( function(object, i){
                            return(
                                <ReviewListItem obj={object} key={i} cnt={i + 1} />
                            )
                        })
                    } 
            </div>

            {couponFlag && <CouponModal onModalDisplay={closeCouponModal}></CouponModal>}
        </div>
    )

}

function ReviewListItem(props) {
    
    return(
        <NavLink to={`/product/detail/${props.obj.memberId}`} className='product-div'>
            <div className='product-thumbnail'>
                <img className='product-thumbnail-img' alt='new-product' src={props.obj.thumbnail} />
            </div>
            <div className='product-displayName'>
                <span>{props.obj.displayName}</span>
                <div className='mypage-review'>
                    <div>
                        {props.obj.createdDate} 
                    </div>
                    <div>
                        <span>평점 <img className='myreviews-stars' alt="star" src={star} /></span> 
                        <span>{props.obj.rating}</span>
                    </div>
                </div>
            </div>
        </NavLink>
        
    )
}

export default Mypage;