import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Axios } from '../../../core/axios';
import { extractColumn } from '../../../common/utils';

const LineChart = ({ userId }) => {
  const [xAxis, setXAxis] = useState([]);
  const [yAxis, setYAxis] = useState([]);
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: '일별 수익 통계',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: xAxis,
      // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  const series = [
    {
      data: yAxis,
      // data: [30, 40, 35, 50, 49, -60, 70, 91, -125],
    },
  ];

  const fetchDailyIncome = () => {
    Axios.get(`/users/daily/income/${userId}`)
      .then(({ data }) => data)
      .then(({ data }) => {
        const xAxisArray = extractColumn(data, 'tradingDate');
        const yAxisArray = extractColumn(data, 'income');
        console.log(xAxisArray);
        console.log(yAxisArray);

        setXAxis(xAxisArray);
        setYAxis(yAxisArray);
      });
  };

  useEffect(() => {
    fetchDailyIncome();
  }, []);

  return (
    <span className="line">
      <Chart options={options} series={series} type="line" width="100%" />
    </span>
  );
};

export default LineChart;
