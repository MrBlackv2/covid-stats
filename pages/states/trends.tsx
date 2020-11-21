import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useSWR from 'swr';
import { ScatterChart, Scatter, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

import StateHistoricalItem, { stateHistoricalProperties } from '../../classes/StateHistoricalItem';
import Layout from '../../components/Layout';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function UsTrends() {
  const { data: statesData, error: statesError } = useSWR<StateMetadata[], any>('https://api.covidtracking.com/v1/states/info.json', fetcher);
  const [selectedState, setSelectedState] = useState<StateMetadata | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<string>('positiveIncrease');
  const [historicalData, setHistoricalData] = useState<StateHistoricalItem[]>([]);

  const loadStateTrend = async (state: string) => {
    try {
      const response = await axios.get<any, AxiosResponse<StateHistoricalData[]>>(`https://api.covidtracking.com/v1/states/${state}/daily.json`);
      const historicalItems = response.data
        .map(item => new StateHistoricalItem(item));
      setHistoricalData(historicalItems.reverse());
    } catch (err) {
      console.error('Error loading historical data');
    }
  };

  useEffect(() => {
    if (selectedState === null && statesData && !statesError) {
      setSelectedState(statesData[0]);
    }
  }, [statesData]);

  useEffect(() => {
    if (selectedState?.state) {
      loadStateTrend(selectedState.state.toLowerCase());
    }
  }, [selectedState]);

  if (statesError) {
    return (
      <Layout>
        <h2>Failed to Load Data!</h2>
      </Layout>
    );
  }

  if (!statesData) {
    return (
      <Layout>
        <h2>Loading Data...</h2>
      </Layout>
    );
  }

  const propName = stateHistoricalProperties[selectedProperty];

  return (
    <Layout>
      <div className="container">
        <h2>Trends by State</h2>

        {selectedState && (
          <div className="d-flex mb-2">
            <Dropdown className="mr-4">
              <Dropdown.Toggle variant="success" id="state-dropdown">
                {selectedState.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {statesData.map(data => (
                  <Dropdown.Item key={data.state} onClick={() => setSelectedState(data)}>{data.name}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="info" id="type-dropdown">
                {propName}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {Object.keys(stateHistoricalProperties).map(key => (
                  <Dropdown.Item key={key} onClick={() => setSelectedProperty(key)}>{stateHistoricalProperties[key]}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}

        <hr />

        <div className="chart-container">
          <ResponsiveContainer>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                domain={['auto', 'auto']}
                name="Date"
                tickFormatter={(date: number) => (new Date(date)).toLocaleDateString()}
                type="number" />
              <YAxis dataKey={selectedProperty} name={propName} />
              <Tooltip labelStyle={{ color: "black" }} formatter={(val, x, y) => [y.value, propName]} />
              <Scatter
                data={historicalData}
                fill="#8884d8"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
}
