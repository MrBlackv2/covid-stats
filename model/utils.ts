export function computeWorldHistoricalItems(data: WorldHistoricalData) {
  const historicalData: WorldHistoricalItem[] = [];
  let lastItem: WorldHistoricalItem | null = null;

  for (const dateKey of Object.keys(data.cases)) {
    const item: WorldHistoricalItem = {
      date: dateKey,
      cases: data.cases[dateKey],
      casesToday: lastItem ? data.cases[dateKey] - lastItem.cases : null,
      deaths: data.deaths[dateKey],
      deathsToday: lastItem ? data.deaths[dateKey] - lastItem.deaths : null,
      recovered: data.recovered[dateKey],
      recoveredToday: lastItem ? data.recovered[dateKey] - lastItem.recovered : null,
    };
    historicalData.push(item);
    lastItem = item;
  }

  return historicalData;
}

export function computeCountyHistoricalItems(data: CountyData) {
  const historicalData: CountyHistoricalItem[] = [];
  let lastItem: CountyHistoricalItem | null = null;

  for (const dateKey of Object.keys(data.timeline.cases)) {
    const item: CountyHistoricalItem = {
      date: dateKey,
      cases: data.timeline.cases[dateKey],
      casesToday: lastItem ? data.timeline.cases[dateKey] - lastItem.cases : null,
      deaths: data.timeline.deaths[dateKey],
      deathsToday: lastItem ? data.timeline.deaths[dateKey] - lastItem.deaths : null,
    };
    historicalData.push(item);
    lastItem = item;
  }

  return historicalData;
}

export const worldProperties = {
  cases: 'Total Cases',
  casesToday: 'New Cases',
  deaths: 'Total Deaths',
  deathsToday: 'New Deaths',
  recovered: 'Total Recovered',
  recoveredToday: 'New Recovered'
};

export const stateProperties = {
  positive: 'Total Cases',
  positiveIncrease: 'New Cases',
  death: 'Deaths',
  deathIncrease: 'New Deaths',
  hospitalizedCurrently: 'Hospitalized',
  inIcuCurrently: 'In ICU',
  onVentilatorCurrently: 'On Ventilator'
}

export const countyProperties = {
  cases: 'Total Cases',
  casesToday: 'New Cases',
  deaths: 'Total Deaths',
  deathsToday: 'New Deaths'
};

export function store(key: string, value: string): void {
  if (localStorage) {
    localStorage.setItem(key, value);
  }
}

export function getFromStore(key: string): string | null {
  return localStorage && localStorage.getItem(key);
}
