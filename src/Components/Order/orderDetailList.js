import React, { useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"

import "./orderDetailList.css";

function OrderDetailList() {
    const memberId = 1;
    const getOrderDetailList = async() => {
        await axios.get(`http://127.0.0.1:8080/orders/${memberId}`,
            // { params: {memberId:1, orderId:1}}
            )
        .then(function (resp) {
            alert(resp.value);
        })
        .catch(function (err) {
            alert(err);
        });
    }

    return(
        <div>
            <h1>주문 내역 상세</h1>
            <br/>
            <div class="contents">
                <div class="content">
                    <div class="image">
                        <img class="image" src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20220826/IMG1661ECG509930627_330_330.jpg" />
                    </div>
                    <div class="values">
                        <div class="values-top">
                            <div class="name">폰타나 오리엔탈 드레싱</div>
                        </div>
                    <div class="values-bottom">
                        <div class="price">2,830원</div>
                        <div class="qty">2개</div>
                    </div>
                </div>
            <div class="status">
                <div class="order-status">주문완료</div>
            </div>
            <button type="button" class="button">환불 요청</button>
        </div>
        <div class="content">
            <div class="image">
                <img class="image" src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20220826/IMG1661ECG509930627_330_330.jpg" />
            </div>
            <div class="values">
                <div class="values-top">
                    <div class="name">폰타나 오리엔탈 드레싱</div>
                </div>
                <div class="values-bottom">
                    <div class="price">2,830원</div>
                    <div class="qty">2개</div>
                </div>
            </div>
            <div class="status">
                <div class="order-status">주문완료</div>
            </div>
            <button type="button" class="button">환불 요청</button>
        </div>
        <div class="content">
            <div class="image">
                <img class="image" src="https://file.rankingdak.com/image/RANK/PRODUCT/PRD001/20220826/IMG1661ECG509930627_330_330.jpg" />
            </div>
            <div class="values">
                <div class="values-top">
                    <div class="name">폰타나 오리엔탈 드레싱</div>
                </div>
                <div class="values-bottom">
                    <div class="price">2,830원</div>
                    <div class="qty">2개</div>
                </div>
            </div>
            <div class="status">
                <div class="order-status">주문완료</div>
            </div>
            <button type="button" class="button">환불 요청</button>
        </div>
        <button onClick={() => getOrderDetailList()}>가져오기</button>
        </div>
    </div>
    )
}

export default OrderDetailList;