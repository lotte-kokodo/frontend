import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom";
import {useCookies} from 'react-cookie';
import {ServerConfigContext} from "../../../../context/serverConfigProvider"
import logo from "../../../../src_assets/main/footer_logo.png";

import "../css/login.css";

function SellerLogin() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [bCheked,setChecked] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
    const navigate = useNavigate();
    const { url } = useContext(ServerConfigContext);

    useEffect(() => {
        if(cookies.sellerRememberId !== undefined) {
            setInputId(cookies.sellerRememberId);
            setChecked(true);
        }
    },[cookies.rememberId]);

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const checkHandler = () => {
        setChecked(!bCheked)
    }

    const onClickLogin = () => {
        const params = {"loginId":inputId,"password":inputPw};
        fetchLogin(params);
    }

    const fetchLogin = async (params) => {
        await axios({
            method: "post",
            url: url + "/seller-service/login",
            data : params
        })
        .then(function(response){
            const data = response.data;

            localStorage.setItem("sellerId", data.sellerId);
            localStorage.setItem("sellerAccessToken", data.accessToken);
            localStorage.setItem("sellerRefreshToken", data.refreshToken);

            if(bCheked){
                setCookie('sellerRememberId', inputId, {maxAge: 2000});
            } else{
                removeCookie('sellerRememberId');
            }

            alert("로그인 성공했습니다.");
            navigate(`/seller/${data.sellerId}`);
            window.location.reload();
        })
        .catch(function(error){
            alert("아이디와 비밀번호를 확인하세요.");
            console.log(error);
        })
    }

    return(
        <>
            <div className="row justify-content-center">
                <img src={logo} className="seller-logo-img"></img>
            </div>
            <div className="row justify-content-center">
                <span className="headerCenter-logo seller-logo-span">KOKODO SELLER</span>
            </div>
            <div className="row justify-content-center">
                <div className="card seller-login-card-div">
                    <div className="card-body">
                        <div className="seller-login-card-div">
                            <h3>로그인</h3><br/>

                            <form method='post'>
                                <div className="input-group form-group">
                                    <input type="text" className="form-control" name='input_login_id' value={inputId} onChange={handleInputId} placeholder="아이디" />

                                </div>
                                <div className="input-group form-group">
                                    <input type="password" className="form-control" name='input_login_pw' value={inputPw} onChange={handleInputPw} placeholder="비밀번호" autoComplete="on" />
                                </div>
                                <div className="form-check idCheck">
                                    <input className="form-check-input" type="checkbox" id="flexCheckChecked" checked={bCheked} onChange={checkHandler}/>
                                    <label className="form-check-label" >아이디 저장</label>
                                </div>
                            </form>
                            <div className="login-group">
                                <button className="btn float-right login_btn" onClick={onClickLogin} >로그인하기 </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerLogin;
