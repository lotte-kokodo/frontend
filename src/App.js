import React, {useEffect, useState} from "react"
import {BrowserRouter, Link, Routes, Route} from "react-router-dom"

import ProductDetail from "./Components/product/ProductDetail"
import Login from "./pages/Member/js/login"
import Signup from "./pages/Member/js/signup"
import Mypage from "./pages/Member/js/mypage"

import Home from "./pages/Main/js/home"

import "./pages/Main/css/header.css"


function App() {
  const [inputIdHomeInput, setInputHomeInput] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token') === null || localStorage.getItem('token') === ""){
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [isLogin]);

  const onLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('memberId');
    setIsLogin(false);
    alert("로그아웃 됐습니다.");
  }

  const handleHomeInput = (e) => {
    setInputHomeInput(e.target.value);
  }

  const onClicktotalSearch = () => {

  }
  
  return (
    <div>

      <BrowserRouter>
        <header className="header">

          <div className="headerTop">
              {isLogin ?
                <ul className="headerTopUl">
                  <li className="header-item">
                    <Link className="header-item-link" to="/">입점신청</Link>
                  </li>
                  <li className="header-item">
                    <Link className="header-item-link" onClick={onLogout} to="/">로그아웃</Link>
                  </li>
                </ul>
                :
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
              }
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
              <Link to="/mypage">
                <img className="headerCenter-mypageCart-home" alt="mypage" src="img/top/headerCenter-mypageCart-home.png" />
              </Link>
              <Link to="/">
                <img className="headerCenter-mypageCart-cart" alt="cart" src="img/top/headerCenter-mypageCart-cart.png" />
              </Link>
            </div>
          </div>

        </header>

        <hr className="headerBottom-hr"></hr>

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
              <Route path="/mypage" element={<Mypage />}></Route>
              <Route path="/product/detail/:productId" element={<ProductDetail />}></Route>
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
