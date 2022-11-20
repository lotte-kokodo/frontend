import React, {useContext, useEffect, useState} from 'react'
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import axios from "axios";
import {ServerConfigContext} from "../../../context/serverConfigProvider";
import {AuthContext} from "../../../context/authProvider";

const SellerChart = () => {
    const {url} = useContext(ServerConfigContext);
    const { sellerHeaders } = useContext(AuthContext);

    const sellerId = localStorage.getItem("sellerId");

    /**
     * 월간 매출 차트
     */
    let monthlySaleDataset =  {
        type: 'line',
        label: '2022년 정산 현황',
        borderColor: 'rgb(155, 17, 30)',
        borderWidth: 2,
        data: Array.from({length: 12}, () => 0)
    };

    /**
     * 월간 주문 차트
     */
    let monthlyOrderDataset =  {
        type: 'bar',
        label: '2022년 주문 현황',
        borderColor: 'rgb(211, 211, 211)',
        borderWidth: 2,
        data: Array.from({length: 12}, () => 0)

    };

    const [initData, setInitData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'],
        datasets: [
            monthlySaleDataset, monthlyOrderDataset
        ]
    });

    const getAnnualSalesInfo = async () =>{
        await axios.get( url + `/calculate-service/calculate/${sellerId}/annualSalesInfo`,{
        }).then(function (resp) {
            // TODO: 백엔드와 연동 시 51-53라인 사용
            // const data = resp.data.result.data;
            // monthlySaleDataset.data = [data.january, data.febuary, data.march, data.april, data.may, data.june,
            //                             data.july, data.august, data.september, data.october, data.november, data.december];

            monthlySaleDataset.data = [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2];

            setInitData(prevState => ({...prevState,
                datasets: [monthlySaleDataset, monthlyOrderDataset]
            }));
        }).catch(function (error) {
            console.log(error);
        })
    }

    const getMonthlyOrderInfo = async () => {
        const api = url + "/seller-service/orders/monthlyCount";

        await axios.get(api, { headers: sellerHeaders })
        .then((resp) => {
            monthlyOrderDataset.data = resp.data.result.data;
            setInitData(prevState => ({...prevState,
                datasets: [monthlySaleDataset, monthlyOrderDataset]
            }));

        })
        .catch((err) => {
            console.log(err);
        });
    }

    useEffect(()=>{
        getAnnualSalesInfo();
        getMonthlyOrderInfo();
    },[]);

    return (
        <>
            <Container>
                <Line type="line" data={initData}/>
            </Container>
        </>
    );
};

export default SellerChart;

const Container = styled.div`
  width: 1000px;
  height: 550px;
  // max-width: 900px;
  display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
`;


// const [initData, setInitData] = useState({
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'],
//     datasets: [
//         {
//             type: 'bar',
//             label: 'Dataset 2',
//             backgroundColor: 'rgb(255, 99, 132)',
//             data: [1, 2, 3, 4, 5, 6],
//             borderColor: 'red',
//             borderWidth: 2,
//         },
//         {
//             type: 'bar',
//             label: 'Dataset 3',
//             backgroundColor: 'rgb(75, 192, 192)',
//             data: [1, 2, 3, 4, 5, 6],
//         }
//     ]
// });

// const options = {
//     plugins: {
//         legend: { display: false }, // 라벨 숨기기
//         tooltip: { // 툴팁 속성 설정
//             backgroundColor: 'rgba(255, 255, 255)',
//             titleColor: 'rgba(225,116,103)',
//             bodyColor: 'rgba(0,0,0)',
//             caretSize: 0,
//             displayColors: false,
//             boxWidth: '100px',
//             borderColor: 'rgba(225,116,103)',
//             borderWidth: 1,
//         },
//     },
//     elements: {
//         point: { // 그래프 꼭짓점 모양
//             pointStyle: 'star',
//             radius: 2,
//         },
//     },
//     scales: {
//         x: { display: false }, // x축 보이지 않음
//         y: {
//             grid: { display: false, drawBorder: false }, //y축 선 없애기
//             position: 'right', // y축 오른쪽에 위치시키기
//             ticks: { color: `#a0a0a0` }, // y축 글자색 변경
//         },
//     },
//     animation: {
//         duration: 0, // 애니메이션 삭제
//     },
// };

// const options = {
//     spanGaps: true,
//     maxBarThickness: 30,
//     grouped: true,
//     interaction: {
//         mode: 'index',
//     },
//     plugins: {
//         legend: {
//             labels: {
//                 usePointStyle: true,
//                 padding: 10,
//                 font: {
//                     family: "'Noto Sans KR', 'serif'",
//                     lineHeight: 1,
//                 },
//             }
//         },
//         tooltip: {
//             backgroundColor: 'rgba(124, 35, 35, 0.4)',
//             padding: 10,
//             bodySpacing: 5,
//             bodyFont: {
//                 font: {
//                     family: "'Noto Sans KR', sans-serif",
//                 }
//             },
//             usePointStyle: true,
//             filter: (item) => item.parsed.y !== null,
//             callbacks: {
//                 title: (context) => context[0].label + '💙',
//                 label: (context) => {
//                     let label = context.dataset.label + '' || '';
//
//                     return context.parsed.y !== null
//                         ? label + ': ' + context.parsed.y + '배'
//                         : null;
//                 },
//             },
//         },
//     },
//     scales: {
//         x: {
//             afterTickToLabelConversion: function (scaleInstance) {
//                 const ticks = scaleInstance.ticks;
//
//                 const newTicks = ticks.map((tick) => {
//                     return {
//                         ...tick,
//                         label: tick.label + '🎵'
//                     };
//                 });
//
//                 scaleInstance.ticks = newTicks;
//             },
//             grid: {
//                 display: false,
//                 drawTicks: true,
//                 tickLength: 4,
//                 color: '#E2E2E230'
//             },
//             axis: 'x',
//             position: 'bottom',
//             ticks: {
//                 minRotation: 45,
//                 padding: 5,
//             },
//         },
//         y: {
//             type: 'linear',
//             grid: {
//                 color: '#E2E2E230',
//             },
//             afterDataLimits: (scale) => {
//                 scale.max = scale.max * 1.2;
//             },
//             axis: 'y',
//             display: true,
//             position: 'left',
//             title: {
//                 display: true,
//                 align: 'end',
//                 color: '#808080',
//                 font: {
//                     size: 12,
//                     family: "'Noto Sans KR', sans-serif",
//                     weight: 300,
//                 },
//                 text: '단위: 배'
//             }
//         },
//         y_sub: {
//             position: 'right',
//             title: {
//                 display: true,
//                 align: 'end',
//                 color: '#808080',
//                 font: {
//                     size: 12,
//                     family: "'Noto Sans KR', sans-serif",
//                     weight: 300,
//                 },
//                 text: '단위: 배'
//             },
//             afterDataLimits: (scale) => {
//                 scale.max = scale.max * 1.2;
//             },
//         },
//     }
// };