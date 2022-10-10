import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import Login from "./pages/Member/js/login"
import Signup from "./pages/Member/js/signup"
import Mypage from "./pages/Member/js/mypage"
import MypageRead from "./pages/Member/js/mypageRead"

import Header from './pages/Main/js/header'
import Nav from './pages/Main/js/nav'
import Home from "./pages/Main/js/home"

import Category from './pages/Product/js/category'
import Search from "./pages/Product/js/search"

import "./pages/Main/css/header.css"



function App() {
  
  return (
    <div>
      <BrowserRouter>
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
      </BrowserRouter>
        
      <footer>
      </footer>
    </div>
  );
}

export default App;
