import { ResponsiveLine } from '@nivo/line';
import { ResponsivePie } from '@nivo/pie';

export const LineChart = ({ data }) => {
  const chartData = [
    {
      id: 'Income',
      color: '#4ade80',
      data: data.map(item => ({ x: item.month, y: item.income })),
    },
    {
      id: 'Expense',
      color: '#f87171',
      data: data.map(item => ({ x: item.month, y: item.expense })),
    },
  ];

  return (
    <div className="h-64">
      <ResponsiveLine
        data={chartData}
        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
        colors={['#4ade80', '#f87171']}
        lineWidth={2}
        pointSize={6}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        enableArea={true}
        areaOpacity={0.1}
        animate={true}
        motionConfig="gentle"
      />
    </div>
  );
};

export const PieChart = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={3}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        animate={true}
        motionConfig="gentle"
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#fff"
      />
    </div>
  );
};