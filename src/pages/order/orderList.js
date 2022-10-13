import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "./orderList.css";

function ChangeLocalDateTime(dateTime) {
    var resultDate = new Date("2022-09-12T12:00:00")//"YYYY-MM-DDTHH:mm:sszz"
    resultDate = resultDate.toString().substring(0, 24);

    return resultDate.toString();
}

function GetOrderList(order) {
    const orderId = order.obj.orderId;
    const userId = 1;
    return (
        <div className='content'>
            <div className='order-date'>{ChangeLocalDateTime(order.obj.orderDate)}</div>

            <div className='content-value'>
                <div className='content-name'>
                    <div className='name'>{order.obj.name}</div>
                    <div className='move-button'>
                        <Link className='moveButton' to = {`/orderDetailList`}
                                    state = {{
                                        userId:userId,
                                        orderId:orderId
                                    }
                                }
                        >이동</Link>
                    </div>
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
    useEffect(() => {
        const fetchData = async () => {
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

        fetchData();
    }, []);

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
            </div>
        </div>

    )
}

export default OrderList;