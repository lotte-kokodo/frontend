import React, {useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import {ServerConfigContext} from "../../../../context/serverConfigProvider"

import "../css/signup.css";

function Signup(props) {
    const [inputId, setInputId] = useState("");
    const [idCheck, setIdCheck] = useState(false);
    const [inputPw, setInputPw] = useState("");
    const [inputName, setInputName] = useState(props.name ? props.name : "");
    const [inputEmail, setInputEmail] = useState(props.email ? props.email : "");
    const [inputBirth, setInputBirth] = useState(props.birthday ? props.birthday : "");
    const [inputPhone, setInputPhone] = useState(props.phone ? props.phone : "");
    const [inputAddr, setInputAddr] = useState(props.address ? props.address : "");
    const { url } = useContext(ServerConfigContext);
    

    /*daum address*/
    const [openPostcode, setOpenPostcode] = useState(false);

    /*daum handle*/
    const handle = {
        // 버튼 클릭 이벤트
        clickButton: () => {
            setOpenPostcode(current => !current);
        },

        // 주소 선택 이벤트
        selectAddress: (data) => {
            console.log(`
                주소: ${data.address},
                우편번호: ${data.zonecode}
            `)
            setOpenPostcode(false);
            setInputAddr(data.address + " " + data.zonecode);
        },
    }

    const handleInputId = (e) => {
        setInputId(e.target.value);
    }

    const checkId = () => {
        if (inputId === null || inputId.trim() === "" || inputId.length < 6) {
            alert('아이디는 6자 이상이여야 합니다.');
        } else {
            fetchCheckId(inputId);
        }
    }

    const history = useNavigate();

    const handleInputPw = (e) => {
        setInputPw(e.target.value);
    }
    const handleInputName = (e) => {
        setInputName(e.target.value);
    }
    const handleInputEmail = (e) => {
        setInputEmail(e.target.value);
    }
    const handleInputBirth = (e) => {
        setInputBirth(e.target.value);
    }
    const handleInputPhone = (e) => {
        setInputPhone(e.target.value);
    }

    const signUpSuc = () => {
        if (inputId === null || inputId.trim() === "" || inputId.length < 6) {
            alert('아이디는 6자 이상이여야 합니다.');
        } else if (idCheck === false) {
            alert('아이디체크를 해야합니다.');
        } else if (inputPw === null || inputPw.trim() === "" || inputPw.length < 6) {
            alert('패스워드는 6자 이상이여야 합니다.');
        } else if (inputName === null || inputName.trim() === "" || inputName.length < 2) {
            alert('이름은 두글자 이상이여야 합니다.');
        } else if (inputEmail === null || inputEmail.trim() === "" || !inputEmail.includes('@') || inputEmail.length < 3) {
            alert('이메일은 @ 포함하고 3글자 이상이여야 합니다');
        } else if (inputBirth === null || inputBirth.trim() === "") {
            alert("생년월일을 입력하세요.");
        } else if (inputPhone === null || inputPhone.trim() === "") {
            alert("핸드폰번호 예시 010-xxxx-xxxx");
        } else if(!(inputPhone.substring(0,3) === "010" && inputPhone.length === 13)) {
            alert("핸드폰번호 예시 010-xxxx-xxxx");
        } else if (inputAddr === null || inputAddr.trim() === "") {
            alert("주소를 입력하세요.");
        } else {
            const params = { "loginId": inputId, "name": inputName, "email": inputEmail, "password": inputPw, "birthday": inputBirth, "phoneNumber": inputPhone, "address": inputAddr, "grade": "ACE" };
            fetchSignUp(params)
        }
    };

    const fetchCheckId = async (id) => {
        await axios({
            method: "get",
            url: url + "/member-service/member/signup/" + id
        })
            .then((response) => {
                if (response.data.result.data === "아이디 중복이 아닙니다.") {
                    setIdCheck(true);
                    alert("해당 아이디는 사용 가능합니다.");
                } else {
                    setIdCheck(false);
                    alert("해당 아아디는 중복입니다.");
                }
            })
            .catch((error) => console.log(error))
            .finally(() => { });
    }

    const fetchSignUp = async (params) => {
        await axios({
            method: "post",
            url: url + "/member-service/member/signup",
            data : params
        })
            .then(function (response) {
                if (response.data.success) {
                    alert("회원 가입에 성공하셨습니다.");
                    history('/login');
                } else {
                    alert("회원 가입에 실패하셨습니다.");
                }
            })
            .catch(function (error) {
                alert("회원 가입에 실패하셨습니다.");
                console.log(error);
            })
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>회원가입</h3>
                    </div>
                    {openPostcode ?
                        <div>
                            {openPostcode && 
                                <DaumPostcode 
                                    onComplete={handle.selectAddress}  // 값을 선택할 경우 실행되는 이벤트
                                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                                    defaultQuery='서초대로74길 33' // 팝업을 열때 기본적으로 입력되는 검색어 
                                />}
                        </div>
                    :
                        <div className="card-body">
                            <div className="input-group form-group">
                                <span className='inputText'>아이디  </span>
                                <input type="text" className="form-control" name='input_id' value={inputId} onChange={handleInputId} />
                                <button className="btn idcheck-right" onClick={checkId}>아이디체크 </button>
                            </div>

                            <div className="input-group form-group">
                                <span className='inputText'>비밀번호  </span>
                                <input type="password" className="form-control form-pw" name='input_pw' value={inputPw} onChange={handleInputPw} />
                            </div>

                            <div className="input-group form-group">
                                <span className='inputText'>이름  </span>
                                <input type="text" className="form-control form-name" name='input_name' value={inputName} onChange={handleInputName} />
                            </div>

                            <div className="input-group form-group">
                                <span className='inputText'>이메일  </span>
                                <input type="email" className="form-control form-email" name='input_email' value={inputEmail} onChange={handleInputEmail} />
                            </div>

                            <div className="input-group form-group">
                                <span className='inputText'>생년월일  </span>
                                <input type="date" className="form-control form-birth" name='input_birth' value={inputBirth} onChange={handleInputBirth} />
                            </div>

                            <div className="input-group form-group">
                                <span className='inputText'>전화번호  </span>
                                <input type="text" className="form-control form-phone" name='input_phone' value={inputPhone} onChange={handleInputPhone} />
                            </div>

                            <div className="input-group form-group">
                                <span className='inputText'>주소  </span>
                                <button className="form-control form-addr" name='input_addr' onClick={handle.clickButton} >{inputAddr}</button>
                            </div>

                            <div className="login-group">
                                <div className="form-group">
                                    <button className="btn float-right login_btn" onClick={signUpSuc}>회원가입하기 </button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Signup;