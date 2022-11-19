import React, {useContext, useEffect, useState, useRef} from "react"
import axios from 'axios';
import {NavLink,useNavigate } from "react-router-dom";

import left from '../../../../src_assets/main/left.png'
import right from '../../../../src_assets/main/right.png'
import timer from '../../../../src_assets/main/timer.png'
import {ServerConfigContext} from "../../../../context/serverConfigProvider"

import "../css/main.css"

function Home() {
    // link용
    const history = useNavigate();
    const { url } = useContext(ServerConfigContext);

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

    const moveTimeSale = () => {
        history('/sale')
    }

    const moveMd = () => {
        history('/mdRecommendation')
    }

    const arCoupon = () => {
        if(localStorage.getItem('memberId') == null || localStorage.getItem('memberId') == "") {
            alert("로그인 후 이용이 가능합니다.");
            history('/login');    
        }else {
            history('/clientApp/clientIndex.html');
            window.location.reload();
        }
    }

    // 상품
    const [newState, setNewState] = useState([]);
    const [saleState, setSaleState] = useState([]);
    const [mdState, setMdState] = useState([]);

    const fetchNew = async () => {
        await axios({
        method: "get",
        url: url + "/product-service/product/main/new"
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
        url: url + "/product-service/product/main/sale"
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
        url: url + "/product-service/product/main/seller"
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
                    src="https://kokodo-product.s3.ap-northeast-1.amazonaws.com//banner.png" onClick={arCoupon}/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220902/IMG1662TWQ094834801.jpg"/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220930/IMG1664Kbq521622683.jpg"/>
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220902/IMG1662YEZ094822689.jpg"/>\
                    <img className="banner_img" alt="banner"
                    src="https://file.rankingdak.com/image/RANK/BANNER/AR_IMG_1/20220916/IMG1663ZYA316795501.jpg"/>
                </div>

            </div>

            <div className='main-category-product'>
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
                        <button onClick={moveTimeSale}>
                            <h3 className='product-title'>
                                <img className='timer' alt='timer' src={timer} />
                                지금 이순간 깜짝 타임세일!
                            </h3>
                        </button>

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
                        <button onClick={moveMd}><h3 className='product-title'>MD's 추천 상품</h3></button>
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
                <span>{props.obj.displayName}</span>
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
                <span>{props.obj.displayName}</span>
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
                <span>{props.obj.displayName}</span>
                <div className='product-price'>
                    {priceChange} 원
                </div>
            </div>
        </NavLink>
        
    )
}

export default Home;