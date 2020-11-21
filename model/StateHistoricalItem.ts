export default class StateHistoricalItem {

  date: number;
  fullDate: Date;
  positive: number;
  positiveIncrease: number;
  death: number;
  deathIncrease: number;
  negative: number;
  hospitalizedCurrently: number;
  inIcuCurrently: number;
  onVentilatorCurrently: number;

  constructor(data: StateHistoricalData | UsHistoricalData) {
    this.date = this.getDate(data.date);
    this.fullDate = new Date(this.date);
    this.positive = data.positive;
    this.positiveIncrease = data.positiveIncrease;
    this.death = data.death;
    this.deathIncrease = data.deathIncrease;
    this.negative = data.negative;
    this.hospitalizedCurrently = data.hospitalizedCurrently;
    this.inIcuCurrently = data.inIcuCurrently;
    this.onVentilatorCurrently = data.onVentilatorCurrently;
  }

  private getDate(dateNum: number) {
    const dateStr = dateNum.toString();
    const year = +dateStr.substr(0, 4);
    let month = +dateStr.substr(4, 2) - 1;
    if (month === 0) {
      month = 11;
    }
    const day = +dateStr.substr(6, 2);
    return (new Date(year, month, day)).valueOf();
  }
}
