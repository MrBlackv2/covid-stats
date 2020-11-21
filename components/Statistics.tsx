export default function Statistics({ stats }: { stats: Statistics }) {
  return (
    <div>
      <h2 className="mb-4">Current Statistics</h2>
      <p>
        <span>New Cases (Today):</span>
        <span className="ml-2 font-weight-bold">{stats.positiveIncrease}</span>
      </p>
      <p>
        <span>Total Cases:</span>
        <span className="ml-2 font-weight-bold">{stats.positive}</span>
      </p>
      <p>
        <span>Deaths (Today):</span>
        <span className="ml-2 font-weight-bold">{stats.deathIncrease}</span>
      </p>
      <p>
        <span>Total Deaths:</span>
        <span className="ml-2 font-weight-bold">{stats.death}</span>
      </p>
      <p>
        <span>Hospitalized:</span>
        <span className="ml-2 font-weight-bold">{stats.hospitalizedCurrently}</span>
      </p>
      <p>
        <span>In ICU:</span>
        <span className="ml-2 font-weight-bold">{stats.inIcuCurrently}</span>
      </p>
      <p>
        <span>On Ventilator:</span>
        <span className="ml-2 font-weight-bold">{stats.onVentilatorCurrently}</span>
      </p>
    </div>
  );
}
