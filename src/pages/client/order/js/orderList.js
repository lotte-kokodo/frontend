import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

import "../css/orderList.css";

function ChangeLocalDateTime(dateTime) {
    var resultDate = new Date("2022-09-12T12:00:00")//"YYYY-MM-DDTHH:mm:sszz"
    resultDate = resultDate.toString().substring(0, 24);

    return resultDate.toString();
}

var orderId = "";
var userId = 0;
var orders = [];

function GetOrderList(order) {
    orderId = order.obj.obj.orderId;
    return (
        <div className='content'>
            <div className='order-date'>{ChangeLocalDateTime(order.obj.obj.orderDate)}</div>

            <div className='content-value'>
                <div className='content-name'>
                    <div className='name'>{order.obj.obj.name}</div>
                    <div className='move-button'>
                        <Link className='moveButton' to = "/orderDetailList"
                                    state = {{
                                        orderId:orderId
                                    }
                                }
                        >상세보기</Link>
                    </div>
                </div>
                <div className='content-value-detail'>
                    <div className='content-thumbnail'>
                        <img className='thumbnail' src={order.obj.obj.thumbnail} />
                    </div>

                    <div className='order-value'>
                        <div className='order-id'>주문번호 {order.obj.obj.orderId}</div>
                        <br></br>
                        <div className='price'>결제금액 {order.obj.obj.price}</div>
                    </div>
                    <div className='cancel-button'>
                    </div>
                </div>
            </div>
        </div>
    )
}



const OrderList = (object) => {
    console.log("object 결과값");
    console.log(object);
    orders = object;

    return (
        <div className="contents">
            <GetOrderList obj={object} />
        </div>
    )
}

export default OrderList;