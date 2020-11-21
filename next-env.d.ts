/// <reference types="next" />
/// <reference types="next/types/global" />

interface UsStatistics {
  positiveIncrease: number;
  positive: number;
  deathIncrease: number;
  death: number;
  hospitalizedCurrently: number;
  inIcuCurrently: number;
  onVentilatorCurrently: number;
}

interface UsHistoricalData {
  date: number;
  states: number;
  positive: number;
  negative: number;
  pending: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number;
  inIcuCumulative: number;
  onVentilatorCurrently: number;
  onVentilatorCumulative: number;
  recovered: number;
  dateChecked: string;
  death: number;
  hospitalized: number;
  totalTestResults: number;
  lastModified: string;
  total: number;
  posNeg: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  negativeIncrease: number;
  positiveIncrease: number;
  totalTestResultsIncrease: number;
  hash: string;
}

interface StateMetadata {
  state: string;
  notes: string;
  covid19Site: string;
  covid19SiteSecondary: string;
  covid19SiteTertiary: string;
  covid19SiteQuaternary: string;
  covid19SiteQuinary: string;
  twitter: string;
  covid19SiteOld: string;
  covidTrackingProjectPreferredTotalTestUnits: string;
  covidTrackingProjectPreferredTotalTestField: string;
  totalTestResultsField: string;
  pui: string;
  pum: boolean;
  name: string;
  fips: string;
}

interface StateHistoricalData {
  date: number;
  state: string;
  positive: number;
  probableCases: number | null;
  negative: number;
  pending: number | null;
  totalTestResultsSource: string;
  totalTestResults: number;
  hospitalizedCurrently: number;
  hospitalizedCumulative: number;
  inIcuCurrently: number | null;
  inIcuCumulative: number | null;
  onVentilatorCurrently: number | null;
  onVentilatorCumulative: number | null;
  recovered: number | null;
  dataQualityGrade: string;
  lastUpdateEt: string;
  dateModified: string;
  checkTimeEt: string;
  death: number;
  hospitalized: number | null;
  dateChecked: string;
  totalTestsViral: number;
  positiveTestsViral: number | null;
  negativeTestsViral: number | null;
  positiveCasesViral: number | null;
  deathConfirmed: number | null;
  deathProbable: number | null;
  totalTestEncountersViral: number | null;
  totalTestsPeopleViral: number | null;
  totalTestsAntibody: number | null;
  positiveTestsAntibody: number | null;
  totalTestsPeopleAntibody: number | null;
  positiveTestsPeopleAntibody: number | null;
  negativeTestsPeopleAntibody: number | null;
  totalTestsPeopleAntigen: number | null;
  totalTestsAntigen: number | null;
  positiveTestsAntigen: number | null;
  fips: string;
  positiveIncrease: number;
  negativeIncrease: number;
  total: number;
  totalTestResultsIncrease: number;
  posNeg: number;
  deathIncrease: number;
  hospitalizedIncrease: number;
  hash: string;
  commercialScore: number;
  negativeRegularScore: number;
  negativeScore: number;
  positiveScore: number;
  score: number;
  grade: string;
}

interface WorldHistoricalData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

interface WorldHistoricalItem {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
}

interface WorldStatistics {
  cases: number;
  deaths: number;
  recovered: number;
}
