import axios from 'axios';
import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useSWR from 'swr';

import StateHistoricalItem from '../model/StateHistoricalItem';
import Layout from '../components/Layout';
import Statistics from '../components/StateStats';
import UsChart from '../components/UsChart';
import { stateProperties } from '../model/utils';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Home() {
  const { data: usData, error: usError } = useSWR<UsHistoricalData[], any>('https://api.covidtracking.com/v1/us/daily.json', fetcher);
  const [isScatter, setIsScatter] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>('positiveIncrease');

  if (usError) {
    return (
      <Layout>
        <h2>Failed to Load Data!</h2>
      </Layout>
    );
  }

  if (!usData) {
    return (
      <Layout>
        <h2>Loading Data...</h2>
      </Layout>
    );
  }

  const today = new Date();
  const historicalData = usData
    .map(item => new StateHistoricalItem(item))
    .filter(item => item.fullDate <= today)
    .reverse();
  const propName = stateProperties[selectedProperty];
  const currentData = historicalData[historicalData.length - 1];

  return (
    <Layout>
      <h1 className="mt-2 text-center">United States Information</h1>

      <hr className="background-white" />

      <h2 className="mt-2 mb-4">Trends</h2>

      <div className="d-flex mb-4 justify-content-between">
        <Dropdown>
          <Dropdown.Toggle variant="success" id="type-dropdown">
            {propName}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-list">
            {Object.keys(stateProperties).map(key => (
              <Dropdown.Item key={key} onClick={() => setSelectedProperty(key)}>{stateProperties[key]}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown>
          <Dropdown.Toggle variant="info" id="chart-dropdown">
            {isScatter ? 'Scatter' : 'Line'}
          </Dropdown.Toggle>
          <Dropdown.Menu className="dropdown-list">
            <Dropdown.Item onClick={() => setIsScatter(false)}>Line</Dropdown.Item>
            <Dropdown.Item onClick={() => setIsScatter(true)}>Scatter</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="chart-container">
        <UsChart
          isScatter={isScatter}
          selectedProperty={selectedProperty}
          propName={propName}
          historicalData={historicalData}
        />
      </div>

      <hr className="background-white" />

      {currentData && (
        <Statistics stats={currentData} />
      )}
    </Layout>
  );
}
