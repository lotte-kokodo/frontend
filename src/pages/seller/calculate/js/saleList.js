import React from "react"
import axios from "axios"
import "../css/saleList.css"
import "../../promotion/css/couponManagement.css"
import Pagination from "react-js-pagination";
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
import salesImage from "../../../../src_assets/seller/title/sales-title.png";

export default function SaleList() {
    const { url } = useContext(ServerConfigContext);
    const sellerId = localStorage.getItem("sellerId")

    let today = new Date();
    today.setDate(today.getDate() + 1)

    let pastTime = new Date();
    pastTime.setDate(today.getDate() - 7)

    let history = useNavigate();
    const [saleList, setSaleList] = useState([]);
    const [searchCondition, setSearchCondition] = useState("");

    const [tmpStartDate, setTmpStartDate] = useState(() => pastTime.toISOString().substring(0, 10));
    const [tmpEndDate, setTmpEndDate] = useState(() => today.toISOString().substring(0, 10));

    const provideStatusChange = (e) => {setSearchCondition(e.target.value);};

    const startDateChange = (e) => {
        setTmpStartDate(e.target.value);
    }

    const endDateChange = (e) => {
        setTmpEndDate(e.target.value);
    }

    const [count, setCount] = useState(0); //아이템 총 수
    const [currentpage, setCurrentpage] = useState(1); //현재페이지
    const [postPerPage] = useState(5); //페이지당 아이템 개수
    const [searchFlag, setSearchFlag] = useState(false);

    const [indexOfLastPost, setIndexOfLastPost] = useState(0);
    const [indexOfFirstPost, setIndexOfFirstPost] = useState(0);
    const [currentPosts, setCurrentPosts] = useState([]);

    const searchContent = async (page) => {
        // history(`/seller/${sellerId}/saleList`)
        await axios.get(url + `/calculate-service/commission/saleList?sellerId=${sellerId}&startDate=${tmpStartDate}T00:00:00&endDate=${tmpEndDate}T12:59:59&page=${currentpage -1}&size=${postPerPage}`,{
            // "sellerId" : sellerId,
            // "startDate" : tmpStartDate + "T"+"T00:00:00",
            // "endDate" : tmpEndDate +  "T"+"12:59:59",
            // "searchCondition": searchCondition
        }).then(function (resp) {
            console.log(resp);
            setSearchFlag(true)
            setCount(resp.data.result.data.totalElements)
            setSaleList(resp.data.result.data.content)
        }).catch(function (error) {
            console.log(error);
        })
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

    const setPage = (e) => {
        setCurrentpage(e);
    };

    const Paging = ({page, count, setPage}) => {
        return (
            <Pagination
                activePage={page}
                itemsCountPerPage={5}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                prevPageText={"<"}
                nextPageText={">"}
                onChange={setPage} />
        );
    }

    useEffect(() => {
        setCount(count);
        setIndexOfLastPost(currentpage * postPerPage);
        setIndexOfFirstPost(indexOfLastPost - postPerPage);
        setCurrentPosts(saleList);
    }, [currentpage, indexOfFirstPost, indexOfLastPost, saleList, postPerPage]);

    useEffect(() => {
        searchContent( );
    },[currentpage]);

    return (
        <div className="body">
            <div className="saleList-management-title"></div>
            <div className="coupon-management-title">
                <img src={salesImage} className="coupon-management-img"></img>
                <h2 className="coupon-management-title-h3">매출 내역</h2>
            </div>
            {/* <div>
                <div className="saleList-title-box">매출내역</div>
            </div> */}
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
                    {/*<div className="saleList-provide-status-border">*/}
                    {/*    <div className="saleList-title-provide-status-box">조회조건</div>*/}
                    {/*    <input name="prvidesuccess" className="saleList-radio-unit" value="PROVIDE_SCHEDULE" type="radio" onClick={provideStatusChange} checked/>*/}
                    {/*    <div className="saleList-radio-unit2" value="PROVIDE_SCHEDULE">업체별</div>*/}
                    {/*    <input name="prvidesuccess"className="saleList-radio-unit" value="PROVIDE_POSTPONE" type="radio" onClick={provideStatusChange}/>*/}
                    {/*    <div className="saleList-radio-unit2" value="PROVIDE_POSTPONE">상품별</div>*/}
                    {/*</div>*/}
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
                <div className="saleList-search-result-cnt-box"> (총 {count}건)</div>
            </div>
            <table className="table saleList-table">
                <thead>
                <tr className="text-center">
                    <th>상호(판매자코드)</th>
                    <th>정산유형</th>
                    <th>구분</th>
                    <th>매출금액(A)</th>
                    <th>판매수수료(B)</th>
                    <th>정산대상액(A-B=C)</th>
                    <th>전담택배비(D)</th>
                    <th>판매자서비스이용료(E)</th>
                    <th>패널티</th>
                    {/*<th>상세다운로드</th>*/}
                </tr>
                </thead>

                <tbody>
                {
                    currentPosts.map(function (saleListRow, i) {
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
            <div className="pagingProduct">
                {searchFlag && <Paging page={currentpage} count={count} setPage={setPage} /> }
            </div>
        </div>
    );
}

function SaleListTableRow(row) {
    return (
            <tr className="table-whole">
                <td className="saleList-table-number py-0 pl-0 pr-0" >
                    <div className="saleList-entire-cycle">{row.obj.sellerId}</div>
                </td>
                <td className="saleList-table-calculateType py-0 pl-0 pr-0">
                    <div className="saleList-entire-cycle"> {provideTypeToValue(row.obj.calculateType)} </div>
                </td>
                <td className="saleList-table-td pl-0 py-0 pr-0">
                    <div className="saleList-inner-outLine">판매액</div>
                    <div className="saleList-inner-outLine2">배송료</div>
                    <div className="saleList-inner-outLine3">합계</div>
                </td>
                <td className="saleList-table-saleMoney py-0 pl-0 pr-0">
                    <div className="saleList-inner-outLine">{moneyComma(row.obj.saleSum)}</div>
                    <div className="saleList-inner-outLine2">{0}</div>
                    <div className="saleList-inner-outLine3">{moneyComma(row.obj.sum)}</div>
                </td>
                {/*판매수수료*/}
                <td className="saleList-table-saleCommission py-0 pl-0 pr-0">
                    <div className="saleList-inner-outLine">{moneyComma(row.obj.saleCommission)}</div>
                    <div className="saleList-inner-outLine2">0</div>
                    <div className="saleList-inner-outLine3">{moneyComma(row.obj.saleCommission)}</div>
                </td>
                {/*정산대상액*/}
                <td className="saleList-table-calculateTarget py-0 pl-0 pr-0">
                    <div className="saleList-entire-cycle">
                        {moneyComma(row.obj.settlementMoney)}
                    </div>
                </td>
                {/*전담택배비*/}
                <td className="saleList-table-deliveryCost py-0 pl-0 pr-0">
                    <div className="saleList-entire-cycle">0</div>
                </td>
                {/*판매자서비스이용료*/}
                <td className="saleList-table-seller-service-cost py-0 pl-0 pr-0">
                    <div className="saleList-entire-cycle">0</div>
                </td>
                {/*패널티*/}
                <td className="saleList-table-selle-panalty py-0 pl-0 pr-0">
                    <div className="saleList-entire-cycle">0</div>
                </td>
                {/*상세 다운로드*/}
                {/*<td className="saleList-table-selle-down py-0 pl-0 pr-0">*/}
                {/*    <div className="saleList-entire-cycle">상세 다운로드</div>*/}
                {/*</td>*/}
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
