import Chart from 'react-apexcharts';

export default function Donut() {
  const options = {
    labels: ['1월', '2월', '3월', '4월'],
    title: {
      text: 'NFT유형별 수익금',
      align: 'center',
    },
  };
  const series = [1, 2, 3, 10];

  return (
    <span className="donut">
      <Chart options={options} series={series} type="donut" width="100%" />
    </span>
  );
}
