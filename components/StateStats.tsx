export default function StateStats({ stats }: { stats: UsStatistics }) {
  const valueDisplay = (value: number | null) => value === null ? 'Unkown' : value;

  return (
    <div>
      <h2 className="mb-4">Current Statistics</h2>
      <p>
        <span>New Cases (Today):</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.positiveIncrease)}</span>
      </p>
      <p>
        <span>Total Cases:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.positive)}</span>
      </p>
      <p>
        <span>Deaths (Today):</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.deathIncrease)}</span>
      </p>
      <p>
        <span>Total Deaths:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.death)}</span>
      </p>
      <p>
        <span>Hospitalized:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.hospitalizedCurrently)}</span>
      </p>
      <p>
        <span>In ICU:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.inIcuCurrently)}</span>
      </p>
      <p>
        <span>On Ventilator:</span>
        <span className="ml-2 font-weight-bold">{valueDisplay(stats.onVentilatorCurrently)}</span>
      </p>
    </div>
  );
}
