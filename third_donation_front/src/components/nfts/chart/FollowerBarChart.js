import Chart from 'react-apexcharts';

export default function FollowBar() {
  const options = {
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    title: {
      text: '일별, 주간별, 달별 팔로워 수 데이터 ',
      align: 'center',
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
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
    <span className="followbar">
      <Chart options={options} series={series} type="bar" width="100%" />
    </span>
  );
}
