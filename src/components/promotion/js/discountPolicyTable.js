
import "../css/couponTable.css";
import React, { useCallback } from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import DiscountPolicyProductModal from './discountPolicyProductModal';
import "../css/couponTable.css"
import {AuthContext} from "../../../context/authProvider";
import freeDelivery from '../../../src_assets/seller/free_delivery.png';
import rate from '../../../src_assets/seller/rate.png';
import { ServerConfigContext } from "../../../context/serverConfigProvider";
import Pagination from "react-js-pagination";

export default function DiscountPolicyTable() {
    const { url } = useContext(ServerConfigContext);
    const [listFlag, setListFlag] = useState(false);
    const [discountPolicyList, setDiscountPolicyList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [discountPolicyName, setDiscountPolicyName] = useState('');

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
                    itemsCountPerPage={5}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    prevPageText={"<"}
                    nextPageText={">"}
                    onChange={setPage} />
        );
    }

    const showProductModal = (discountPolicyName) => {
        setModalOpen(true);
        setDiscountPolicyName(discountPolicyName);
    };

    const closeProductModal = useCallback(() => {
        setModalOpen(false);
    });

    const isValid = (startDate, endDate) => {
        let now = new Date();

        let sDate = new Date(startDate);
        let eDate = new Date(endDate);
        if (sDate <= now && now <= eDate) return <span >적용 가능</span>;
        else return <span style={{ color: "#FB7D98" }}>적용 불가</span>;

    }

    useEffect(() => {
        setCount(count);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(productList);
    }, [currentpage, indexOfFirstPost, indexOfLastPost, productList, postPerPage]);

    useEffect(() => {
        if(listFlag!=true) getFixDiscountPolicy();
        else getRateDiscountPolicy();
    },[currentpage]);

    useEffect (()=>{
        setListFlag(true);
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rate-discount/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setDiscountPolicyList(resp.data.result.data.rateDiscountPolicyList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    const clickRateDiscountPolicy = ()=>{
        setListFlag(true);
        setCurrentpage(1);
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rate-discount/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setDiscountPolicyList(resp.data.result.data.rateDiscountPolicyList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const clickFixDiscountPolicy = ()=>{
        setListFlag(false);
        setCurrentpage(1);
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/fix-discount/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    setDiscountPolicyList(resp.data.result.data.fixDiscountPolicyList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const getRateDiscountPolicy = () => {
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/rate-discount/seller?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    console.log(resp.data.result.data)
                    setDiscountPolicyList(resp.data.result.data.rateDiscountPolicyList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const getFixDiscountPolicy = () => {
        const fetchData = async () => {
            await axios.get(url + `/promotion-service/fix-discount/seller/?page=${currentpage}`,{headers: sellerHeaders})
                .then(function (resp) {
                    console.log(resp.data.result.data)
                    setDiscountPolicyList(resp.data.result.data.fixDiscountPolicyList);
                    setSearchFlag(true);
                    setCount(resp.data.result.data.totalCount)
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    return (
        <div style={{ marginLeft: "240px" }} >
            <div className="coupon-nav">
                <ul >
                <li onClick={() => clickFixDiscountPolicy()}><img src={rate} style={{width:"30ox", height:"30px", marginLeft:"-20px"}}/>고정 할인 정책</li>
                <li onClick={() => clickRateDiscountPolicy()}><img src={freeDelivery} style={{width:"50ox", height:"80px", marginLeft:"-30px"}}/>비율 할인 정책</li>
                </ul>
                <hr style={{width:"1330px", marginTop:"-31px",marginLeft:"-1px"}}/>
            </div>

            <table className="couponTable">
                <thead>
                    <tr>
                        <th style={{ width: "10%" }}>-</th>
                        <th style={{ width: "20%" }}>정책명</th>
                        <th>생성일시</th>
                        <th>시작일시</th>
                        <th>종료일시</th>
                        <th>적용가능여부</th>
                        {!listFlag && <th>할인금액</th>}
                        {!listFlag && <th>최소금액</th>}
                        {listFlag && <th>할인율</th>}
                        {listFlag && <th>최소금액</th>}
                        <th> 적용 상품</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        discountPolicyList.map(function (object, i) {
                            return (
                                <tr>
                                    <td>{i + 1}</td>
                                    <td>{object.name}</td>
                                    <td>{object.regDate}</td>
                                    <td>{object.startDate}</td>
                                    <td>{object.endDate}</td>
                                    <td>{isValid(object.startDate, object.endDate)}</td>
                                    {!listFlag && <td>{object.price} 원</td>}
                                    {!listFlag && <td>{object.minPrice} 원</td>}
                                    {listFlag && <td>{object.rate} %</td>}
                                    {listFlag && <td>{object.minPrice} 원</td>}
                                    <td><button onClick={() => showProductModal(object.name)} style={{
                                        backgroundColor: "#fff", padding: "5px", textAlign: "center",
                                        color: "#FB7D98", borderRadius: "5px", border: "1px solid #FB7D98"
                                    }}>적용 상품 보기</button>
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



            {modalOpen && <DiscountPolicyProductModal name={discountPolicyName} onModalDisplay={closeProductModal} couponFlag={listFlag}></DiscountPolicyProductModal>}
        </div>
    )
}