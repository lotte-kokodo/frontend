import React, {useContext, useEffect ,useState} from 'react';
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import DaumPostcode from 'react-daum-postcode';
import {ServerConfigContext} from "../../../../context/serverConfigProvider"

import "../css/signup.css";

function MypageRead(){
    const id = localStorage.getItem("memberId");
    const [inputId, setInputId] = useState("");
    const [inputPw, setInputPw] = useState("");
    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputBirth, setInputBirth] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddr, setInputAddr] = useState("");
    const [inputGrade, setInputGrade]= useState("");
    const [profileImageUrl, setInputProfileImageUrl]= useState("");
    const history = useNavigate();
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

    useEffect(() => {
        fetchMypage();
    },[]);

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

    const updateMypage = () => {
        if(inputPw === null || inputPw.trim() === "" || inputPw.length < 6){
            alert('패스워드는 6자 이상이여야 합니다.');
        } else if(inputName === null || inputName.trim() === "" || inputName.length < 2){
            alert('이름은 두글자 이상이여야 합니다.');
        } else if (inputEmail === null || inputEmail.trim() === "" || !inputEmail.includes('@') || inputEmail.length < 3) {
            alert('이메일은 @ 포함하고 3글자 이상이여야 합니다');
        } else if (inputBirth === null || inputBirth.trim() === "") {
            alert("생년월일을 입력하세요.");
        } else if (inputPhone === null || inputPhone.trim() === "") {
            alert("핸드폰번호 예시 010-xxxx-xxxx");
        } else if (inputPhone === null || inputPhone.trim() === "") {
            alert("핸드폰번호 예시 010-xxxx-xxxx");
        } else if(!(inputPhone.substring(0,3) === "010" && inputPhone.length === 13)) {
            alert("핸드폰번호 예시 010-xxxx-xxxx");
        } else if (inputAddr === null || inputAddr.trim() === "") {
            alert("주소를 입력하세요.");
        } else {
            const params = {"id":id,"loginId":inputId, "name":inputName, "email":inputEmail, "password":inputPw, "birthday":inputBirth, "profileImageUrl":profileImageUrl, "phoneNumber":inputPhone, "address":inputAddr, "grade":inputGrade};
            fetchUpdateMypage(params)
        }
    };

    
    const fetchMypage = async () => {
        await axios({
            method: "get",
            url: url + "/member-service/member/myPage/" + localStorage.getItem("memberId")
        })
        .then(function(response){
            setInputId(response.data.result.data.loginId);
            setInputName(response.data.result.data.name);
            setInputEmail(response.data.result.data.email);
            setInputBirth(response.data.result.data.birthday);
            setInputProfileImageUrl(response.data.result.data.profileImageUrl)
            setInputPhone(response.data.result.data.phoneNumber);
            setInputAddr(response.data.result.data.address);
            setInputGrade(response.data.result.data.grade);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const fetchUpdateMypage = async (params) => {
        await axios({
            method: "post",
            url: url + "/member-service/member/myPage",
            data : params
        })
        .then(function(response){
            if(response.data.result.data === "success") {
                alert("회원 수정에 성공하셨습니다.");
                history('/mypage');
            }else{
                alert("회원 수정에 실패하셨습니다.");
            }
         })
         .catch(function(error){
            alert("회원 수정에 실패하셨습니다.");
            console.log(error);
         })
    }


    return(
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
                                <input type="text" className="form-control" name='input_update_id' value={inputId} readOnly/>
                        </div>

                        <div className="input-group form-group">
                                <span className='inputText'>비밀번호  </span>
                                <input type="password" className="form-control form-pw" name='input_update_pw' value={inputPw} onChange={handleInputPw} />  
                        </div>

                        <div className="input-group form-group">
                                <span className='inputText'>이름  </span>
                                <input type="text" className="form-control form-name" name='input_update_name' value={inputName} onChange={handleInputName} />  
                        </div>

                        <div className="input-group form-group">
                                <span className='inputText'>이메일  </span>
                                <input type="email" className="form-control form-email" name='input_update_email' value={inputEmail} onChange={handleInputEmail} />  
                        </div>

                        <div className="input-group form-group">
                                <span className='inputText'>생년월일  </span>
                                <input type="date" className="form-control form-birth" name='input_update_birth' value={inputBirth} onChange={handleInputBirth} />  
                        </div>

                        <div className="input-group form-group">
                                <span className='inputText'>전화번호  </span>
                                <input type="text" className="form-control form-phone" name='input_update_phone' value={inputPhone} onChange={handleInputPhone} />  
                        </div>

                        <div className="input-group form-group">
                                <span className='inputText'>주소  </span>
                                <button className="form-control form-addr" name='input_addr' onClick={handle.clickButton} >{inputAddr}</button>
                        </div>

                        <div className="login-group">
                            <div className="form-group">
                                <button className="btn float-right login_btn" onClick={updateMypage}>회원수정 </button>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default MypageRead;