export default function WorldStats({ stats }: { stats: WorldStatistics }) {
  const valueDisplay = (value: number | null) => value === null ? 'Unkown' : value;

  return (
    <div>
      <h2 className="mb-4">Current Statistics</h2>
      <p>
        <span>Total Cases:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.cases)}</span>
      </p>
      <p>
        <span>Total Deaths:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.deaths)}</span>
      </p>
      <p>
        <span>Recovered:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.recovered)}</span>
      </p>
    </div>
  );
}
