import React from "react"
import axios from "axios"
import "../css/calculate.css"

import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";

export default function CalculatePresent() {

    const params = useParams();

    let history = useNavigate();
    const [calculateList, setCalculateList] = useState([]);
    const [provideStatus, setProvideStatus] = useState("ALL");
    const [calculateType, setCalculateType] = useState("MAIN_CALCULATE");

    const [calculateId, setCalculateId] = useState("");

    const [calculateExpectDay, setCalculateExpectDay] = useState("");
    const [calculateExpectMoney, setCalculateExpectMoney] = useState("");

    const [tmpStartDate, setTmpStartDate] = useState("");
    const [tmpEndDate, setTmpEndDate] = useState("");

    const [resultCnt, setResultCnt] = useState("0");

    const provideStatusChange = (e) => {setProvideStatus(e.target.value);};
    const calculateTypeStatusChange = async (e) => {setCalculateType(e.target.value);};
    const changeCalculateId = (e) => {setCalculateId(e.target.value);}

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
        history(`/seller/${params.sellerId}/calculate`)
        await axios.post(`http://localhost:8001/calculate-service/calculate/${params.sellerId}/calculateList`,{
            "sellerId" : params.sellerId,
            "startDate" : tmpStartDate + "T"+"00:00:00",
            "endDate" : tmpEndDate +  "T"+"00:00:00",
            "provideStatus": provideStatus,
            "calculateType": calculateType,
            "id": calculateId
        }).then(function (resp) {
            setCalculateList(resp.data.result.data)
            searchResultCnt(resp);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getDay = async() =>{
        await axios.get(`http://localhost:8001/calculate-service/calculate/expectDay`)
            .then(function (resp){
                setCalculateExpectDay(dateParseToSimple(resp))
            }).catch(function (error){
                console.log(error)
            })
    }

    const getMoney = async() =>{
        await axios.get(`http://localhost:8001/calculate-service/calculate/${params.sellerId}/expectMoney`)
            .then(function (resp){
                setCalculateExpectMoney(moneyComma(resp.data.result.data));
            }).catch(function (error){
                console.log(error)
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

    const fetchRecentDate = () =>{
        console.log("before " + tmpEndDate)
        setTmpStartDate(weekDateParseToLocalDate(tmpEndDate));
        console.log("after " + tmpEndDate)
    }

    const fetchRecentMonth = () =>{
        setTmpStartDate(monthDateParseToLocalDate(tmpEndDate));
    }
    //유저 아이드, 날짜를 전달해줘야 한다.
    useEffect( () => {
        getDay();
        getMoney();
        getExpecStartDy()
        getExpectEndDay()
    }, []);

    return (
        <div className="body">
            <div>
                <div className="calculate-title-box">정산현황</div>
                <div className="calculate-header-box">
                    <div className="calculate-expect-day"> &#183; 정산 지급 예정일 &nbsp;:</div>
                    <div> &nbsp; {calculateExpectDay}</div>
                    <div className="calculate-expect-money"> &#183; 예상 금액 &nbsp;:</div>
                    <div> &nbsp; {calculateExpectMoney}</div>
                </div>
            </div>
            <div>
                <div className="calculate-title-search-condition-box">검색 조건</div>
                <div className="calculate-search-criteria-box">
                    <div className="calculate-criteria-day-box">기준일</div>
                    <div className="calculate-criteria-unit">
                        <div>
                            <select className="calculate-day-box" name="criteriaDay">
                                <option value="정산일">정산일</option>
                            </select>
                        </div>
                        {/*<p><input type="number" name="number" placeholder="정산일"/></p>*/}
                        {/*date-date-inline-licker는 누군가 문자열을 입력하기 이전까지 빈 문자열값이다*/}
                        <input className="calculate-calender-box" type="date" data-date-inline-picker="true" value={tmpStartDate} onChange={startDateChange}/>
                        <div> ~ </div>
                        <input type="date" data-date-inline-picker="true" value={tmpEndDate} onChange={endDateChange}/>
                        <input type="button" className="calculate-criteria-button1" value="최근 1주" onClick={fetchRecentDate}/>
                        <input type="button" className="calculate-criteria-button2" value="최근 1달" onClick={fetchRecentMonth}/>
                    </div>
                </div>
            </div>
            {/*(1)html 클릭시에도 라디오버트 활성화 할 경우 사용*/}
            {/*<use componet></use>*/}
            <div>
                <div className="calculate-provide-status-border">
                    <div className="calculate-title-provide-status-box">지급상태</div>
                    <input name="prvidesuccess" className="calculate-radio-unit" type="radio"/>
                    <div className="calculate-radio-unit2" value="">전체</div>
                    <input name="prvidesuccess" id='test' className="calculate-radio-unit" value="PROVIDE_SUCCESS" type="radio" onClick={provideStatusChange}/>
                    {/*(1)<label name="prvidesuccess" htmlFor='test' className="calculate-radio-unit2" value='sa' >지급확정</label>*/}
                    <div name="prvidesuccess" className="calculate-radio-unit2" >지급확정</div>
                    <input name="prvidesuccess" className="calculate-radio-unit" value="PROVIDE_SCHEDULE" type="radio" onClick={provideStatusChange}/>
                    <div className="calculate-radio-unit2" value="PROVIDE_SCHEDULE">지급예정</div>
                    <input name="prvidesuccess"className="calculate-radio-unit" value="PROVIDE_POSTPONE" type="radio" onClick={provideStatusChange}/>
                    <div className="calculate-radio-unit2" value="PROVIDE_POSTPONE">지급보류</div>
                </div>
            </div>
            <div className="calculate-type-common-box">
                <div className="calculate-calculate-type-box">정산유형</div>
                <div>
                    <select className="calculate-type-typelist" name="calculateTypeList" onChange={calculateTypeStatusChange}>
                        <option name="calculateTypeList" value="MAIN_CALCULATE" >주정산</option>
                        <option name="calculateTypeList" value="FINAL_AMOUNT_CALCULATE" >최종액 정산</option>
                    </select>
                </div>
                <div className="calculate-search-detail-box">
                    <div className="calculate-condition-detail-box">상세 조건</div>
                    <div className="calculate-detail-condition-list">
                        <select name="detatilCondition">
                            <option value="옵션ID">옵션ID</option>
                        </select>
                        <input className="calculate-condition-detail-input" type="text" placeholder="" onChange={changeCalculateId}/>
                    </div>
                </div>
            </div>
            &nbsp;
            <div>
                <button type="button" className="calculate-button" value="" onClick={searchContent}>
                    <i className="fas fa-search"></i> 검색
                </button>
            </div>
            <div className="calculate-bottom-result-box">
                <div className="calculate-search-result-box">검색 결과</div>
                <div className="calculate-search-result-cnt-box"> (총 {resultCnt}건)</div>
            </div>
            <table className="table calculate-table">
                <thead>
                <tr>
                    <th>정산일</th>
                    <th>정산유형</th>
                    <th>지급비율</th>
                    <th>지급상태</th>
                    <th>최종지급액</th>
                    <th>주문상세내역</th>
                </tr>
                </thead>

                <tbody>
                {
                    calculateList.map(function (calculateRow, i) {
                        return (
                            <CalculateTableRow obj={calculateRow} key={i} cnt={i + 1}/>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
}

function CalculateTableRow(row) {
    return (
        <tr>
            <th> {dateParseToSimple2(row)}</th>
            <td>{provideTypeToValue(row.obj.type)}</td>
            <td>{row.obj.supportRate}</td>
            <td>{provideStatusToValue(row.obj.provideStatus)}</td>
            <td className="searchResultMoneyRow">{moneyComma(row.obj.finalPaymentCost)}</td>
            <td>tmp</td>
        </tr>
    )
}

function provideTypeToValue(str){
    let ret;
    if(str === "MAIN_CALCULATE") ret = "주 정산"
    else if(str === "FINAL_AMOUNT_CALCULATE") ret = "최종액 정산"
    return ret;
}

function provideStatusToValue(str){
    let ret;
    if(str === "PROVIDE_SUCCESS") ret = "지급확정"
    else if(str === "PROVIDE_SCHEDULE") ret = "지급예정"
    else if(str === "PROVIDE_POSTPONE") ret = "지급보류"
    return ret;
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

