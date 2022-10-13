import React from "react"
import {Routes, Route} from "react-router-dom"

import Header from './header'
import Nav from './nav'
import Home from "./home"

import Login from "../../member/js/login"
import Signup from "../../member/js/signup"
import Mypage from "../../member/js/mypage"
import MypageRead from "../../member/js/mypageRead"

import Category from '../../product/js/category'
import Search from "../../product/js/search"


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

                        {/* member */}
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/signup" element={<Signup />}></Route>
                        <Route path="/mypage" element={<Mypage />}></Route>
                        <Route path="/mypageRead" element={<MypageRead />}></Route>

                        {/* main - category */}
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