import React from "react"
import axios from "axios"
import "./productNotice.css"

import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function ProductNotice() {

    const params = useParams();

    let history = useNavigate();
    const [productList, setProductList] = useState([]);

    // button axios
    const searchContent = async () => {
        history(`/product/present/${params.id}`)
        await axios.post(`http://localhost:8080/product/${params.id}/productList`,{
            // "sellerId" : 1,
            // "startDate" : tmpStartDate + "T"+"00:00:00",
            // "endDate" : tmpEndDate +  "T"+"00:00:00",
            // "pdChange": pdChange,
            // "productType": productType,
            // "id": productNamed
        }).then(function (resp) {
        }).catch(function (error) {
            console.log(error);
        })
    }
    //유저 아이드, 날짜를 전달해줘야 한다.
    useEffect( () => {
    }, []);

    return (
        <div className="body">
            <div>
                <div className="product-title-box">상품 알림</div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>선택</th>
                    <th>등록상품ID</th>
                    <th>등록상품명</th>
                    <th>현재 최저가</th>
                    <th>판매가</th>
                    <th>남은재고량</th>
                    <th>상품상태</th>
                    <th>실시간 인기 상품</th>
                </tr>
                </thead>

                <tbody>
                {
                    productList.map(function (productRow, i) {
                        return (
                            <productTableRow obj={productRow} key={i} cnt={i + 1}/>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

function productTableRow(row) {
    return (
        <tr>
            {/*체크박스 컴포넌트 자리*/}
            <th>{checkBoxPosition}</th>
            <th>{row.cnt}</th>
            <td>{row.obj.id}</td>
            <td>{row.obj.regPdName}</td>
            <td>{row.obj.adDuration}</td>
            <td>{row.obj.remainStock}</td>
        </tr>
    )
}

function moneyComma(num){
    let len, point, str;

    num = num + "";
    point = num.length % 3 ;
    len = num.length;

    str = num.substring(0, point);
    while (point < len) {
        if (str !== "") str += ",";
        str += num.substring(point, point + 3);
        //,를 포함해서 idx 3을 추가해줌
        point += 3;
    }

    return str;
}

function dateParseToSimple(date){
    let day = date.data.result.data;
    let idx = day.indexOf('T');
    return day.substring(0,idx);
}

function dateParseToSimple2(date){
    let day = date.obj.date
    let idx = day.indexOf('T');
    return day.substring(0,idx);
}

function parseToLocalDate(strLocalDate){
    const date = new Date(parseInt(strLocalDate.substring(0,4)), parseInt(strLocalDate.substring(5,7)), parseInt(strLocalDate.substring(8)));
    let strYear = date.getFullYear();
    let strMonth = date.getMonth();
    let strDate = date.getDate();

    if(strYear < 10){
        strYear ="000" + date.getFullYear();
    }else if(strYear < 100){
        strYear ="00" + date.getFullYear();
    }else if(strYear < 1000){
        strYear = "0" + date.getFullYear();
    }

    if(strMonth< 10){ strMonth = "0" + date.getMonth();}
    if(strDate< 10){ strDate = "0" + date.getUTCDate();}
    let value = strYear+"-"+strMonth+"-"+strDate
    return value;
}

function weekDateParseToLocalDate(strLocalDate){
    const date = new Date(parseInt(strLocalDate.substring(0,4)), parseInt(strLocalDate.substring(5,7)), parseInt(strLocalDate.substring(8)));
    date.setDate(date.getDate() - 5);
    let strYear = date.getFullYear();
    let strMonth = date.getMonth();
    let strDate = date.getUTCDate();

    if(strYear < 10){
        strYear ="000" + date.getFullYear();
    }else if(strYear < 100){
        strYear ="00" + date.getFullYear();
    }else if(strYear < 1000){
        strYear = "0" + date.getFullYear();
    }

    if(strMonth< 10){ strMonth = '0' + date.getMonth();}
    if(strDate< 10){ strDate = "0" + date.getUTCDate();}
    let value = strYear+"-"+strMonth+"-"+strDate
    return value;
}

function monthDateParseToLocalDate(strLocalDate){
    const date = new Date(parseInt(strLocalDate.substring(0,4)), parseInt(strLocalDate.substring(5,7)), parseInt(strLocalDate.substring(8)));
    date.setDate(date.getDate() - 30);
    let strYear = date.getFullYear();
    let strMonth = date.getMonth();
    let strDate = date.getUTCDate();

    if(strYear < 10){
        strYear ="000" + date.getFullYear();
    }else if(strYear < 100){
        strYear ="00" + date.getFullYear();
    }else if(strYear < 1000){
        strYear = "0" + date.getFullYear();
    }

    if(strMonth< 10){ strMonth = '0' + date.getMonth();}
    if(strDate< 10){ strDate = "0" + date.getUTCDate();}
    let value = strYear+"-"+strMonth+"-"+strDate
    return value;
}

