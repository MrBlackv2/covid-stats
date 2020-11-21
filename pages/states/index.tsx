import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useSWR from 'swr';

import UsChart from '../../components/UsChart';
import HistoricalItem from '../../model/HistoricalItem';
import Layout from '../../components/Layout';
import Statistics from '../../components/StateStats';
import { stateProperties, store, getFromStore } from '../../model/utils';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function States() {
  const { data: statesData, error: statesError } = useSWR<StateMetadata[], any>('https://api.covidtracking.com/v1/states/info.json', fetcher);
  const [selectedState, setSelectedState] = useState<StateMetadata | null>(null);
  const [isScatter, setIsScatter] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string>('positiveIncrease');
  const [historicalData, setHistoricalData] = useState<HistoricalItem[]>([]);

  const loadStateTrend = async (state: string) => {
    try {
      const response = await axios.get<any, AxiosResponse<StateHistoricalData[]>>(`https://api.covidtracking.com/v1/states/${state}/daily.json`);
      const today = new Date();
      const historicalItems = response.data
        .map(item => new HistoricalItem(item))
        .filter(item => item.fullDate <= today)
        .reverse();
      setHistoricalData(historicalItems);
    } catch (err) {
      console.error('Error loading historical data:', err);
    }
  };

  useEffect(() => {
    if (selectedState === null && statesData && !statesError) {
      const storedState = getFromStore('state');
      const matchingState = statesData.find(s => s.state === storedState);
      setSelectedState(matchingState || statesData[0]);
    }
  }, [statesData]);

  useEffect(() => {
    if (selectedState?.state) {
      loadStateTrend(selectedState.state.toLowerCase());
      store('state', selectedState.state);
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

  const propName = stateProperties[selectedProperty];
  const currentData = historicalData[historicalData.length - 1];

  return (
    <Layout>
      <h1 className="mt-2 text-center">State Information</h1>

      <div className="d-flex justify-content-center align-items-center mt-4">
        <h4 className="mr-3 mb-0">Selected State:</h4>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="state-dropdown">
            {selectedState?.name}
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight className="dropdown-list">
            {statesData.map(data => (
              <Dropdown.Item key={data.state} onClick={() => setSelectedState(data)}>{data.name}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <hr className="background-white" />

      {currentData && (
        <Statistics stats={currentData} />
      )}

      <hr className="background-white" />

      <h2 className="mt-2 mb-4">Trends</h2>

      {selectedState && (
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
      )}

      <div className="chart-container">
        <UsChart
          isScatter={isScatter}
          selectedProperty={selectedProperty}
          propName={propName}
          historicalData={historicalData}
        />
      </div>
    </Layout>
  );
}
