import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';

import useSWR from 'swr';

import Layout from '../../components/Layout';
import CountryStats from '../../components/CountryStats';
import { computeHistoricalItems, worldProperties } from '../../model/utils';
import WorldChart from '../../components/WorldChart';

const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default function Countries() {
  const { data, error } = useSWR<CountryData[], any>('https://corona.lmao.ninja/v3/covid-19/countries', fetcher);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [historicalData, setHistoricalData] = useState<WorldHistoricalItem[]>([]);
  const [selectedProperty, setSelectedProperty] = useState('casesToday');

  const loadCountryHistoricalData = async (country: CountryData) => {
    const response = await axios.get<any, AxiosResponse<CountryHistoricalData>>(`https://corona.lmao.ninja/v3/covid-19/historical/${country.country}`);
    console.log('response', response.data.timeline);
    setHistoricalData(computeHistoricalItems(response.data.timeline));
  };

  useEffect(() => {
    if (selectedCountry === null && data && data.length) {
      const country = data[0];
      setSelectedCountry(country);
    }
  }, [data]);

  useEffect(() => {
    if (selectedCountry) {
      loadCountryHistoricalData(selectedCountry);
    }
  }, [selectedCountry]);

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

  const propName = worldProperties[selectedProperty];

  return (
    <Layout>
      <h1 className="mt-2 text-center">World Information</h1>

      <div className="d-flex justify-content-center mt-4">
        <h4 className="mr-3">Selected Country:</h4>

        <Dropdown>
          <Dropdown.Toggle variant="primary" id="state-dropdown">
            {selectedCountry?.country}
          </Dropdown.Toggle>
          <Dropdown.Menu alignRight className="dropdown-list">
            {data.map(data => (
              <Dropdown.Item key={data.country} onClick={() => setSelectedCountry(data)}>{data.country}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <hr className="background-white" />

      {selectedCountry && <CountryStats stats={selectedCountry} />}

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
