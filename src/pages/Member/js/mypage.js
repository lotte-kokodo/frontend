import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Mypage() {
    const history = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token') === null || localStorage.getItem('token') === ""){
            alert("로그인 후 이용이 가능합니다.");
            history("/login");
        }
    },[]);
}

export default Mypage;