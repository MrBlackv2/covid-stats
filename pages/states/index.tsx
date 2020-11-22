import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import useSWR from 'swr';

import UsChart from '../../components/UsChart';
import StateHistoricalItem from '../../model/StateHistoricalItem';
import Layout from '../../components/Layout';
import Statistics from '../../components/StateStats';
import { computeCountyHistoricalItems, stateProperties, countyProperties, store, getFromStore } from '../../model/utils';
import CountyChart from '../../components/CountyChart';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function States() {
  const { data: statesData, error: statesError } = useSWR<StateMetadata[], any>('https://api.covidtracking.com/v1/states/info.json', fetcher);
  const [selectedState, setSelectedState] = useState<StateMetadata | null>(null);
  const [isScatter, setIsScatter] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState('positiveIncrease');
  const [historicalData, setHistoricalData] = useState<StateHistoricalItem[]>([]);
  const [selectedCounty, setSelectedCounty] = useState<string | null>(null);
  const [allCountyData, setAllCountyData] = useState<CountyData[]>([]);
  const [countyHistoricalData, setCountyHistoricalData] = useState<CountyHistoricalItem[]>([]);
  const [selectedCountyProperty, setSelectedCountyProperty] = useState('casesToday');

  const loadStateTrend = async (state: string) => {
    try {
      const response = await axios.get<any, AxiosResponse<StateHistoricalData[]>>(`https://api.covidtracking.com/v1/states/${state}/daily.json`);
      const today = new Date();
      const historicalItems = response.data
        .map(item => new StateHistoricalItem(item))
        .filter(item => item.fullDate <= today)
        .reverse();
      setHistoricalData(historicalItems);
    } catch (err) {
      console.error('Error loading historical data:', err);
    }
  };

  const loadCountyTrend = async (state: string) => {
    try {
      const response = await axios.get<any, AxiosResponse<CountyData[]>>(`https://corona.lmao.ninja/v3/covid-19/historical/usacounties/${state}`);
      setAllCountyData(response.data);
    } catch (err) {
      console.error('Error loading county historical data:', err);
    }
  };

  // Initialize selected state
  useEffect(() => {
    if (selectedState === null && statesData && !statesError) {
      const storedState = getFromStore('state');
      const matchingState = statesData.find(s => s.state === storedState);
      setSelectedState(matchingState || statesData[0]);
    }
  }, [statesData]);

  // Load state and all county data when selected state changes
  useEffect(() => {
    if (selectedState?.state) {
      loadStateTrend(selectedState.state.toLowerCase());
      loadCountyTrend(selectedState.name.toLowerCase());
      store('state', selectedState.state);
    }
  }, [selectedState]);

  // Initialize selected county
  useEffect(() => {
    if (allCountyData.length > 0) {
      setSelectedCounty(allCountyData[0].county);
    }
  }, [allCountyData]);

  // Set county historical data
  useEffect(() => {
    if (selectedCounty !== null) {
      const county = allCountyData.find(d => d.county === selectedCounty);
      const historicalItems = computeCountyHistoricalItems(county);
      console.log('county historical data', historicalItems);
      setCountyHistoricalData(historicalItems);
    }
  }, [selectedCounty]);

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
  const countyPropName = countyProperties[selectedCountyProperty];
  const currentData = historicalData[historicalData.length - 1];
  const capitalize = (str: string) => str[0].toUpperCase() + str.substr(1);

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

      {selectedCounty && (
        <>
          <hr className="background-white" />

          <h2 className="mt-2 mb-4">Counties</h2>

          <div className="d-flex mb-4">
            <Dropdown className="mr-2">
              <Dropdown.Toggle variant="primary" id="county-dropdown">
                {capitalize(selectedCounty)}
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="dropdown-list">
                {allCountyData.map(data => (
                  <Dropdown.Item key={data.county} onClick={() => setSelectedCounty(data.county)}>
                    {capitalize(data.county)}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown>
              <Dropdown.Toggle variant="success" id="type-dropdown">
                {countyPropName}
              </Dropdown.Toggle>
              <Dropdown.Menu className="dropdown-list">
                {Object.keys(countyProperties).map(key => (
                  <Dropdown.Item key={key} onClick={() => setSelectedCountyProperty(key)}>{countyProperties[key]}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <div className="chart-container">
            <CountyChart
              historicalData={countyHistoricalData}
              propName={countyPropName}
              selectedProperty={selectedCountyProperty}
            />
          </div>
        </>
      )}
    </Layout>
  );
}
