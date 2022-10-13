import React from "react"
import axios from "axios"
import "../css/ProductSearch.css"

import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function ProductSearch() {

    const params = useParams();

    let history = useNavigate();
    const [productList, setProductList] = useState([]);
    const [pdStatus, setPdStatus] = useState("ALL");
    const [productType, setProductType] = useState("ALL");

    const [productName, setProductName] = useState("");

    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpEndDate, setTmpEndDate] = useState("");


    const pdChange = (e) => {setPdStatus(e.target.value);};
    const changeProductName = (e) => {setProductName(e.target.value);}

    const startDateChange = (e) => {setTmpStartDate(e.target.value);}

    const endDateChange = (e) => {setTmpEndDate(e.target.value);}

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

    const getExpectEndDay = async() =>{
        let today = new Date();
        today.setMonth(today.getMonth() + 1);
        setTmpEndDate(parseToLocalDate(today.getFullYear() +"-" + today.getMonth() + "-" + today.getUTCDate()))
    }

    const getExpecStartDy = async() =>{
        let today = new Date();
        today.setMonth(today.getMonth() + 1);
        setTmpStartDate(weekDateParseToLocalDate(today.getFullYear() +"-" + today.getMonth() + "-" + today.getUTCDate()))
    }

    //유저 아이드, 날짜를 전달해줘야 한다.
    useEffect( () => {
        getExpecStartDy()
        getExpectEndDay()
    }, []);

    return (
        <div className="body">
            <div>
                <div className="product-title-box">상품 조회/수정</div>
            </div>
            <div className="product-type-common-box">
                <div className="product-search-detail-box">
                    <div className="product-condition-detail-box">상품명</div>
                    <div className="product-detail-condition-list">
                        <input className="product-condition-detail-input" type="text" placeholder="" onChange={changeProductName}/>
                    </div>
                </div>
            </div>
            <div>
                <div className="product-provide-status-border">
                    <div className="product-title-provide-status-box">상품상태</div>
                    <input name="prvidesuccess" className="product-radio-unit" type="radio"/>
                    <div className="product-radio-unit2" value="">전체</div>
                    <input name="prvidesuccess" id='test' className="product-radio-unit" value="PROVIDE_SUCCESS" type="radio" onClick={pdChange}/>
                    <div name="prvidesuccess" className="product-radio-unit2" >판매중</div>
                    <input name="prvidesuccess" className="product-radio-unit" value="PROVIDE_SCHEDULE" type="radio" onClick={pdChange}/>
                    <div className="product-radio-unit2" value="PROVIDE_SCHEDULE">품절</div>
                </div>
            </div>
            <div>
                <div className="product-search-criteria-box">
                    <div className="product-criteria-day-box">등록일</div>
                    <div className="product-criteria-unit">
                        {/*<p><input type="number" name="number" placeholder="정산일"/></p>*/}
                        {/*date-date-inline-licker는 누군가 문자열을 입력하기 이전까지 빈 문자열값이다*/}
                        <input className="product-calender-box" type="date" data-date-inline-picker="true" value={tmpStartDate} onChange={startDateChange}/>
                        <div className="product-calender-mark" > ~ </div>
                        <input className="product-calender-box2" type="date" ata-date-inline-picker="true" value={tmpEndDate} onChange={endDateChange}/>
                    </div>
                    <div>
                        <button type="button" className="product-search-button" value="" onClick={searchContent}>
                            검색
                        </button>
                    </div>
                </div>
            </div>
            <div className="product-bottom-result-box">
                <div className="product-search-result-box">상품목록</div>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th>선택</th>
                    <th>등록상품ID</th>
                    <th>등록상품명</th>
                    <th>광고 기한</th>
                    <th>남은 재고량</th>
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

