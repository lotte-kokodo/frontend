import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "./productDetailInfo.css";

const st1 = { transitionDuration: "300ms" }
const st2 = { width: "480px", opacity: "1", transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
const st3 = { transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
const st4 = { width: "88px", marginRight: "10px" }



export default function ProductDetail() {

    let { productId } = useParams(null);

    const [product, setProduct] = useState("");
    const [orderNum, setOrderNum ] = useState(1);
    const [salePrice, setSalePrice ] = useState(1);
    const [ totalPrice, setTotalPrice ]=useState(1);
    const [totalReview, setTotalReview ]=useState(0);
    const [ coupon, setCoupon ] =useState('');

    const plusOrderNum = ()=>{
        var tmpNum = orderNum+1;
        setOrderNum(tmpNum);
        var total= salePrice*tmpNum;
        setTotalPrice(total);

        console.log("plus "+tmpNum+" "+total);
        
    } 
    const minusOrderNum = ()=>{
        var tmpNum = orderNum-1;
        setOrderNum(tmpNum);
        var total= salePrice*tmpNum;
        setTotalPrice(total);

        console.log("minus "+tmpNum+" "+total);
        
    }
    
    // product 정보 조회 (Product)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:9270/product/detail/${productId}`)
                .then(function (resp) {

                    setProduct(resp.data.result.data);
                    setSalePrice(resp.data.result.data.price);
                    setTotalPrice(resp.data.result.data.price)

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);
    // 리뷰 갯수 & 평균 평점 조회 (Product)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:9270/review/total/${productId}`)
                .then(function (resp) {
                    console.log(resp);
                    setTotalReview(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);

    // 쿠폰 조회 (Promotion)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get(`http://localhost:9011/rateCoupon/${productId}`)
                .then(function (resp) {
                    console.log(resp);

                    setCoupon(resp.data.result.data[0])
                    console.log(coupon);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);



    return (
    
      
    
    <div>



<div className="goods-top-wrap frame-sm">
<div className="goods-img-area">
    <div className="goods-slide">
        <div className="swiper-container goods-top swiper-container-fade swiper-container-initialized swiper-container-horizontal">
            <ul className="swiper-wrapper" style={st1}>
                <li className="swiper-slide swiper-slide-prev" style={st2}>
                    <img data-src={product.thumbnail} style={{width:'1000px', height:'500px'}} 
                        alt="[맛있닭] 명실상부 No.1 닭가슴살 스테이크 &amp; 추가 증정" className="lozad"
                        src={product.thumbnail} data-loaded="true" />
                    <div className="goods-badge">
                        <img src="https://file.rankingdak.com/image/RANK/PRODUCT/ICONTHUMB/20220406/IMG1649RCM228742248.png" alt="" />
                    </div>
                </li>
            </ul>
            <span className="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
        
    </div>
</div>
<div className="goods-info-area">
    <div className="brand-line">
    </div>
    <h2 className="goods-tit">{product.name}</h2>
    <div className="rating-div">
        <a href="#detail-section02" className="rating-point-md">
            <span className="point48"></span><span className="blind">별점4.6~4.9</span>
            <span className="blind">별점</span>
        </a>
        <a href="#detail-section02" className="score" >{totalReview.totalRate}</a>
        <a href="#detail-section02" className="num" >({totalReview.reviewCnt})</a>
    </div>

    <div className="goods-price">
        <p className="sale"><strong>29</strong>%</p>
        <p className="price"><strong></strong>원</p>
        <p className="origin"><span>{product.price}</span>원</p>
        {/* <div className="option">(100g당 : 1,290원~1,650원)</div> */}
    </div>
    <div className="orange-mem-box">
        <a href="/landing/content?cont=orangeJoin" className="box-head">
            <i className="ico-bl-orgmem"></i><strong className="text-primary">주문 시 적용되는 혜택이 있어요</strong>
            <span className="txt">쿠폰 다운로드 <i className="ico-arr-right"></i></span>
        </a>
        <ul className="sale-desc">
            <li><span>{coupon.name}</span><em className="number"><strong>{coupon.rate}%</strong></em></li>
        </ul>
    </div>
    <div className="dl-table-group">
        <dl className="dl-row">
            <dt>판매량</dt>
            <dd>
                <strong>67,025,469</strong>
                팩 구매
            </dd>
        </dl>
        <dl className="dl-row">

        </dl>

        <dl className="dl-row">
            <dt>공지사항</dt>
            <dd>
                <ul className="txt-list">
                    <li>추가옵션 스파클링 구매 시 개별 배송됩니다</li>
                </ul>
            </dd>
        </dl>
    </div>


    <div className="option-select-area new">
        <div className="selected-options">
            <ul id="main-selected-options" className="selected-options-area">
            </ul>
        </div>


        <div className="total-area">
            <div className="spinner"> 
                <div className="price" style={{ position: 'relative', marginTop: '14px', marginLeft: '10px' }}>
                    <div className="spinnerBox">
                        <button className="minus disabled" onClick={minusOrderNum}>-</button>
                        <div className="number">
                            <input id="text" min="1" max={product.stock} value={orderNum}/>
                        </div>
                        <button className="plus" onClick={plusOrderNum}>+</button>
                    </div>
                </div>

                <div>
                    <span className="txt" style={{ marginRight: '30px'}}>총 상품금액</span>
                    <p className="price">
                        <strong className="orderTotalPrice">{totalPrice}</strong>원
                    </p>
                </div>
            </div>
            <div className="btn-area" style={{ display: 'none' }}>
                <button type="button" className="btn-basic-lg btn-black btn-regular btnApplyRoutineDlv"><span>정기배송 신청</span></button>
            </div>
            <div className="btn-area">
                <button type="button" className="btn-basic-lg  btn-primary-line btnCartAdd" data-type="01"><span>장바구니</span></button>

                <div className="cart-pop">
                    <div className="inner-box">
                        <p clas="txt">장바구니에 추가하였습니다.
                            <br />
                            장바구니로 이동하시겠습니까?</p>
                        <div className="btns">
                            <button type="button" className="btn-basic-sm2 btn-default ui-cart-close"><span>아니오</span></button>
                            <a href="/order/cart" className="btn-basic-sm2 btn-primary-ex"><span>예</span></a>
                        </div>
                    </div>
                </div>

                <a href="#" className="btn-basic-lg btn-primary-ex btnCartAdd" data-type="00"><span>바로구매</span></a>
            </div>
        </div>

    </div>
</div>
</div>

    </div>)
}
