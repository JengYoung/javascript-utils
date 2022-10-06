import DateCell from './DateCell';

class Calendar {
  target: Element;

  container: HTMLElement;

  inner: HTMLElement;

  nowDate: Date;

  year: number;

  month: number;

  date: number;

  constructor(target: Element) {
    this.target = target;

    this.container = document.createElement('div');
    this.container.classList.add('calendar');

    this.inner = document.createElement('div');
    this.inner.classList.add('calendar__inner');

    this.nowDate = new Date();

    this.year = this.nowDate.getFullYear();
    this.month = this.nowDate.getMonth();
    this.date = this.nowDate.getDate();
  }

  #getLastDate(year: number, month: number, date: number) {
    let dateCount = 1;
    let now = new Date(year, month, date);

    while (now.getMonth() === this.month) {
      dateCount += 1;
      now = new Date(now.setDate(dateCount));
    }

    return dateCount - 1;
  }

  #makeCell(date?: number) {
    const dateCell = new DateCell(this.inner);
    dateCell.render();
    if (typeof date === 'number') {
      dateCell.setDate(date);
    }
  }

  makeCalendar() {
    const lastDate = this.#getLastDate(this.year, this.month, this.date);

    // NOTE: 윌월화수목금토
    const firstDayIndex = new Date(this.year, this.month).getDay();

    const afterLastDateCount = 7 - ((firstDayIndex + lastDate) % 7);

    for (let i = 0; i < firstDayIndex; i += 1) {
      this.#makeCell();
    }

    for (let i = 1; i <= lastDate; i += 1) {
      this.#makeCell(i);
    }

    for (let i = 0; i < afterLastDateCount; i += 1) {
      this.#makeCell();
    }
  }

  render() {
    this.makeCalendar();
    this.container.appendChild(this.inner);
    this.target.appendChild(this.container);
  }
}

export default Calendar;
