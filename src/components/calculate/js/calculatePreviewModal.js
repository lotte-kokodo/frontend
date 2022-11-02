import {useEffect, useState} from "react";
import calculatePreviewModal from "./../css/calculatePreviewModal.css"
import CalculateBottomLine from "./calculateBottomLine";
import axios from "axios";
export default function CalculatePreviewModal(props){

    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const [postponeReason, setPostponeReason] = useState("-")
    const [postponeDay, setPostponeDay] = useState("-");

    const [finalPaymentCost, setFinalPaymentCost] = useState("");
    const [provideStatus, setProvideStatus] = useState("");

    const [basic, setBasic] = useState("");
    const [salesPromotion, setSalesPromotion] = useState("");
    const [firstPaymentDelivery, setFirstPaymentDelivery] = useState("");
    const [deliverySupport, setDeliverySupport] = useState("");
    const [discountSupport, setDiscountSupport] = useState("");
    const [mediumCompanyCostRefund, setMediumCompanyCostRefund] = useState("");
    const [etc, setEtc] = useState("");
    const [commissionSum, setCommissionSum] = useState("");
    // const [fee, setFee] = useState("");

    const getInitInfo = async () => {
        await axios.get(`http://localhost:8001/calculate-service/calculate/${props.sellerId}/calculateModal/${props.calculateId}`,{
        }).then(function (resp) {
            setFinalPaymentCost(resp.data.result.data.finalPaymentCost)
            setProvideStatus(resp.data.result.data.provideStatus)
            // setPostponeReason(resp.data.result.data.ba);
            // setPostponeDay(resp.data.result.data.postPone)

            setBasic(resp.data.result.data.basic);
            setSalesPromotion(resp.data.result.data.salesPromotion);
            setFirstPaymentDelivery(resp.data.result.data.firstPaymentDelivery);
            setDeliverySupport(resp.data.result.data.deliverySupport);
            setDiscountSupport(resp.data.result.data.discountSupport);
            setMediumCompanyCostRefund(resp.data.result.data.mediumCompanyCostRefund);
            setEtc(resp.data.result.data.etc);
            setCommissionSum(resp.data.result.data.commissionSum);
            // setFee(resp.data.result.data.fee);

            setBankName(resp.data.result.data.bankName);
            setAccountNumber(resp.data.result.data.accountNumber);
            setAccountHolder(resp.data.result.data.accountHolder);
            console.log(resp)
        }).catch(function (error) {
            console.log(error);
        })
    }


    useEffect(() =>{
        getInitInfo();
        console.log(props);
    }, []);
    return(
            <>
                <h1 className=""> 매출 상세 내역 </h1>
                <CalculateBottomLine></CalculateBottomLine>
                <div className="calculate-modal-flex">
                    <div className="calculate-model-left-layout">
                        <div className="calculate-modale-category-font">지급 정보 확인</div>
                        <div className="calculate-modal-provide-background">
                            <div className="calculate-modal-flex calculate-modal-left-font">
                                <div className="test">은행명</div>
                                <div className="calculate-model-left-inner-font1">{bankName}</div>
                            </div>
                            <div className="calculate-modal-flex calculate-modal-left-font">
                                <div>계좌번호</div>
                                <div className="calculate-model-left-inner-font2">{accountNumber}</div>
                            </div>
                            <div className="calculate-modal-flex calculate-modal-left-font">
                                <div>예금주</div>
                                <div className="calculate-model-left-inner-font3">{accountHolder}</div>
                            </div>
                            <div className="calculate-modal-flex calculate-modal-left-font">
                                <div>지급상태</div>
                                <div className="calculate-model-left-inner-font4">{provideStatus}</div>
                            </div>
                            <div className="calculate-modal-flex calculate-modal-left-font">
                                <div>보류사유</div>
                                <div className="calculate-model-left-inner-font5">{postponeReason}</div>
                            </div>
                            <div className="calculate-modal-flex calculate-modal-left-font">
                                <div>보류일자</div>
                                <div className="calculate-model-left-inner-font6">{postponeDay}</div>
                            </div>
                        </div>
                    </div>
                    <div className="calculate-modal-left-margin calculate-modal-flex calculate-modal-right-layout">
                        <div>
                            <div className="calculate-modal-flex">
                                <div className="calculate-modale-category-font">매출금액</div>
                                <div>(A)</div>
                            </div>
                            <div className="calculate-modal-flex calculate-modal-right-bottom-font-margin">
                                <div className="calculate-modale-category-font">서비스이용료</div>
                                <div>(A)</div>
                            </div>
                        </div>
                        <div className="">
                            <div className="calculate-modal-right-text-layout">
                                <div className="calculate-modal-flex">
                                    <div>기본수수료(a)</div>
                                    <div className="calculate-modal-right-innerfont1">{basic}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-right-font">
                                    <div>판촉부담액(b)</div>
                                    <div className="calculate-modal-right-innerfont2">{salesPromotion}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-right-font">
                                    <div>선결제 배송비 수수료(c)</div>
                                    <div className="calculate-modal-right-innerfont3">{firstPaymentDelivery}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-right-font">
                                    <div>배송 지원비(d)</div>
                                    <div className="calculate-modal-right-innerfont4">{deliverySupport}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-right-font">
                                    <div>할인 지원(e)</div>
                                    <div className="calculate-modal-right-innerfont5">{discountSupport}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-right-font">
                                    <div>영중소 환금액(f)</div>
                                    <div className="calculate-modal-right-innerfont8">{mediumCompanyCostRefund}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-right-font">
                                    <div>기타</div>
                                    <div className="calculate-modal-right-innerfont9">{etc}</div>
                                </div>
                                <div className="calculate-modal-flex calculate-modal-sum-margin">
                                    <div className="">소계</div>
                                    <div>((a+b+c)-(d+e+f))</div>
                                    <div className="calculate-modal-right-innerFont6">{commissionSum}</div>
                                </div>
                                {/*<div className="calculate-modal-flex sum-layout calculate-modal-right-font">*/}
                                {/*    <div>이용료</div>*/}
                                {/*    <div className="calculate-modal-right-innerFont7">{fee}</div>*/}
                                {/*</div>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </>
    )
}