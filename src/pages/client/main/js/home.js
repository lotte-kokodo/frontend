import React, {useEffect, useState, useRef} from "react"
import axios from 'axios';
import {NavLink,useNavigate } from "react-router-dom";

import left from '../../../../src_assets/main/left.png'
import right from '../../../../src_assets/main/right.png'
import timer from '../../../../src_assets/main/timer.png'

import "../css/main.css"

function Home() {
    // link용
    const history = useNavigate();

    // 배너
    const [slideState, setSlideState] = useState(0);
    const slideRef = useRef();
    const MAX_SLIDES = 4;

    const handleBannerRight =() => {
        if(slideState >= MAX_SLIDES) {
          setSlideState(0)
        } else {
          setSlideState(slideState + 1);
        }
      }

    const handleBannerLeft =()=> {
        if(slideState === 0) {
            setSlideState(MAX_SLIDES);
        }else {
            setSlideState(slideState - 1);
        }
    }

    useEffect(()=> {
        slideRef.current.style.transition ="all 0.5s ease-in-out";
        slideRef.current.style.transform= `translateX(-${slideState}00%)`;
      },[slideState]);

    useEffect(() => {
        const timeoutId = setTimeout(
          () => 
          setSlideState(slideState => {
            if(slideState < MAX_SLIDES) {
                return setSlideState(slideState + 1);
            } else {
                return setSlideState(0);
            }
          }), 3000  
        );
        return () => clearTimeout(timeoutId);
    });
    
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

    // 상품
    const [newState, setNewState] = useState([]);
    const [saleState, setSaleState] = useState([]);
    const [mdState, setMdState] = useState([]);

    const fetchNew = async () => {
        await axios({
        method: "get",
        url: "http://localhost:8001/product-service/product/main/new"
        })
        .then(function(response){
            setNewState(response.data.result.data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    const fetchSale = async () => {
        await axios({
        method: "get",
        url: "http://localhost:8001/product-service/product/main/sale"
        })
        .then(function(response){
            setSaleState(response.data.result.data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    
    const fetchMd = async () => {
        await axios({
        method: "get",
        url: "http://localhost:8001/product-service/product/main/seller"
        })
        .then(function(response){
            console.log(response.data.result.data);
            setMdState(response.data.result.data);
        })
        .catch(function(error){
            console.log(error)
        })
    }

    useEffect(() => {
        fetchNew();
        fetchSale();
        fetchMd();
    },[])

    return(
        <div>
            <div className="banner" >

                <div className="banner_buttonsLeft">
                    <button
                    onClick={handleBannerLeft}
                    >
                        <img className="banner-button-left" alt="cart" src={left} />
                    </button>
                </div>

                <div className="banner_buttonsRight">
                    <button
                    onClick={handleBannerRight}
                    > 
                        <img className="banner-button-right" alt="cart" src={right} />
                    </button>
                </div>

                <div className="banner_images" ref={slideRef}>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20221011/IMG1665uVR463652254.jpg"/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220902/IMG1662TWQ094834801.jpg"/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220930/IMG1664Kbq521622683.jpg"/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220902/IMG1662YEZ094822689.jpg"/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220916/IMG1663ZYA316795501.jpg"/>
                </div>

            </div>

            <div className='main-category-product'>
                <div className='main-category'>
                    <button className='main-category-div' onClick={category1}>
                        <img className='main-category-item' alt="신상품" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653WAC282333226.png"/>
                    </button>
                    <button className='main-category-div' onClick={category2}>
                        <img className='main-category-item' alt="닭가슴살" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653Sxk282370687.png"/>
                    </button>
                    <button className='main-category-div' onClick={category3}>
                        <img className='main-category-item' alt="도시락·볶음밥" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653QFH282812482.png"/>
                    </button>
                    <button className='main-category-div' onClick={category4}>
                        <img className='main-category-item' alt="샐러드·과일" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653bRc282853493.png"/>
                    </button>
                    <button className='main-category-div' onClick={category5}>
                        <img className='main-category-item' alt="즉석 간편식" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653yyQ282384594.png"/>
                    </button>
                    <button className='main-category-div' onClick={category6}>
                        <img className='main-category-item' alt="음료·차·프로틴" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653CzB282898866.png"/>
                    </button>
                    <button className='main-category-div' onClick={category7}>
                        <img className='main-category-item' alt="계란·난백·콩" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653vhR282906283.png"/>
                    </button>
                    <button className='main-category-div' onClick={category8}>
                        <img className='main-category-item' alt="소고기" src="https://file.rankingdak.com/image/RANK/BANNER/CATE_PC1_1/20220523/IMG1653GoW282835152.png"/>
                    </button>
                </div>

                <div className="main-product">
                    <div className="new-product" >
                        <h3 className='product-title'>이달의 신상품=☆</h3>
                        <div className='product-list'>
                            {newState &&
                                newState.map( function(object, i){
                                    return(
                                        <NewItem obj={object} key={i} cnt={i + 1} />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="sale-product" >
                        
                        <h3 className='product-title'>
                            <img className='timer' alt='timer' src={timer} />
                            지금 이순간 깜짝 타임세일!
                        </h3>

                        <div className='product-list'>
                            {saleState &&
                                saleState.map( function(object, i){
                                    return(
                                        <SaleItem obj={object} key={i} cnt={i + 1} />
                                    )
                                })
                            }
                        </div>

                    </div>

                    <div className="md-product" >
                        <h3 className='product-title'>MD's 추천 상품</h3>
                        <div className='product-list'>
                            {mdState &&
                                mdState.map( function(object, i){
                                    return(
                                        <MdItem obj={object} key={i} cnt={i + 1} />
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

function NewItem(props) {
    const priceChange = props.obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return(
        <NavLink to={`/productDetail/${props.obj.id}`} className='product-div'>
            <div className='product-thumbnail'>
                <img className='product-thumbnail-img' alt='new-product' src={props.obj.thumbnail} />
            </div>
            <div className='product-displayName'>
                <strong>{props.obj.displayName}</strong>
                <div className='product-price'>
                    {priceChange} 원
                </div>
            </div>
        </NavLink>
        
    )
}

function SaleItem(props) {
    const priceChange = props.obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return(
        <NavLink to={`/productDetail/${props.obj.id}`} className='product-div'>
            <div className='product-thumbnail'>
                <img className='product-thumbnail-img' alt='sale-product' src={props.obj.thumbnail} />
            </div>
            <div className='product-displayName'>
                <strong>{props.obj.displayName}</strong>
                <div className='product-price'>
                    {priceChange} 원
                </div>
            </div>
        </NavLink>
        
    )
}

function MdItem(props) {
    const priceChange = props.obj.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return(
        <NavLink to={`/productDetail/${props.obj.id}`} className='product-div'>
            <div className='product-thumbnail'>
                <img className='product-thumbnail-img' alt='md-product' src={props.obj.thumbnail} />
            </div>
            <div className='product-displayName'>
                <strong>{props.obj.displayName}</strong>
                <div className='product-price'>
                    {priceChange} 원
                </div>
            </div>
        </NavLink>
        
    )
}

export default Home;