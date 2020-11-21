export function computeHistoricalItems(data: WorldHistoricalData) {
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