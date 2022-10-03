import React from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import Login from "./Components/Member/login"
import Signup from "./Components/Member/signup"
import LoginKakao from './Components/Member/loginKakao';
import NaverLogin from './Components/Member/NaverLogin';

function App() {
  return (
    <div>

      <header>
        <div><br /><br /></div>
      </header>

      <BrowserRouter>
            <nav className="navbar navbar-expand-md navbar-dark bg-info sticky-top">
              <div className="container">
                <div className="collapse navbar-collapse" id="navbar-content">
                  <ul className="navbar-nav mr-auto"> 
                    <li className="nav-item">
                      <Link className="nav-link" to="/">홈</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/login">로그인</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/signup">회원가입</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

        <main>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>
            <Route path="/loginKakao" element={<LoginKakao />}></Route>
            <Route path="/NaverLogin" element={<NaverLogin />}></Route>
          </Routes>
        </div>
        </main>
      </BrowserRouter>
        
      <footer>
      </footer>
    </div>
  );
}

function Home(){

  return (
    <div>
      <div className="container text-center">
          <h2> React </h2>
      </div>
    </div>
  )
}

export default App;
