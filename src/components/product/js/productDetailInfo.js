import axios from "axios";
import {useState, useEffect, useContext} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import "../css/productDetailInfo.css";
import {AuthContext} from "../../../context/authProvider";
import {RecentProductContext} from "../../../context/recentProductProvider";
import { ServerConfigContext } from "../../../context/serverConfigProvider";

const st1 = { transitionDuration: "300ms" }
const st2 = { width: "480px", opacity: "1", transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
const st3 = { transform: "translate3d(0px, 0px, 0px)", transitionDuration: "300ms" }
const st4 = { width: "88px", marginRight: "10px" }



export default function ProductDetail({img, template}) {
    const { url } = useContext(ServerConfigContext);
    let { productId } = useParams(null);

    const { headers, memberId } = useContext(AuthContext);
    const { setImg, setWatch } = useContext(RecentProductContext);

    const [product, setProduct] = useState("");
    const [orderNum, setOrderNum ] = useState(1);
    const [salePrice, setSalePrice ] = useState(0);
    const [ totalPrice, setTotalPrice ]=useState(1);
    const [totalReview, setTotalReview ]=useState(0);
    const [ coupon, setCoupon ] =useState('');
    const [ratePolicy, setRatePolicy] =useState('');

    // productId[key]: qty[value]
    let productQtyMap = {};

    const plusOrderNum = ()=>{
        var tmpNum = orderNum+1;
        setOrderNum(tmpNum);
        var total= salePrice*tmpNum;
        setTotalPrice(total);

    } 
    const minusOrderNum = ()=>{
        var tmpNum = orderNum-1;
        if(tmpNum==0) return;
        setOrderNum(tmpNum);
        var total= salePrice*tmpNum;
        setTotalPrice(total);
        
    }

    const moneyComma = (num)=>{
        let len, point, str;
    
        num = num + "";
        point = num.length % 3 ;
        len = num.length;
    
        str = num.substring(0, point);
        while (point < len) {
            if (str != "") str += ",";
            str += num.substring(point, point + 3);
            //,를 포함해서 idx 3을 추가해줌
            point += 3;
        }
    
        return str;
    }

    const calcSalePercent = (percent) =>{
        let originPrice = product.price;
        let saleNum = originPrice * (percent/100);
        let tmp=originPrice - saleNum;

        return tmp;
    }

    const changeOrderNum = (e)=>{
        setOrderNum(e.target.value);
    }
    const downloadCoupon = couponList =>{
        let couponIds =[];

        for(var coupon  of couponList){
            couponIds.push(coupon.id);
        }

        // TODO: Member ID 같이 전송해야함
        const test = async () => {
            await axios.post(url + `/promotion-service/userCoupon/list`,null,{ params: { rateIdList: couponIds.join(",")},  headers: { memberId : 1 } })
                .then(function (resp) {
                    alert("쿠폰 다운로드 성공");
                })
                .catch(function (error) {
                    console.log(error);
                })
        }

        test(productId);
    }

    const recentProduct = (item) => {
        let watchId = localStorage.getItem("watchId");
        let watchImage = localStorage.getItem("watchImage");

        if(watchId == null) {
            watchId = [];
            watchImage = [];
        } else{
            watchId = JSON.parse(watchId);
            watchImage = JSON.parse(watchImage);
        }

        watchId.unshift(item.id);
        watchImage.unshift(item.thumbnail);

        watchId = new Set(watchId);
        watchImage = new Set(watchImage);

        watchId = [...watchId];
        watchImage = [...watchImage];

        if (watchId.length == 4) {
            watchId.pop();
            watchImage.pop();
        }

        localStorage.setItem("watchId", JSON.stringify(watchId));
        localStorage.setItem("watchImage",JSON.stringify(watchImage));

        setWatch(watchId)
        setImg(watchImage);
    }

    // product 정보 조회 (Product)
    useEffect(() => {
        console.log("product/detail");

        const fetchData = async () => {
            await axios.get(url + `/product-service/product/detail/${productId}`)
                .then(function (resp) {
                    if(resp.data.result.data.detailFlag == 'TEMPLATE') template();
                    setProduct(resp.data.result.data);
                    recentProduct(resp.data.result.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);
    // 리뷰 갯수 & 평균 평점 조회 (Product)
    useEffect(() => {
        console.log("review/total");
        const fetchData = async () => {
            await axios.get(url + `/product-service/review/total/${productId}`)
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
        console.log("rateCoupon");
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rateCoupon/${productId}`)
                .then(function (resp) {
                    setCoupon(resp.data.result.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData(productId);
    }, []);

    // 할인 정책 정보

    useEffect(() => {
        console.log("promotion-service/rate-discount");
        fetchData();
    }, [salePrice,product]);

    const fetchData = async () => {
        await axios.get(url + `/promotion-service/rate-discount/${productId}`)
            .then(function (resp) {
                setRatePolicy(resp.data.result.data);
                setSalePrice(calcSalePercent(resp.data.result.data.rate));
                setTotalPrice(calcSalePercent(resp.data.result.data.rate));
            })
            .catch(function (error) {
                console.log(error);
            })
    };

    /* 장바구니 생성 API */
    const addCart = async () => {

        await axios.post(url + `/order-service/carts/${memberId}`, null,
            {params: {productId: productId, qty: orderNum}, headers: headers})
        .then((resp) => {
            console.log("[SUCCESS] (ProductDetailInfo) POST /order-payment-service/carts/");
            console.log(resp.data.result.data);

            alert(resp.data.result.data.msg);
        })
        .catch((err) => {
            console.log("[ERROR] (ProductDetailInfo) POST /order-payment-service/carts/");
            console.log(err);
        });

    }

    /* 주문서 API 요청을 위한 데이터 사전처리 */
    const makeOrderSheetData = () => {
        productQtyMap[productId] = orderNum;
    }


    return (
        

<div className="goods-top-wrap frame-sm">r
<div className="goods-img-area">
    <div className="goods-slide">
        <div className="swiper-container goods-top swiper-container-fade swiper-container-initialized swiper-container-horizontal">
            <ul className="swiper-wrapper" style={st1}>
                <li className="swiper-slide swiper-slide-prev" style={st2}>
                    <img  data-src={product.thumbnail} style={{ height:'500px'}} 
                        alt="[맛있닭] 명실상부 No.1 닭가슴살 스테이크 &amp; 추가 증정" className="lozad" src={product.thumbnail} data-loaded="true" />
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
            <span className="blind">별점</span>
        </a>
        <a href="#detail-section02" className="score" >{totalReview.totalRate}</a>
        <a href="#detail-section02" className="num" >({totalReview.reviewCnt})</a>
    </div>

    <div className="goods-price">
        <p className="sale"><strong>{ratePolicy.rate}</strong>%</p>
        <p className="price"><strong>{moneyComma(calcSalePercent(ratePolicy.rate))}</strong>원</p>
        <p className="origin"><span>{moneyComma(product.price)}</span>원</p>
    </div>
    <div className="orange-mem-box">
        <a onClick={()=>{downloadCoupon(coupon)}} href="#" className="box-head">
            <i className="ico-bl-orgmem"></i><strong className="product-info-coupon-primary">주문 시 적용되는 혜택이 있어요</strong>
            <span className="txt">쿠폰 다운로드 <i className="ico-arr-right"></i></span>
        </a>
        <ul className="sale-desc">
            { coupon[0]!=undefined ?<li><span>{coupon[0].name}</span><em className="number"><strong>{coupon[0].rate}%</strong></em></li>: "" }
            {/* <li><span>{coupon.name}</span><em className="number"><strong>{coupon.rate}%</strong></em></li> */}
        </ul>
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
                        <button className="minus disabled" onClick={minusOrderNum}>  </button>
                        <div className="number">
                            <input id="text" min="1" max={product.stock} value={orderNum} onChange={changeOrderNum}/>
                        </div>
                        <button className="plus" onClick={plusOrderNum}></button>
                    </div>
                </div>

                <div>
                    <span className="txt" style={{ marginRight: '30px'}}>총 상품금액</span>
                    <p className="price">
                        <strong className="orderTotalPrice">{moneyComma(totalPrice)}</strong>원
                    </p>
                </div>
            </div>
           
            <div className="btn-area">
                <button onClick={addCart} type="button" className="btn-basic-lg  btn-primary-line btnCartAdd" data-type="01">
                    <span>장바구니</span>
                </button>


                <Link to="/ordersheet" onClick={makeOrderSheetData}
                      state={{ productIds: [productId], productQtyMap: productQtyMap }}>
                <button className="btn-basic-lg btn-primary-ex btnCartAdd" data-type="00">
                    <span>바로구매</span>
                </button>
                </Link>

            </div>
        </div>

    </div>
</div>
</div>

    )
}