import Chart from 'react-apexcharts';

export default function Line() {
  const options = {
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'straight',
    },
    title: {
      text: 'NFT 거래로 기부단체에 후원된 금액',
      align: 'center',
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
  };

  const series = [
    {
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    },
  ];

  // componentDidMount(props) {
  //   console.log(this.props)
  // };

  return (
    <span className="line">
      <Chart options={options} series={series} type="line" width="100%" />
    </span>
  );
}
