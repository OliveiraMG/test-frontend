import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import styled from 'styled-components';
import { fetchCMVData } from '../services/api';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ChartContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const CMVChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const fetchData = async () => {
    try {
      const response = await fetchCMVData();
      const data = response.data;

      const years = [...new Set(data.map(item => item.year))];
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#E74C3C', '#8E44AD', '#3498DB'];

      const datasets = years
        .map((year, index) => {
          const yearData = data.filter(item => item.year === year);
          const monthlyData = months.map((_, monthIndex) => {
            const monthData = yearData.find(item => item.month === monthIndex);
            return monthData ? monthData.value : 0;
          });

          if (monthlyData.every(value => value === 0)) {
            return null;
          }

          return {
            label: year.toString(),
            data: monthlyData,
            fill: false,
            borderColor: colors[index % colors.length],
          };
        })
        .filter(dataset => dataset !== null);

      const totalDataset = {
        label: 'Total',
        data: months.map((_, monthIndex) => {
          const monthData = data.filter(item => item.month === monthIndex);
          return monthData.reduce((sum, item) => sum + item.value, 0);
        }),
        fill: false,
        borderColor: '#75aaff',
      };

      datasets.push(totalDataset);

      setChartData({
        labels: months,
        datasets: datasets,
      });

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <ChartContainer>
      <h2>CMV - Custo mercadoria vendida</h2>
      {chartData.datasets.length > 0 ? (
        <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
      ) : (
        <p>Loading...</p>
      )}
    </ChartContainer>
  );
};

export default CMVChart;
