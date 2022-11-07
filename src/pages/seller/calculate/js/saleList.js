import React from "react"
import axios from "axios"
import "../css/saleList.css"

import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    dateParseToSimple2,
    moneyComma,
    provideStatusToValue,
    provideTypeToValue
} from '../../../../common/calculate/function'
import { useContext } from "react";
import { ServerConfigContext } from "../../../../context/serverConfigProvider";

import moment from "moment";

export default function SaleList() {
    const { url } = useContext(ServerConfigContext);

    let today = new Date();
    today.setMonth(today.getMonth() + 1);

    const params = useParams();

    let history = useNavigate();
    const [saleList, setSaleList] = useState([]);
    const [searchCondition, setSearchCondition] = useState("");

    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpEndDate, setTmpEndDate] = useState("");

    const [resultCnt, setResultCnt] = useState("0");

    const provideStatusChange = (e) => {setSearchCondition(e.target.value);};

    const startDateChange = (e) => {
        setTmpStartDate(e.target.value);
    }

    const endDateChange = (e) => {
        setTmpEndDate(e.target.value);
    }

    const searchResultCnt = (data) => {
        let size = data.data.result.data.length;
        setResultCnt(size);
    }

    const searchContent = async () => {
        history(`/seller/${params.sellerId}/saleList`)
        await axios.post(url + `/calculate-service/commission/saleList`,{
            "sellerId" : params.sellerId,
            "startDate" : tmpStartDate + "T"+"00:00:00",
            "endDate" : tmpEndDate +  "T"+"12:59:59",
            "provideStatus": searchCondition
        }).then(function (resp) {
            setSaleList(resp.data.result.data)
            searchResultCnt(resp);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getExpectEndDay = async() =>{
        setTmpEndDate(parseToLocalDate(today.getFullYear() +"-" + today.getMonth() + "-" + today.getUTCDate()))
    }

    const getExpecStartDy = async() =>{
        setTmpStartDate(weekDateParseToLocalDate(today.getFullYear() +"-" + today.getMonth() + "-" + today.getUTCDate()))
    }

    const fetchTodayAddOne = () =>{
        const day = addDay(tmpEndDate, 1)
        setTmpEndDate(moment(day).format('YYYY-MM-DD'));
    }

    const fetchTodayAddTwo = () =>{
        const day = addDay(tmpEndDate, 2)
        setTmpEndDate(moment(day).format('YYYY-MM-DD'));
    }

    const fetchToday = () =>{
        setTmpStartDate(parseToLocalDate(today.getFullYear() +"-" + today.getMonth() + "-" + today.getUTCDate()))
        setTmpEndDate(parseToLocalDate(today.getFullYear() +"-" + today.getMonth() + "-" + today.getUTCDate()))
    }
    //유저 아이드, 날짜를 전달해줘야 한다.
    useEffect( () => {
        getExpecStartDy()
        getExpectEndDay()
    }, []);

    return (
        <div className="body">
            <div>
                <div className="saleList-title-box">매출내역</div>
            </div>
            <div>
                <div className="saleList-search-criteria-box">
                    <div className="saleList-criteria-day-box">기간</div>
                    <div className="saleList-criteria-unit">
                        {/*<p><input type="number" name="number" placeholder="정산일"/></p>*/}
                        {/*date-date-inline-licker는 누군가 문자열을 입력하기 이전까지 빈 문자열값이다*/}
                        <input className="saleList-calender-box" type="date" data-date-inline-picker="true" value={tmpStartDate} onChange={startDateChange}/>
                        <div> ~ </div>
                        <input type="date" data-date-inline-picker="true" value={tmpEndDate} onChange={endDateChange}/>
                        <input type="button" className="saleList-criteria-button1" value="오늘" onClick={fetchToday}/>
                        <input type="button" className="saleList-criteria-button1" value="+1" onClick={fetchTodayAddOne}/>
                        <input type="button" className="saleList-criteria-button2" value="+2" onClick={fetchTodayAddTwo}/>

                    </div>
                    <div className="saleList-provide-status-border">
                        <div className="saleList-title-provide-status-box">조회조건</div>
                        <input name="prvidesuccess" className="saleList-radio-unit" value="PROVIDE_SCHEDULE" type="radio" onClick={provideStatusChange}/>
                        <div className="saleList-radio-unit2" value="PROVIDE_SCHEDULE">업체별</div>
                        <input name="prvidesuccess"className="saleList-radio-unit" value="PROVIDE_POSTPONE" type="radio" onClick={provideStatusChange}/>
                        <div className="saleList-radio-unit2" value="PROVIDE_POSTPONE">상품별</div>
                    </div>
                </div>
            </div>
            &nbsp;
            <div>
                <button type="button" className="saleList-button" value="" onClick={searchContent}>
                    <i className="fas fa-search"></i> 검색
                </button>
            </div>
            <div className="saleList-bottom-result-box">
                <div className="saleList-search-result-box">검색 결과</div>
                <div className="saleList-search-result-cnt-box"> (총 {resultCnt}건)</div>
            </div>
            <table className="table saleList-table">
                <thead>
                <tr>
                    <th>상호(판매자코드)</th>
                    <th>정산유형</th>
                    <th>구분</th>
                    <th>매출금액(A)</th>
                    <th>판매수수료(B)</th>
                    <th>정산대상액(A-B=C)</th>
                    <th>전담택배비(D)</th>
                    <th>판매자서비스이용료(E)</th>
                    <th>패널티</th>
                    <th>상세다운로드</th>
                </tr>
                </thead>

                <tbody>
                {
                    saleList.map(function (saleListRow, i) {
                        return (
                            <SaleListTableRow obj={saleListRow} key={i} cnt={i + 1}/>
                        )
                    })
                }
                </tbody>
            </table>
            {/*<div className="calculate-detail-condition-list">*/}
            {/*    <StickyHeadTable/>*/}
            {/*</div>*/}
        </div>
    );
}

function SaleListTableRow(row) {
    return (
            <tr>
                <td>
                    {row.obj.sellerId}
                </td>
                <td>
                    {provideTypeToValue(row.obj.calculateType)}
                </td>
                <td>
                    <div>판매액</div>
                    <div>배송료</div>
                    <div>합계</div>
                </td>
                <td>
                    {/*판매액*/}
                    <div>{moneyComma(row.obj.saleSum)}</div>
                    {/*배송료*/}
                    <div>{0}</div>
                    {/*합계*/}
                    <div>{moneyComma(row.obj.sum)}</div>
                </td>
                {/*판매수수료*/}
                <td>
                    <div>{moneyComma(row.obj.saleCommission)}</div>
                    <div>0</div>
                    <div>{moneyComma(row.obj.saleCommission)}</div>
                </td>
                {/*정산대상액*/}
                <td>
                    <div>
                        {moneyComma(row.obj.settlementMoney)}
                    </div>
                </td>
                {/*전담택배비*/}
                <td>
                    0
                </td>
                {/*판매자서비스이용료*/}
                <td>
                    0
                </td>
                {/*패널티*/}
                <td>
                    0
                </td>
                {/*상세 다운로드*/}
                <td>
                    상세다운로드
                </td>
            </tr>
    )
}

function addDay(strLocalDate, num){
    const date = new Date(strLocalDate);
    date.setDate(date.getDate() + num)
    return date;
}


function parseToLocalDate(strLocalDate){
    const date = new Date(parseInt(strLocalDate.substring(0,4)), parseInt(strLocalDate.substring(5,7)), parseInt(strLocalDate.substring(8)));
    let strYear = date.getFullYear();
    let strMonth = date.getMonth();
    let strDate = date.getDate();

    if(strYear < 10){
        strYear ="000" + strYear;
    }else if(strYear < 100){
        strYear ="00" + strYear;
    }else if(strYear < 1000){
        strYear = "0" + strYear;
    }

    if(strMonth< 10){ strMonth = "0" + strMonth;}
    if(strDate< 10){ strDate = "0" + strDate;}
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
        strYear ="000" + strYear;
    }else if(strYear < 100){
        strYear ="00" + strYear;
    }else if(strYear < 1000){
        strYear = "0" + strYear;
    }

    if(strMonth< 10){ strMonth = '0' + strMonth;}
    if(strDate< 10){ strDate = "0" + strDate;}
    let value = strYear+"-"+strMonth+"-"+strDate
    return value;
}
