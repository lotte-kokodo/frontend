import React, {useEffect, useState} from "react"
import {Link, useNavigate} from "react-router-dom"

import "../css/header2.css"
import logo from "../../../../src_assets/top/kokodo_logo.png"
import mypage from "../../../../src_assets/top/mypage.png"
import cart from "../../../../src_assets/top/cart.png"
import search from "../../../../src_assets/top/search.png"
function Header2() {

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

    // 카테고리
    const category1 = () => {
        history('/category', {
            state: {
                seq: 1,
                name: "신상품"
            }
        })
    };

    const category2 = () => {
        history('/category', {
            state: {
                seq: 2,
                name: "닭가슴살"
            }
        })
    };

    const category3 = () => {
        history('/category', {
            state: {
                seq: 3,
                name: "도시락·볶음밥"
            }
        })
    };

    const category4 = () => {
        history('/category', {
            state: {
                seq: 4,
                name: "샐러드·과일"
            }
        })
    };

    const category5 = () => {
        history('/category', {
            state: {
                seq: 5,
                name: "즉석 간편식"
            }
        })
    };

    const category6 = () => {
        history('/category', {
            state: {
                seq: 6,
                name: "음료·차·프로틴"
            }
        })
    };

    const category7 = () => {
        history('/category', {
            state: {
                seq: 7,
                name: "계란·난백·콩"
            }
        })
    };

    const category8 = () => {
        history('/category', {
            state: {
                seq: 8,
                name: "소고기"
            }
        })
    };


    return (
        <div>
             <header id="header" className="header">
        {/* ## header,gnb :: include.header() 영역 */}
        <div className="header-inner">
         <a href="/"><img src={logo} style={{width:"150px", height:"150px"}}></img></a>
          <div className="util">
          {isLogin ?
            <ul>
            <li>
            <Link className="header-item-link" onClick={onLogout} to="/">LOGOUT</Link>
            </li>
            <li> | </li>
            <li><a href="/mypage/orderlist"> STORE </a></li>

          </ul>
          :
            <ul>
              <li>
              <Link className="header-item-link" to="/login">LOGIN</Link>
              </li>
              <li> | </li>
              <li>
                <Link className="header-item-link" to="/signup">SIGNUP</Link>
              </li>
              <li> | </li>
              <li><a href="/mypage/orderlist"> STORE </a></li>

            </ul>
        }

          </div>{/*// util */}
          <div className="header-search">
            <div className="top-search">
              <input type="search" className="input-search"  placeholder="kokodo 멤버스는 추가 할인" maxLength={100} value={inputIdHomeInput} onChange={handleHomeInput}/>
              <button type="button" className="btn-top-search" id="btnTopSearch" name="btnTopSearch" data-search-type="real" onClick={onClicktotalSearch}>
                <img src={search} style={{width:"20px",height:"20px"}}></img>
                <span className="blind">검색</span>
              </button>
            </div>
            <div className="search-layer">
              
              <div className="search-bottom">
                <div className="tit">
                  <h3>최근검색어</h3>
                  <button type="button" className="text-guide-sm search-del-btn" onclick="fnAllDelKeyword(this)" style={{display: 'none'}}><span>전체삭제</span></button>
                </div>
                <div className="latest-search">
                  {/* 검색어 있을 경우 */}
                  <ul className="srch-list" id="rankSearchArea">
                    <li id="srhItem" style={{display: 'none'}}>
                      <div className="srch-keyword">
                        <a href="javascript:;" className="txt" data-search-type="recent" onclick="fnBtnTopSearch(this)" />
                        <button type="button" className="btn-x-xs del-body" title onclick="fnDelKeyword(this)"><i className="ico-x-grey2 del-body" /><span className="blind del-body">삭제</span></button>
                      </div>
                    </li>
                  </ul>
                  {/*// 검색어 있을 경우 */}
                  {/* 검색어 없을 경우 */}
                  <div className="no-data" style={{}}>최근 검색어가 없습니다.</div>
                  {/*// 검색어 없을 경우 */}
                </div>{/*// latest-search */}
              </div>{/*// search-bottom */}
            </div>{/*// search-layer */}
          </div>{/*// header-search */}
          <div className="my-menu">
            <ul>
            <li className="user-service">
                <Link to="/mypage">
                <img src={mypage} style={{width:"40px",height:"50px"}}></img>
                </Link>
            </li>
            <li className="user-service">
                <Link to="/cart">
                <img src={cart} style={{width:"30px",height:"50px"}}></img>
                </Link>
            </li>
            </ul>
          </div>{/*// my-menu */}
        </div>
        {/*// header-inner */}
        <div className="gnb-wrap">
          <div className="inner">
            
            <nav id="gnb" className="gnb">
              <ul>
                <li onClick={category1}>
                  <a>
                    <span>신상품</span>
                  </a>
                </li>
                <li onClick={category2} >
                  <a>
                    <span>닭가슴살</span>
                  </a>
                </li>
                <li onClick={category3}>
                  <a>
                    <span>도시락·볶음밥</span>
                  </a>
                </li>
                <li onClick={category4}>
                  <a>
                    <span>샐러드·과일</span>
                  </a>
                </li>
                <li onClick={category5}>
                  <a>
                    <span>즉석간편식</span>
                  </a>
                </li>
                <li onClick={category6}>
                  <a>
                    <span>음로·프로틴</span>
                  </a>
                </li>
                <li onClick={category7}>
                  <a>
                    <span>음로·프로틴</span>
                  </a>
                </li><li onClick={category8}>
                  <a>
                    <span>소고기</span>
                  </a>
                </li>
                <li className>
                  <a href="/display/expressDeliveryList">
                    <em className="ico-txt-gnb" style={{backgroundImage: 'url("https://file.rankingdak.com/image/RANK/BANNER/GNB_ICON/20220330/IMG1648CEL614146730.png")'}}>
                      <span className="blind">특급배송</span>
                    </em>
                  </a>
                </li>
              </ul>
            </nav>{/*// gnb */}
          </div>{/*// inner */}
        </div>{/*// gnb-wrap */}
        <input type="hidden" name="eventCd" defaultValue />
        <input type="hidden" name="eventType" defaultValue />
        <input type="hidden" name="landingPage" defaultValue />
        <div id="evntFindWinPopUp" />
        {/*// ## header,gnb :: include.header() 영역 */}
      </header>
        </div>
    )
}

export default Header2;