import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom"

import "../css/orderList.css";

function ChangeLocalDateTime(dateTime) {
    return dateTime[0] + "년 " + dateTime[1] + "월 " + dateTime[2] + "일 " + dateTime[3] + "시 " + dateTime[4] + "분 " + dateTime[5] + "초"
}

var orderId = "";
var userId = 0;
var orders = [];

function GetOrderList(order) {
    orderId = order.obj.obj.orderId;
    return (
        <div className='content'>
            <div className='content-value'>

                <div className='content-value-detail'>
                    <div className='content-thumbnail'>
                        <img className='thumbnail' src={order.obj.obj.thumbnail} />
                    </div>
                    <div className='order-information'>
                        <div className='content-name'>
                            <div className='name'>{order.obj.obj.name}</div>
                        </div>
                        <div className='order-value'>
                            <div className='order-id'>주문번호 : {order.obj.obj.orderId}</div>
                            <div className='price'>결제금액 : {order.obj.obj.price}</div>
                        </div>
                    </div>
                    <div className='order-status'>
                        <div className='order-date'>{ChangeLocalDateTime(order.obj.obj.orderDate)}</div>
                        <div className='move-button'>
                            <Link className='moveButton' to = "/orderDetailList"
                                        state = {{
                                            orderId:orderId
                                        }
                                    }
                            >상세보기</Link>
                        </div>
                    </div>
                    
                    {/* <div className='order-date'>{ChangeLocalDateTime(order.obj.obj.orderDate)}</div> */}
                </div>
            </div>
        </div>
    )
}



const OrderList = (object) => {
    orders = object;

    return (
        <div className="contents">
            <GetOrderList obj={object} />
        </div>
    )
}

export default OrderList;