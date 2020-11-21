import {
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import HistoricalItem from '../model/HistoricalItem';

export default function UsChart({
  isScatter, selectedProperty, propName, historicalData
}: {
  isScatter: boolean,
  selectedProperty: string,
  propName: string,
  historicalData: HistoricalItem[]
}) {
  return (
    <ResponsiveContainer>
      {isScatter ? (
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            domain={['dataMin', 'dataMax']}
            name="Date"
            tickFormatter={(date: number) => (new Date(date)).toLocaleDateString()}
            type="number" />
          <YAxis
            dataKey={selectedProperty}
            domain={['dataMin', 'auto']}
            name={propName} />
          <Tooltip formatter={(val, x, y, idx) => idx ? y.value : (new Date(val)).toLocaleDateString()} />
          <Scatter
            name={propName}
            data={historicalData}
            fill="#8884d8"
          />
        </ScatterChart>
      ) : (
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
              formatter={(val, x, y) => [y.value, propName]}
            />
            <Line type="monotone" dataKey={selectedProperty} name={propName} stroke="#8884d8" />
          </LineChart>
        )}
    </ResponsiveContainer>
  );
}