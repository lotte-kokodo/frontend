
import "../css/couponTable.css";
import React, { useCallback } from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import DiscountPolicyProductModal from './discountPolicyProductModal';
import "../css/couponTable.css"

import { ServerConfigContext } from "../../../context/serverConfigProvider";

export default function DiscountPolicyTable() {
    const { url } = useContext(ServerConfigContext);
    const [listFlag, setListFlag] = useState(false);
    const [discountPolicyList, setDiscountPolicyList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [discountPolicyName, setDiscountPolicyName] = useState('');

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
        const fetchData = async () => {
            console.log("effect")
            console.log(url + `/promotion-service/rate-discount/seller/1`)
            await axios.get(url + `/promotion-service/rate-discount/seller/1`)
                .then(function (resp) {
                    setDiscountPolicyList(resp.data.result.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    const getRateDiscountPolicy = () => {
        setListFlag(true);
        const fetchData = async () => {
            console.log("rate")
            console.log(url + `/promotion-service/rate-discount/seller/1`)
            await axios.get(url + `/promotion-service/rate-discount/seller/1`)
                .then(function (resp) {
                    setDiscountPolicyList(resp.data.result.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const getFixDiscountPolicy = () => {
        setListFlag(false);
        const fetchData = async () => {
            console.log("fix")
            console.log(url + `/promotion-service/fix-discount/seller/1`)
            await axios.get(url + `/promotion-service/fix-discount/seller/1`)
                .then(function (resp) {
                    setDiscountPolicyList(resp.data.result.data);

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
                    <li onClick={getFixDiscountPolicy}>고정 할인 정책</li>
                    <li onClick={getRateDiscountPolicy}>비율 할인 정책</li>
                </ul>
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



            {modalOpen && <DiscountPolicyProductModal name={discountPolicyName} onModalDisplay={closeProductModal} couponFlag={listFlag}></DiscountPolicyProductModal>}
        </div>
    )
}