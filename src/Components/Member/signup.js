import React, { useState } from "react"
import axios from "axios";
import {useNavigate } from "react-router-dom";

import "./login.css";

function Signup(){
    const [id , setId] = useState("");
    const [idck, setidck] = useState(false);
    const [pw , setPw] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const chId = (e) => { setId(e.target.value)};
    const chPw = (e) => { setPw(e.target.value)};
    const chName = (e) => { setName(e.target.value)};
    const chEmail = (e) => { setEmail(e.target.value)};

    const history = useNavigate();

    const fetchData = async (id) => {
        await axios.post("http://localhost:3000/getId",null , { params:{ "id":id} } )
        .then(function(resp){
            if(resp.data==="NO"){
             alert('해당 아이디는 사용중 입니다. 다시 작성하세요');
             setId("");
            } else if(resp.data==="OK"){
             alert('해당 아이디는 없습니다. 회원가입을 진행하세요');
             document.getElementById("idcheck").innerHTML = "Success";
             setidck(true);
             document.getElementById("id").readOnly = true;
            }
         })
         .catch(function(error){
             console.log(error);
         })
    }

    const fetchData2 = async (id,pwd,name,email) => {
        await axios.post("http://localhost:3000/account",null , { params:{ "id":id,"pwd":pwd,"name":name,"email":email} } )
        .then(function(resp){
            if(resp.data==="NO"){
             alert('회원가입에 실패했습니다. 다시 확인해주세요.');
             setId("");
            } else if(resp.data==="OK"){
             alert('회원가입에 성공했습니다. 다시 로그인해주세요');
             history('/login');
            }
         })
         .catch(function(error){
             console.log(error);
         })
    }

    const checkId = () => {
        if(id === null || id.trim() === "" || id.length < 6){
            alert('아이디는 6자 이상이여야 합니다.');
        }else{
            fetchData(id);
        }
    }

    const signUpSuc = () => {
        if(id === null || id.trim() === "" || id.length < 6){
            alert('아이디는 6자 이상이여야 합니다.');
        }
        else if(idck===false){
            alert('id 검사하세요.');
        }
        else if(pw === null || pw.trim() === "" || pw.length < 6){
            alert('패스워드는 6자 이상이여야 합니다.');
        }
        else if(name === null || name.trim() === "" || name.length < 2){
            alert('이름은 두글자 이상이여야 합니다.');
        }
        else if(email === null || email.trim() === "" || !email.includes('@') || email.length<3){
            alert('이메일은 @ 포함하고 3글자 이상이여야 합니다');
        }else{
            fetchData2(id,pw,name,email);
        }
    };


    return(
        <div className="container">
            <div className="d-flex justify-content-center h-100">
                <div className="card">
                    <div className="card-header">
                        <h3>회원가입</h3>
                    </div>
                    <div className="card-body">
                        <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                </div>
                                <input type="text" className="form-control" id="id" name="id" value={id} onChange={chId} placeholder="id" />
                                    <div className="d-flex justify-content-center links">
                                    <input type="button" id="idBtn" value="IdCheck" onClick={checkId} />&nbsp;<span id="idcheck"></span>
                                    </div>
                                
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-key"></i></span>
                                </div>
                                <input type="password" className="form-control" name="pwd" value={pw} onChange={chPw} placeholder="password" />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-award"></i></span>
                                </div>
                                <input type="text" className="form-control" name="name" size="20" value={name} onChange={chName} placeholder="name" />
                            </div>
                            <div className="input-group form-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                </div>
                                <input type="email" className="form-control" name="email" value={email} onChange={chEmail} placeholder="email" />
                            </div>
                            <div className="form-group">
                                <button className="btn float-right login_btn" onClick={signUpSuc}>회원가입 </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;