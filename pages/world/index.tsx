import axios from 'axios';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useSWR from 'swr';

import Layout from '../../components/Layout';
import WorldStatistics from '../../components/WorldStats';
import { computeHistoricalItems, worldProperties } from '../../model/utils';
import WorldChart from '../../components/WorldChart';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function World() {
  const { data, error } = useSWR<WorldHistoricalData, any>('https://corona.lmao.ninja/v3/covid-19/historical/all', fetcher);
  const [selectedProperty, setSelectedProperty] = useState('casesToday');

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
  const propName = worldProperties[selectedProperty];

  return (
    <Layout>
      <h1 className="mt-2 text-center">World Information</h1>

      <hr className="background-white" />

      <WorldStatistics stats={currentData} />

      <hr className="background-white" />

      <h2 className="mt-2 mb-4">Trends</h2>

      <div className="mb-4">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="type-dropdown">
            {propName}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-list">
            {Object.keys(worldProperties).map(key => (
              <Dropdown.Item key={key} onClick={() => setSelectedProperty(key)}>{worldProperties[key]}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="chart-container">
        <WorldChart
          historicalData={historicalData}
          selectedProperty={selectedProperty}
          propName={propName}
        />
      </div>
    </Layout>
  );
}
