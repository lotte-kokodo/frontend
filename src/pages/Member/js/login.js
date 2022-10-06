import React, { useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "../css/login.css";

function Login() {
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    
    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }

    const onClickLogin = () => {
        fetchData(inputId,inputPw);
    }

    const onClickKakao = () => {
        
    }

    const onClickNaver = () => {
        naverData();
    }

    const naverData = async () => {
        await axios.post("http://localhost:9001/user-service/oauth2/authorization/naver",null)
        .then(function(){
            console.log("naver");
         })
         .catch(function(error){
            console.log(error);
         })
    }
    

    const fetchData = async (id,pwd) => {
        await axios.post("http://localhost:9001/user-service/login",null ,{ params:{ "id":id, "pwd":pwd} } )
        .then(function(resp){
            if(resp.data.id === undefined){
                alert('입력하신 id가 일치하지 않습니다.');
            } else if(resp.data.id === null){
                alert('입력하신 비밀번호가 일치하지 않습니다.');
            } else{
                alert('로그인 됐습니다.');
                localStorage.setItem('user_id', inputId);
                window.location.reload(); // 새로고침
            }
         })
         .catch(function(error){
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
                        <form>
                            <div className="input-group form-group">
                                <input type="text" className="form-control" name='input_id' value={inputId} onChange={handleInputId} placeholder="아이디" />
                                
                            </div>
                            <div className="input-group form-group">
                                <input type="password" className="form-control" name='input_pw' value={inputPw} onChange={handleInputPw} placeholder="비밀번호" />
                            </div>
                            <div className="form-check idCheck">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" />
                                <label className="form-check-label">아이디 저장</label>
                            </div>
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
                        </form>
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
