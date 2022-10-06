import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "./orderList.css";

function GetOrderList(order) {
    console.log("order : ");
    console.log(order);
    return (
        <div className='content'>
            <div className='order-date'>{order.obj.orderDate}</div>
            <div className='content-value'>
                <div className='content-name'>
                    <div className='name'>{order.obj.name}</div>
                </div>
                <div className='content-value-detail'>
                    <div className='content-thumbnail'>
                        <img className='thumbnail' src={order.obj.thumbnail} />
                    </div>

                    <div className='order-value'>
                        <div className='order-id'>주문번호 {order.obj.orderId}</div>
                        <br></br>
                        <div className='price'>결제금액 {order.obj.price}</div>
                    </div>
                    <div className='cancel-button'>
                        <button type='button' className='button'>주문취소</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function OrderList() {
    const [orders, setOrders] = useState([]);

    const getOrderList = async () => {
        const memberId = 1;
        await axios.get(`http://localhost:8080/orders/${memberId}`
        )
            .then(function (resp) {
                setOrders(resp.data.result.data);
            })
            .catch(function (err) {
                alert(err);
            });
    }

    return (
        <div className='main'>
            <h1>전체 주문 내역</h1>
            <br />
            <div className="contents">
                {
                    orders.map(function (object) {
                        return (
                            <GetOrderList obj={object} />
                        )
                    })
                }

                <div className="click-button">
                    <button onClick={() => getOrderList()}>가져오기</button>
                </div>
            </div>
        </div>

    )
}

export default OrderList;