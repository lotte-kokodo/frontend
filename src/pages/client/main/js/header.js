import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

import cart from '../../../../src_assets/top/headerCenter-mypageCart-cart.png'
import home from '../../../../src_assets/top/headerCenter-mypageCart-home.png'
import search from '../../../../src_assets/top/headerCenter-search.png'

function Header() {

    const [inputIdHomeInput, setInputHomeInput] = useState('');
    const [isLogin, setIsLogin] = useState(false);
    const history = useNavigate();
  
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
        setInputHomeInput('');
        history('/search', {
          state: {
            word: inputIdHomeInput
          }
        })
      }
      

    return (
        <div>
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
                            <img className="headerCenter-search-search" alt="search" src={search} />
                        </button>
                        </div>
                    </div>
                    <div className="headerCenter-mypageCart">
                        <Link to="/mypage">
                          <img className="headerCenter-mypageCart-home" alt="mypage" src={home} />
                        </Link>
                        <Link to="/">
                          <img className="headerCenter-mypageCart-cart" alt="cart" src={cart} />
                        </Link>
                    </div>
                </div>

            </header>
        </div>
    )
}

export default Header;