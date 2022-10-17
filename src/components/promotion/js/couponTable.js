
import "../css/couponTable.css";
import React, { useCallback } from "react";
import axios from "axios";
import { useState, useEffect} from "react";

import CouponProductModal from './couponProductModal';


export default function CouponTable() {
    const [listFlag, setListFlag] = useState(false);
    const [couponList, setCouponList] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [couponName, setCouponName] = useState('');

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
        const fetchData = async () => {
            await axios.get(`http://localhost:8001/promotion-service/rateCoupon/seller?sellerId=1`)
                .then(function (resp) {
                    setCouponList(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }, []);

    const getRateCoupon = ()=>{
        setListFlag(false);
        const fetchData = async () => {
            await axios.get(`http://localhost:8001/promotion-service/rateCoupon/seller?sellerId=1`)
                .then(function (resp) {
                    setCouponList(resp.data.result.data);

                })
                .catch(function (error) {
                    console.log(error);
                })
        }
        fetchData();
    }

    const getFixCoupon = ()=>{
        setListFlag(true);
        const fetchData = async () => {
            await axios.get(`http://localhost:8001/promotion-service/fixCoupon/seller?sellerId=1`)
                .then(function (resp) {
                    setCouponList(resp.data.result.data);

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
                <li onClick={getRateCoupon}>비율 할인 쿠폰</li>
                <li onClick={getFixCoupon}>무료 배송 쿠폰</li>
            </ul>
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
                                color:"#FB7D98", borderRadius: "5px", border: "1px solid #FB7D98"}}>적용 상품 보기</button>
                            </td>
                        </tr>
                        )
                    })
                }
                </tbody>
                
            </table>



            {modalOpen && <CouponProductModal name={couponName} onModalDisplay={closeProductModal} couponFlag={listFlag}></CouponProductModal>}
        </div>
    )
}