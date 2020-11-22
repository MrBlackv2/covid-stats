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
        <span>Cases Today:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.todayCases)}</span>
      </p>
      <p>
        <span>Cases per Million:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.casesPerOneMillion)}</span>
      </p>
      <p>
        <span>Total Deaths:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.deaths)}</span>
      </p>
      <p>
        <span>Deaths Today:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.todayDeaths)}</span>
      </p>
      <p>
        <span>Deaths per Million:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.deathsPerOneMillion)}</span>
      </p>
      <p>
        <span>Recovered:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.recovered)}</span>
      </p>
      <p>
        <span>Recovered Today:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.todayRecovered)}</span>
      </p>
      <p>
        <span>Recovered per Million:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.recoveredPerOneMillion)}</span>
      </p>
      <p>
        <span>Critical:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.critical)}</span>
      </p>
      <p>
        <span>Critical per Million:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.criticalperOneMillion)}</span>
      </p>
      <p>
        <span>Tests:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.tests)}</span>
      </p>
      <p>
        <span>Tests per Million:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.testsPerOneMillion)}</span>
      </p>
      <p>
        <span>Affected Countries:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.affectedCountries)}</span>
      </p>
    </div>
  );
}
