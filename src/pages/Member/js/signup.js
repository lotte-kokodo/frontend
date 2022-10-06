
import React, { useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "../css/signup.css";

function Signup(){
    const [inputId, setInputId] = useState('');
    const [inputPw, setInputPw] = useState('');
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputBirth, setInputBirth] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [inputAddr, setInputAddr] = useState('');


    const handleInputId = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPw = (e) => {
        setInputId(e.target.value);
    }
    const handleInputName = (e) => {
        setInputId(e.target.value);
    }
    const handleInputEmail = (e) => {
        setInputId(e.target.value);
    }
    const handleInputBirth = (e) => {
        setInputId(e.target.value);
    }
    const handleInputPhone = (e) => {
        setInputId(e.target.value);
    }
    const handleInputAddr = (e) => {
        setInputId(e.target.value);
    }
    


    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>회원가입</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group">
                                    <span className='inputText'>아이디  </span>
                                    <input type="text" className="form-control" name='input_id' value={inputId} onChange={handleInputId} />                                      <button className="btn idcheck-right">아이디체크 </button>
                            </div>

                            <div className="input-group form-group">
                                    <span className='inputText'>비밀번호  </span>
                                    <input type="text" className="form-control form-pw" name='input_pw' value={inputPw} onChange={handleInputPw} />  
                            </div>

                            <div className="input-group form-group">
                                    <span className='inputText'>이름  </span>
                                    <input type="text" className="form-control form-name" name='input_name' value={inputName} onChange={handleInputName} />  
                            </div>

                            <div className="input-group form-group">
                                    <span className='inputText'>이메일  </span>
                                    <input type="text" className="form-control form-email" name='input_email' value={inputEmail} onChange={handleInputEmail} />  
                            </div>

                            <div className="input-group form-group">
                                    <span className='inputText'>생년월일  </span>
                                    <input type="text" className="form-control form-birth" name='input_birth' value={inputBirth} onChange={handleInputBirth} />  
                            </div>

                            <div className="input-group form-group">
                                    <span className='inputText'>전화번호  </span>
                                    <input type="text" className="form-control form-phone" name='input_phone' value={inputPhone} onChange={handleInputPhone} />  
                            </div>

                            <div className="input-group form-group">
                                    <span className='inputText'>주소  </span>
                                    <input type="text" className="form-control form-addr" name='input_addr' value={inputAddr} onChange={handleInputAddr} />  
                            </div>

                            <div className="login-group">
                                <div className="form-group">
                                    <button className="btn float-right login_btn">회원가입하기 </button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;