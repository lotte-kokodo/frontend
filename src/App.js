import React, { useState } from "react"
import { BrowserRouter, Link, Routes, Route } from "react-router-dom"


import AuthProvider from "./Context/AuthProvider"

import Login from "./pages/Member/js/login"
import Signup from "./pages/Member/js/signup"

import Cart from "./Components/Cart/Cart"
import OrderSheet from "./Components/Order/OrderSheet"

import "./Components/Frame/css/header.css"
import HttpHeadersProvider from "./Context/HttpHeadersProvider"


function App() {
  const [inputIdHomeInput, setInputHomeInput] = useState('');
  const headers = {
    'Content-Type': 'application/json'
  }

  const handleHomeInput = (e) => {
    setInputHomeInput(e.target.value);
  }

  const onClicktotalSearch = () => {

  }

  const onClickMypage = () => {

  }

  const onClickCart = () => {

  }

  return (
    <div>

      <BrowserRouter>
        <header className="header">

          <div className="headerTop">
            <ul className="headerTopUl">
              <li className="header-item">
                <Link className="header-item-link" to="/">입점신청</Link>
              </li>
              <li className="header-item">
                <Link className="header-item-link" to="/signup">회원가입</Link>
              </li>
              <li className="header-item">
                <Link className="header-item-link" to="/login">로그인</Link>
              </li>
            </ul>
          </div>

          <div className="headerCenter">
            <div className="headerCenter-logo">
              <Link to="/">KOKODO</Link></div>
            <div className="headerCenter-search">
              <input type="text" className="headerCenter-mypageCart-home-input" name='input_id' value={inputIdHomeInput} onChange={handleHomeInput} />
              <div className="headerCenter-search-overlap">
                <button onClick={onClicktotalSearch}>
                  <img className="headerCenter-search-search" alt="search" src="img/top/headerCenter-search.png" />
                </button>
              </div>
            </div>
            <div className="headerCenter-mypageCart">
              <Link to="/">
                <img className="headerCenter-mypageCart-home" alt="home" src="img/top/headerCenter-mypageCart-home.png" />
              </Link>
              <Link to="/">
                <img className="headerCenter-mypageCart-cart" alt="cart" src="img/top/headerCenter-mypageCart-cart.png" />
              </Link>
            </div>
          </div>

        </header>

        <hr className="headerBottom-hr"></hr>

        <HttpHeadersProvider>
          <AuthProvider>
            <nav className="nav">
              <div className="navContainer">
                <div className="navContainer-category">
                  <button>
                    <div className="navContainer-category-overlap">
                      <div>
                        <img className="headerCenter-category-line" alt="nav-line" src="img/top/navContainer-category-Line.png" />
                      </div>
                      <div>
                        <img className="headerCenter-category-line" alt="nav-line" src="img/top/navContainer-category-Line.png" />
                      </div>
                      <div>
                        <img className="headerCenter-category-line" alt="nav-line" src="img/top/navContainer-category-Line.png" />
                      </div>
                    </div>
                    <img className="navContainer-category-Rectangle" alt="nav-rec" src="img/top/navContainer-category-Rectangle.png" />
                  </button>
                </div>

                <div className="navContainer-subject">
                  <ul className="navContainer-subject-ul">
                    <Link to="/">
                      <li>베스트</li>
                    </Link>
                    <Link to="/">
                      <li>특가</li>
                    </Link>
                    <Link to="/">
                      <li>프로모션</li>
                    </Link>
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

                  <Route path="/cart" element={<Cart />}></Route>
                  <Route path="/ordersheet" element={<OrderSheet />}></Route>
                </Routes>
              </div>

            </main>
          </AuthProvider>
        </HttpHeadersProvider>
      </BrowserRouter>

      <footer>
      </footer>
    </div>
  );
}

function Home() {

  return (
    <div>
      <div className="container text-center">
        <h2></h2>
      </div>
    </div>
  )
}

export default App;
