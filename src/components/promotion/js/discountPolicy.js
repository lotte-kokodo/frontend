import axios from 'axios';
import React, { useState } from 'react';
import styled from "styled-components";
import DatePicker from "react-datepicker";

// import "../css/discountPolicy.css";
import "react-datepicker/dist/react-datepicker.css";
import { mockComponent } from 'react-dom/test-utils';
import moment, { min } from 'moment';






function DiscountPolicy() {
    const [discountPolicyName, setDiscountPolicyName] = useState('');
    const regDate = moment().format('YYYY:MM:DDTHH:mm:SS');
    const [startDate, setStartDate] = useState(new Date(), 'yyyy:mm:dd');
    const [endDate, setEndDate] = useState(new Date(), 'yyyy:mm:dd');

    const [rate, setRate] = useState(0);
    const [rateMinPrice, setRateMinPrice] = useState(0);

    const [price, setPrice] = useState(0);
    const [fixMinPrice, setFixMinPrice] = useState(0);
    const [radioCheck, setRadioCheck] = useState('');
    const [productId, setProductId] = useState(0);



    const radioButtonCheck = (e) => {
        console.log(e.target.value);
        setRadioCheck(e.target.value);

        switch(e.target.value) {
            case 'rate':
                setPrice(0);
                setFixMinPrice(0);
                break;
            case 'fix':
                setRate(0);
                setRateMinPrice(0);
                break;
        }
    }

    const makePolicy = (e) => {
        e.preventDefault();
        if (radioCheck === 'fix') {
            // console.log(radioCheck + "makepolicy");
            makeFixPolicy();
        }
        else if (radioCheck === 'rate') {
            // console.log(radioCheck + "makepolicy");
            makeRatePolicy();
        }
    }

    const makeRatePolicy = async () => {
        let ratePolicyDto = {
            name: discountPolicyName,
            regDate: regDate,
            startDate: startDate,
            endDate: endDate,
            rate: rate,
            minPrice: rateMinPrice,
            productId: 1
            // 추후 체크박스로 갖고오기
        }
        console.log(ratePolicyDto);
        await axios({
            method: "post",
            url: "http://localhost:9011/rate-discount/save",
            data: ratePolicyDto
        })
            .then(function (resp) {
                alert(resp.value);
            })
            .catch(function (error) {
                alert(error.value);
            })
    }

    const makeFixPolicy = async () => {
        await axios({
            method: "post",
            url: "http://localhost:9011/fix-discount/save",
            // data: params
        })
            .then(function (resp) {
                alert(resp.value);
            })
            .catch(function (error) {
                alert(error.value);
            })
    }

    // function FetchProduct() {
    //         const fetchProduct = (productId) => {
    //             axios({
    //                 method: "get",
    //                 url: "http://localhost:8080/product/아이디적어",
    //                 // data: params
    //             })
    //                 .then(function (resp) {
    //                     alert(resp);
    //                 })
    //                 .catch(function (error) {
    //                     alert(error);
    //                 })

    //         }
    //         fetchProduct();

    //         return (
    //             <tr>
    //                 <td></td>
    //             </tr>
    //         )
    // }

    return (
        <div>
            <div>
                <h1>정책 정보 입력</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                정책명
                            </th>
                            <td>
                                <input type="text" onChange={(e) => setDiscountPolicyName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <th>
                                정책 발행일시
                            </th>
                            <td>
                                {regDate}
                            </td>
                        </tr>
                        <tr>
                            <th>
                                정책 유효기간
                            </th>
                            <td>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            </td>
                            <td>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                />
                            </td>
                            <td>
                                발행일로부터 : {moment.duration(endDate - startDate).asDays() + 1}일
                            </td>
                        </tr>

                        <tr>
                            <th>
                                할인 방식
                            </th>
                            <td>
                                <label>
                                    <input
                                        type="radio"
                                        value="rate"
                                        checked={radioCheck === "rate"}
                                        onChange={(e) => radioButtonCheck(e)} />
                                    정률
                                </label>
                                <input type="input" onChange={(e) => setRateMinPrice(e.target.value)} value={rateMinPrice}/> 원 이상 구매시 <input type="input" onChange={(e) => setRate(e.target.value)} value={rate}/> % 할인
                            </td>
                            <td>
                                <label>
                                    <input
                                        type="radio"
                                        value="fix"
                                        checked={radioCheck === "fix"}
                                        onChange={(e) => radioButtonCheck(e)} />
                                    정액
                                </label>
                                <input type="input" onChange={(e) => setFixMinPrice(e.target.value)} value={fixMinPrice}/> 원 이상 구매시 <input type="input" onChange={(e) => setPrice(e.target.value)} value={price}/> 원 할인
                            </td>
                        </tr>
                    </tbody>
                </table>


            </div>
            <div>
                <h1>정책 적용 상품 추가</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>
                                상품 추가 방식
                            </th>
                            <td>
                                옵션 ID 추가
                            </td>
                        </tr>
                        <tr>
                            <th>
                                옵션 ID로 추가
                            </th>
                            <td>
                                <input type="input" />
                                <button type="button">조회</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div>
                {/* 여기 list를 보여줘야함 */}
                {/* 선택하는 버튼을 누르면 옵션ID에 추가 */}
                <h1>쿠폰 적용 상품</h1>
                <div>
                    총 n 건
                </div>
                <table>
                    <thead>
                        <tr>
                        <input type='checkbox'></input>
                            <th>product_id</th>
                            <th>category_id</th>
                            <th>name</th>
                            <th>price</th>
                            <th>display_name</th>
                            <th>stock</th>
                            <th>deadline</th>
                            <th>thumbnail</th>
                            <th>seller_id</th>
                            <th>delivery_fee</th>
                            <th>created_date</th>
                            <th>last_modified_date</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <input type='checkbox'></input>
                            <td>1</td>
                            <td>1</td>
                            <td>닭찌1</td>
                            <td>10000</td>
                            <td>저쩌고 닭가슴살</td>
                            <td>100</td>
                            <td>2022-09-11</td>
                            <td>thumbnail</td>
                            <td>1</td>
                            <td>3000</td>
                            <td>2022-09-11</td>
                            <td>2022-09-11</td>
                        </tr>
                        <tr>
                        <input type='checkbox'></input>
                            <td>2</td>
                            <td>1</td>
                            <td>닭가슴살2</td>
                            <td>7000</td>
                            <td>어쩌고 닭가슴살</td>
                            <td>200</td>
                            <td>2022-09-11</td>
                            <td>thumbnail</td>
                            <td>1</td>
                            <td>3000</td>
                            <td>2022-09-11</td>
                            <td>2022-09-11</td>
                        </tr>
                    </tbody>
                    {/* <FetchProduct /> */}
                </table>
            </div>
            <div>
                <button type='button' onClick={makePolicy}>등록</button>
            </div>
        </div>
    )
}

export default DiscountPolicy;