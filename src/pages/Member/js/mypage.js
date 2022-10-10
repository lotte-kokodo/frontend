import React, { useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";

import '../css/mypage.css'

function Mypage() {
    const [name,setName] = useState('');
    const history = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') === null || localStorage.getItem('token') === ""){
            alert("로그인 후 이용이 가능합니다.");
            history("/login");
        }else{
            fetchMypage();
        }
    },[history]);

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

    return(
        <div className='mypage'>
            <div className='mypageTop'>
                <div className='mypage-top-left'>
                    <div className='mypage-top-left-profile'>
                        <button className='mypage-top-button'>
                            <img className='mypage-top-left-profile-image' alt="profile" src="img/mypage/mypage-top-left-profile.png" />
                        </button>
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
                        <button className='mypage-top-button'>
                            <div className='mypage-top-right-coupon-one'>나의 쿠폰 {'>'}</div>
                            <div className='mypage-top-right-coupon-two'>{'('}쿠폰 수{')'} 개</div>
                        </button>
                    </div>
                    <div className='mypage-top-right-inquire'>
                        <button className='mypage-top-button'>
                            <div className='mypage-top-right-inquire-one'>문의 내역 {'>'}</div>
                            <div className='mypage-top-right-inquire-two'>{'('}문의 수{')'} 개</div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mypage-nav">
                <ul className='mypage-nav-ul'>
                    <button><li>주문 내역</li></button>
                    <button><li>리뷰 내역</li></button>
                </ul>
            </div>

            <div className="mypage-main">
                {/* 각자 데이터 뿌려주기 구현*/}
            </div>
        </div>
    )

}

export default Mypage;