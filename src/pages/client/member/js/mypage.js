import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {NavLink,useNavigate } from "react-router-dom";

import profile from '../../../../src_assets/mypage/mypage-top-left-profile.png'
import star from '../../../../src_assets/mypage/star.png'

import '../css/mypage.css'

function Mypage() {
    const [name,setName] = useState('');
    const [reviewList,setReviewList] = useState([]);
    const history = useNavigate();

    const firstEnter = () => {
        if(localStorage.getItem('token') === null || localStorage.getItem('token') === ""){
            alert("로그인 후 이용이 가능합니다.");
            history("/login");
        }else{
            fetchMypage();
        }
    }

    const fetchMypage = async () => {
        await axios({
            method: "get",
            url: "http://localhost:8080/member/myPage/" + localStorage.getItem("memberId")
        })
        .then(function(response){
            setName(response.data.result.data.loginId);
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
    }

    const clickOrder = () => {
        setReviewList([]);
    }

    const clickCoupon = () => {
        setReviewList([]);
    }

    useEffect(() => {
        firstEnter();
    },[]);

    const fetchReview = async () => {
        await axios({
            method: "get",
            url: "http://localhost:9270/review/member",
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

    return(
        <div className='mypage'>
            <div className='mypageTop'>
                <div className='mypage-top-left'>
                    <div className='mypage-top-left-profile'>
                        <div className='mypage-top-button'>
                            <img className='mypage-top-left-profile-image' alt="profile" src={profile} />
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

                <div className='mypage-top-center'>|</div>

                <div className='mypage-top-right'>
                    <div className='mypage-top-right-coupon'>
                        <button className='mypage-top-button' onClick={clickCoupon}>
                            <div className='mypage-top-right-coupon-one'>나의 쿠폰 {'>'}</div>
                            <div className='mypage-top-right-coupon-two'>{'('}쿠폰 수{')'} 개</div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mypage-nav">
                <ul className='mypage-nav-ul'>
                    <button onClick={clickOrder}><li>주문 내역</li></button>
                    <button onClick={clickReview}><li>리뷰 내역</li></button>
                </ul>
            </div>

            <div className="mypage-main">
                {/* 각자 데이터 뿌려주기 구현*/}
                    { 
                        reviewList.map( function(object, i){
                            return(
                                <ReviewListItem obj={object} key={i} cnt={i + 1} />
                            )
                        })
                    } 
            </div>
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
                <strong>{props.obj.displayName}</strong>
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