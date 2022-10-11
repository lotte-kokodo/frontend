import React from "react"
import {Routes, Route} from "react-router-dom"

import Header from './header'
import Nav from './nav'
import Home from "./home"

import Login from "../../Member/js/login"
import Signup from "../../Member/js/signup"
import Mypage from "../../Member/js/mypage"
import MypageRead from "../../Member/js/mypageRead"

import Category from '../../Product/js/category'
import Search from "../../Product/js/search"


import "../css/header.css"

function Client() {
    return(
        <div>
            <Header />
            <hr className="headerBottom-hr"></hr>
            <Nav />

            <main>
                <div>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>

                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/mypage" element={<Mypage />}></Route>
                        <Route path="/mypageRead" element={<MypageRead />}></Route>

                        <Route path='/search' element={<Search />}></Route>
                        <Route path="/category" element={<Category />}></Route>
                    </Routes>
                </div>
            </main>

            <footer>
            </footer>
        </div>
    )
}

export default Client;