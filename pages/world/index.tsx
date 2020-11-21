import axios from 'axios';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';
import useSWR from 'swr';

import Layout from '../../components/Layout';
import WorldStatistics from '../../components/WorldStats';
import { computeHistoricalItems } from '../../model/utils';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function World() {
  const { data, error } = useSWR<WorldHistoricalData, any>('https://corona.lmao.ninja/v3/covid-19/historical/all', fetcher);

  if (error) {
    return (
      <Layout>
        <h2>Failed to Load Data!</h2>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <h2>Loading Data...</h2>
      </Layout>
    );
  }

  const historicalData = computeHistoricalItems(data);
  const currentData = historicalData[historicalData.length - 1];

  return (
    <Layout>
      <h1 className="mt-2 text-center">World Information</h1>

      <hr className="background-white" />

      <WorldStatistics stats={currentData} />

      <hr className="background-white" />

      <h2 className="mt-2 mb-4">Trends</h2>

      <div className="chart-container">
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
            <Line type="monotone" dataKey="cases" name="Cases" stroke="#8884d8" />
            <Line type="monotone" dataKey="deaths" name="Deaths" stroke="#ff2222" />
            <Line type="monotone" dataKey="recovered" name="Recovered" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Layout>
  );
}
