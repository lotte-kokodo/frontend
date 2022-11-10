import React from 'react'
import styled from 'styled-components';
import {Line} from 'react-chartjs-2';
import Chart from 'chart.js/auto';


const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            type: 'line',
            label: 'Dataset 1',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [1, 2, 3, 4, 5],
        },
        {
            type: 'bar',
            label: 'Dataset 2',
            backgroundColor: 'rgb(255, 99, 132)',
            data: [1, 2, 3, 4, 5, 6],
            borderColor: 'red',
            borderWidth: 2,
        },
        {
            type: 'bar',
            label: 'Dataset 3',
            backgroundColor: 'rgb(75, 192, 192)',
            data: [1, 2, 3, 4, 5, 6],
        },
    ],
};

const SellerChart = () => {
    return (
        <Container>
            <Line type="line" data={data} />
        </Container>
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