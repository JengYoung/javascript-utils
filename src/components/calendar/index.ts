import CalendarHeader from './CalendarHeader';
import DateCell from './Cell';

interface CalendarState {
  year: number;
  month: number;
  date: number;
}
class Calendar {
  target: Element;

  calendar: HTMLElement;

  container: HTMLElement;

  inner: HTMLElement;

  nowDate: Date;

  state: CalendarState;

  header: CalendarHeader;

  constructor(target: Element) {
    this.target = target;

    this.calendar = document.createElement('article');
    this.calendar.classList.add('calendar');

    this.container = document.createElement('div');
    this.container.classList.add('calendar__container');

    this.inner = document.createElement('div');
    this.inner.classList.add('calendar__inner');

    this.nowDate = new Date();

    this.state = {
      year: this.nowDate.getFullYear(),
      month: this.nowDate.getMonth(),
      date: this.nowDate.getDate(),
    };

    this.header = new CalendarHeader(this.calendar, {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
    });

    this.target.appendChild(this.calendar);

    this.addEvent();
  }

  addEvent() {
    document.body.addEventListener('update:header', (e: CustomEventInit) => {
      this.setState(e.detail());
    });

    document.body.addEventListener('update:date-name', (e: CustomEventInit) => {
      this.setState(e.detail());
    });
  }

  setState(state: CalendarState) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.header.setState({
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
    });

    this.render();
  }

  render() {
    this.calendar.innerHTML = '';
    this.container.innerHTML = '';
    this.inner.innerHTML = '';

    this.makeCalendar();

    this.header.render();

    this.container.appendChild(this.inner);
    this.calendar.appendChild(this.container);
  }

  #getLastDate(year: number, month: number, date: number) {
    let dateCount = 1;
    let now = new Date(year, month, date);

    while (now.getMonth() === this.state.month) {
      dateCount += 1;
      now = new Date(now.setDate(dateCount));
    }

    return dateCount - 1;
  }

  #makeCell(date?: number) {
    const dateCell = new DateCell(this.inner, {date: this.state.date});

    if (typeof date === 'number') {
      dateCell.setDate(date);
    }

    dateCell.render();
  }

  makeCalendar() {
    const lastDate = this.#getLastDate(
      this.state.year,
      this.state.month,
      this.state.date,
    );

    // NOTE: 윌월화수목금토
    const firstDayIndex = new Date(this.state.year, this.state.month).getDay();

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
}

export default Calendar;
