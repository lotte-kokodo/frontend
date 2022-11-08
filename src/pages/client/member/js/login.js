import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {ServerConfigContext} from "../../../../context/serverConfigProvider"

import "../css/login.css";

function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [bCheked,setChecked] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
    const history = useNavigate();
    const { url } = useContext(ServerConfigContext);

    useEffect(() => {
        if(cookies.rememberId !== undefined) {
            setInputId(cookies.rememberId);
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

    const onClickKakao = () => {}
    const onClickNaver = () => {}

    const fetchLogin = async (params) => {
        await axios({
            method: "post",
            url: url + "/member-service/login",
            data : params
        })
        .then(function(response){
            localStorage.setItem("memberId",response.headers.memberid);
            localStorage.setItem("token",response.headers.token);

            if(localStorage.getItem("token") !== null || localStorage.getItem("token") !== ""){
                
                if(bCheked){
                    setCookie('rememberId', inputId, {maxAge: 2000});
                } else{
                    removeCookie('rememberId');
                }

                alert("로그인에 성공했습니다.");
                history("/");
                window.location.reload();
            }else {
                alert("로그인에 실패했습니다. 관리자에게 문의하세요.");
            }
         })
         .catch(function(error){
            alert("아이디와 비밀번호를 확인하세요.");
            console.log(error);
         })
    }

    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>로그인</h3>
                        {/* <div className="d-flex justify-content-end social_icon">
                            <span><i className="fab fa-facebook-square"></i></span>
                            <span><i className="fab fa-google-plus-square"></i></span>
                            <span><i className="fab fa-twitter-square"></i></span>
                        </div> */}
                    </div>
                    <div className="card-body">
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
                            <div className="form-group">
                                <button className="btn float-right login_btn" onClick={onClickLogin} >로그인하기 </button>
                            </div>
                            <div className="form-group">
                                <button className="btn float-right kakao" onClick={onClickKakao} >카카오로 시작하기 </button>
                            </div>
                            <div className="form-group">
                                <button className="btn float-right naver" onClick={onClickNaver} >네이버로 시작하기 </button>                                
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center links">
                            <Link to="/signup">회원가입</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;
