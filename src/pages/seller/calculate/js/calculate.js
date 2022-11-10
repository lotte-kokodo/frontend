import React from "react"
import axios from "axios"
import "../css/calculate.css"

import {useState, useEffect, useContext} from "react";
import {useNavigate, useParams} from "react-router-dom";
import CalculateTableRow from "../../../../components/calculate/js/calculateTableRow"
import {dateParseToSimple, moneyComma, parseToLocalDate, weekDateParseToLocalDate, monthDateParseToLocalDate} from "../../../../common/calculate/function"
import MakeCoupon from "../../promotion/js/makeCoupon";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";
import {Modal} from "@mui/material";
import CalculatePreviewModal from "../../../../components/calculate/js/calculatePreviewModal";

import { ServerConfigContext } from "../../../../context/serverConfigProvider";


export default function CalculatePresent() {
    const { url } = useContext(ServerConfigContext);
    const params = useParams();

    let history = useNavigate();
    const [choiceCalculate, setChoiceCalculate] = useState("");
    const [modalFlag, setModalFlag] = useState(false);

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
        history(`/seller/${params.sellerId}/calculateList`)
        await axios.post(url + `/calculate-service/calculate/${params.sellerId}/calculateList`,{
            "sellerId" : params.sellerId,
            "startDate" : tmpStartDate + "T"+"00:00:00",
            "endDate" : tmpEndDate +  "T"+"12:59:59",
            "provideStatus": provideStatus,
            "calculateType": calculateType,
            "id": calculateId
        }).then(function (resp) {
            setCalculateList(resp.data.result.data)
            console.log(resp)
            searchResultCnt(resp);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getDay = async() =>{
        await axios.get(url + `/calculate-service/calculate/expectDay`)
            .then(function (resp){
                setCalculateExpectDay(dateParseToSimple(resp))
            }).catch(function (error){
                console.log(error)
            })
    }

    const getMoney = async() =>{
        await axios.get(url + `/calculate-service/calculate/${params.sellerId}/expectMoney`)
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
        console.log(tmpEndDate);
    }

    const getExpectStartDy = async() =>{
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
        getExpectStartDy()
        getExpectEndDay()
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1100,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    
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
                    {/*<th></th>*/}
                </tr>
                </thead>

                <tbody>
                {
                    calculateList.map(function (calculateRow, i) {
                        return (
                            <CalculateTableRow obj={calculateRow} key={i} cnt={i + 1} setModalFlag={setModalFlag} flag={modalFlag} calculateId={calculateRow.calculateId} setChoiceCalculate={setChoiceCalculate}/>
                        )
                    })
                }
                </tbody>
                {/*{modalClose && <CalculatePreviewModal={couponName} onModalDisplay={closeProductModal} couponFlag={listFlag}></CalculatePreviewModal>}*/}
            </table>

            <div>
                <Modal open={modalFlag} onClose={() => setModalFlag(!modalFlag)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <Fade in={modalFlag}>
                        <Box sx={style}>
                            <CalculatePreviewModal sellerId={params.sellerId} calculateId={choiceCalculate}>
                            </CalculatePreviewModal>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        </div>
    );
}