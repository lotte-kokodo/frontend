import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from "react-router-dom"

import "./orderDetailList.css";

function changeOrderStatus(orderStatus) {
    let result;
    switch(orderStatus) {
        case "ORDER_SUCCESS":
            result = "주문 완료";
        break;
        case "PURCHASE_CONFIRM":
            result = "구매 확정"
        break;
        case "REFUND_PROCESS":
            result = "환불 진행중";
        break;
        default:
        result = "에러";
    }
    return result;
}

function OrderDetailList() {
    const [orderDetails, setOrderDetails] = useState([]);
    const state = useLocation();
    const userId = state.state.userId;
    const orderId = state.state.orderId;

    useEffect(() => {
        console.log(state);

        const fetchData = async () => {
            // const memberId = 1;
            // const orderId = 1;
            await axios.get(`http://127.0.0.1:8080/orders/${userId}/${orderId}`
            )
                .then(function (resp) {
                    setOrderDetails(resp.data);
                })
                .catch(function (err) {
                    alert(err);
                })
        }
        fetchData();
    }, [])

    // 환불을 위한 API확인 필요
    const setRefundOrderDetail = async () => {
        await axios.get(`http://127.0.0.1:8080/orders/`)
            .then(function (resp) {

            })
            .catch(function (err) {
                alert(err);
            })
    }

    function GetOrderDetailList(orderDetail) {
        return (
            <div className="content-detail">
                <div className="content-detail-image">
                    <img className="image" src={orderDetail.obj.thumbnail} />
                </div>
                <div className="detail-values">
                    <div className="values-top">
                        <div className="content-detail-name">{orderDetail.obj.name}</div>
                    </div>
                    <br></br>
                    <div className="values-bottom">
                        <div className="price">{orderDetail.obj.price}원</div>
                        <div className="qty">{orderDetail.obj.qty}개</div>
                    </div>
                </div>
                <div className="status">
                    <div className="order-status">{changeOrderStatus(orderDetail.obj.orderStatus)}</div>
                </div>
                <div className='refund-button-value'>
                    <button type="button" onClick={() => setRefundOrderDetail()} className="refund-button">환불 요청</button>
                </div>
            </div>
        )
    }


    return (
        <div>
            <h1>주문 내역 상세</h1>
            <br />
            <div className="contents">
                {
                    orderDetails.map(function (object) {
                        return (
                            <GetOrderDetailList obj={object} />
                        )
                    })
                }
                <Link className='moveButton' to={`/orderList`}
                    state={{
                        userId: userId
                    }
                    }
                >뒤로가기</Link>
            </div>
        </div>
    )
}

export default OrderDetailList;