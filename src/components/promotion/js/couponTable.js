
import "../css/couponTable.css";
import React, { useCallback } from "react";
import axios from "axios";
import { useState, useEffect, useContext} from "react";
import CouponProductModal from './couponProductModal';
import {AuthContext} from "../../../context/authProvider";

import freeDelivery from '../../../src_assets/seller/free_delivery.png';
import rate from '../../../src_assets/seller/rate.png'

import {ServerConfigContext } from "../../../context/serverConfigProvider";
import Pagination from "react-js-pagination";

export default function CouponTable() {
    const { url } = useContext(ServerConfigContext);
    const [listFlag, setListFlag] = useState(false);
    const [couponList, setCouponList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [couponName, setCouponName] = useState('');

    {/* Paging */}
    const [productList, setProductList] = useState([]); //아이템
    const [count, setCount] = useState(0); //아이템 총 수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(5); //페이지당 아이템 개수
    const [searchFlag, setSearchFlag] = useState(false);

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);
    const { sellerHeaders } = useContext(AuthContext);

    const setPage = (e) => {
        setCurrentpage(e);
    };

    const Paging = ({page, count, setPage}) => {
        return (
            <Pagination
                    activePage={page}
                    itemsCountPerPage={7}
                    totalItemsCount={count}
                    pageRangeDisplayed={7}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={setPage} />
        );
    }

    useEffect(() => {
        setCount(count);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(productList);
    }, [currentpage, indexOfFirstPost, indexOfLastPost, productList, postPerPage]);

    useEffect(() => {
        if(listFlag==false) getRateCoupon();
        else getFixCoupon();
    },[currentpage]);

    const showProductModal = (couponName) => {
        setModalOpen(true);
        setCouponName(couponName);
    };

    const closeProductModal = useCallback(() => {
        setModalOpen(false);
    });

    const isValid = (startDate, endDate)=>{
        let now = new Date();

        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        if(sDate<=now && now<=eDate) return <span >적용 가능</span>;
        else return <span style={{color:"#FB7D98"}}>적용 불가</span>;

    }

    useEffect(() => {

        console.log("coupon table");
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rateCoupon/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setCouponList(resp.data.result.data.rateCouponList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    const clickRateCoupon = ()=>{
        setListFlag(false);
        setCurrentpage(1);
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rateCoupon/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setCouponList(resp.data.result.data.rateCouponList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const getRateCoupon = ()=>{
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rateCoupon/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setCouponList(resp.data.result.data.rateCouponList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const clickFixCoupon = ()=>{
        setListFlag(true);
        setCurrentpage(1);
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/fixCoupon/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setCouponList(resp.data.result.data.fixCouponList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const getFixCoupon = ()=>{
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/fixCoupon/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setCouponList(resp.data.result.data.fixCouponList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    return(
        <div style={{marginLeft: "240px"}} >
           <div  className="coupon-nav">
            <ul >
                <li onClick={clickRateCoupon}><img src={rate} style={{width:"30ox", height:"30px", marginLeft:"-20px"}}/>비율 할인 쿠폰</li>
                <li onClick={clickFixCoupon}><img src={freeDelivery} style={{width:"50ox", height:"80px", marginLeft:"-30px"}}/>무료 배송 쿠폰</li>
            </ul>
            <hr style={{width:"1330px", marginTop:"-31px",marginLeft:"-1px"}}/>
        </div>

            <table className="couponTable">
                <thead>
                    <tr>
                    <th style={{width: "10%"}}>-</th>
                    <th style={{width: "20%"}}>쿠폰명</th>
                    <th>유효기간</th>
                    <th>상태</th>
                    {!listFlag&&<th>할인 비율</th>}
                    {!listFlag&&<th>할인 최소 비용</th>}
                    <th> 적용 상품</th>
                    </tr>
                </thead>
                <tbody>
                {
                    couponList.map( function(object, i){ 
                        return (
                        <tr>
                            <td>{i+1}</td>
                            <td>{object.name}</td>
                            <td>{object.startDate}~ {object.endDate}</td>
                            <td>{isValid(object.startDate, object.endDate)}</td>
                            {!listFlag&&<td>{object.rate} %</td>}
                            {!listFlag&&<td>{object.minPrice} 원</td>}
                            <td><button onClick={()=>showProductModal(object.name)} style={{backgroundColor: "#fff", padding : "5px", textAlign:"center",
                                color:"black", borderRadius: "4px", border: "1px solid black"}}>적용 상품 보기</button>
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
                
            </table>

            {/* 페이징 */}
            <div className="pagingProduct">
                    {searchFlag && <Paging page={currentpage} count={count} setPage={setPage} /> }
            </div>



            {modalOpen && <CouponProductModal name={couponName} onModalDisplay={closeProductModal} couponFlag={listFlag}></CouponProductModal>}
        </div>
    )
}