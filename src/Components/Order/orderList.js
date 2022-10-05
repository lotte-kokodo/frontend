import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "./orderList.css";

function OrderList() {
    const [orders, setOrders] = useState([]);

    const getOrderList = async () => {
        const memberId = 1;
        await axios.get(`http://localhost:8080/orders/${memberId}`
        )
            .then(function (resp) {

                // alert(JSON.parse(resp.data));
                console.log(resp.data.result.data);
    
                setOrders(resp.data.result.data);
    
            })
            .catch(function (err) {
                alert(err);
            });
    }
    
    const orderList = ({ order }) => {


        return (
            <div>
                {order.map(order => {
                    return (
                        <div>
                            <div>
                                {order.name}
                            </div>
                            <div>
                                {order.orderDate}
                            </div>
                            <div>
                                {order.orderId}
                            </div>
                            <div>
                                {order.orderStatus}
                            </div>
                            <div>
                                {order.price}
                            </div>
                            <div>
                                {order.thumbnail}
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div>
            <h1>전체 주문 내역</h1>
            <br />
            <div class="contents">
                <div class="content">
                    <div class="order_date">2022.09.22 (13시 46분)</div>
                    <div class="name">폰타나 오리엔탈 드레싱 외 6건</div>
                    <div class="thumbnail">"thumbnail"</div>
                    <div class="order_id">주문번호 12345412345234153412</div>
                    <div class="price">결제금액 12,300원</div>
                    <div class="order_status">주문상태 주문완료</div>
                    <button type="button">주문 취소</button>
                </div>
                <div class="content">
                    <div class="order_date">2022.09.22 (13시 46분)</div>
                    <div class="name">폰타나 오리엔탈 드레싱 외 6건</div>
                    <div class="thumbnail">"thumbnail"</div>
                    <div class="order_id">주문번호 12345412345234153412</div>
                    <div class="price">결제금액 12,300원</div>
                    <div class="order_status">주문상태 주문완료</div>
                    <button type="button">주문 취소</button>
                </div>
            </div>
            <button onClick={() => getOrderList()}>가져오기</button>
            <orderList orders={orders} />
        </div>

    )
}

export default OrderList;