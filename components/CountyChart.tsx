import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

export default function CountyChart(
  { historicalData, selectedProperty, propName }: {
    historicalData: CountyHistoricalItem[],
    selectedProperty: string,
    propName: string
  }
) {
  return (
    <ResponsiveContainer>
      <LineChart data={historicalData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          domain={['dataMin', 'dataMax']}
          tickFormatter={(date: number) => (new Date(date)).toLocaleDateString()}
        />
        <YAxis domain={['dataMin', 'auto']} />
        <Tooltip
          labelStyle={{ color: "black" }}
          labelFormatter={(val) => 'Date: ' + (new Date(val)).toLocaleDateString()}
        />
        <Line type="monotone" dataKey={selectedProperty} name={propName} stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
