import {getLocalStorageItem} from '~/src/storage';
import CalendarHeader from './CalendarHeader';
import DateCell from './Cell';
import {DISPATCH_UPDATE_SCHEDULE, STORAGE_KEY} from './constants';
import {CalendarScheduleInterface} from './Form';
import Schedules from './Schedules';

export interface CalendarDateInterface {
  year: number;
  month: number;
  date: number;
}

interface CalendarState extends CalendarDateInterface {
  lastDate?: number;
  schedules: CalendarScheduleInterface[];
}

class Calendar {
  target: Element;

  calendar: HTMLElement;

  container: HTMLElement;

  inner: HTMLElement;

  nowDate: Date;

  state: CalendarState;

  header: CalendarHeader;

  schedules: Schedules;

  constructor(target: Element) {
    this.target = target;

    this.nowDate = new Date();

    this.state = {
      year: this.nowDate.getFullYear(),
      month: this.nowDate.getMonth() + 1,
      date: this.nowDate.getDate(),
      schedules: [],
    };

    this.state.lastDate = this.lastDate;

    this.state.schedules = this.sortedSchedules;

    this.calendar = document.createElement('article');
    this.calendar.classList.add('calendar');

    this.container = document.createElement('div');
    this.container.classList.add('calendar__container');

    this.inner = document.createElement('div');
    this.inner.classList.add('calendar__inner');

    this.header = new CalendarHeader(this.calendar, {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
      lastDate: this.state.lastDate,
    });

    this.schedules = new Schedules(this.inner, {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,

      schedules: this.state.schedules,
    });

    this.#initialize();

    this.target.appendChild(this.calendar);

    this.addEvent();
  }

  #initialize() {
    this.calendar.innerHTML = '';
    this.container.innerHTML = '';
    this.inner.innerHTML = '';

    this.makeCalendar();

    this.schedules = new Schedules(this.inner, {
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,

      schedules: this.state.schedules,
    });
  }

  addEvent() {
    document.body.addEventListener('update:header', (e: CustomEventInit) => {
      this.setState(e.detail());
    });

    document.body.addEventListener('update:date-name', (e: CustomEventInit) => {
      this.setState(e.detail());
    });

    document.body.addEventListener(DISPATCH_UPDATE_SCHEDULE, () => {
      this.setState({schedules: this.sortedSchedules});
    });
  }

  setState(state: Partial<CalendarState>) {
    this.state = {
      ...this.state,
      ...state,
      schedules: this.sortedSchedules,
    };

    this.state.lastDate = this.lastDate;

    this.header.setState({
      year: this.state.year,
      month: this.state.month,
      date: this.state.date,
      lastDate: this.state.lastDate,
    });

    this.render();
  }

  get sortedSchedules(): CalendarScheduleInterface[] {
    const item: CalendarScheduleInterface[] = [
      ...getLocalStorageItem(STORAGE_KEY, []),
    ];
    item.sort((a: CalendarScheduleInterface, b: CalendarScheduleInterface) => {
      if (a.dateStart !== b.dateStart) {
        return (
          +new Date(a.dateStart.year, a.dateStart.month, a.dateStart.date) -
          +new Date(b.dateStart.year, b.dateStart.month, b.dateStart.date)
        );
      }

      return (
        +new Date(a.dateEnd.year, a.dateEnd.month, a.dateEnd.date) -
        +new Date(b.dateEnd.year, b.dateEnd.month, b.dateEnd.date)
      );
    });

    return item;
  }

  render() {
    this.#initialize();

    this.header.render();

    this.container.appendChild(this.inner);
    this.calendar.appendChild(this.container);
  }

  get lastDate() {
    let dateCount = 1;
    let now = new Date(this.state.year, this.state.month - 1, this.state.date);

    while (now.getMonth() === this.state.month - 1) {
      dateCount += 1;
      now = new Date(now.setDate(dateCount));
    }

    return dateCount - 1;
  }

  #makeCell(
    parent: Element | DocumentFragment,
    dateArr: number[],
    date?: number,
  ) {
    const dateCell = new DateCell(parent, {date: this.state.date});

    if (typeof date === 'number' && dateArr[date] > 0) {
      dateCell.setDate(dateArr[date]);
    }

    dateCell.render();
  }

  makeCalendar() {
    if (this.state.lastDate === undefined) {
      return;
    }

    // NOTE: 윌월화수목금토
    const firstDayIndex = new Date(
      this.state.year,
      this.state.month - 1,
    ).getDay();

    // NOTE: 첫 빈칸부터, 마지막 날까지의 인덱스
    const dateEndIndex = firstDayIndex + this.state.lastDate;

    const afterLastDateCount = (7 - (dateEndIndex % 7)) % 7;

    const totalCellCount = dateEndIndex + afterLastDateCount;

    const weekCount = totalCellCount / 7;

    const innerChildrenDocumentFragment = new DocumentFragment();

    const dateArr = Array.from({length: totalCellCount}, (_, idx) => {
      if (idx >= firstDayIndex && idx < dateEndIndex) {
        return idx - firstDayIndex + 1;
      }

      return -1;
    });

    for (let i = 0; i < weekCount; i += 1) {
      const week = document.createElement('div');
      week.classList.add('calendar__week');
      week.dataset.dateStart = Infinity.toString();
      week.dataset.dateEnd = (0).toString();

      const DAY_COUNT_PER_WEEK = 7;

      innerChildrenDocumentFragment.appendChild(week);

      const weekChildrenDocumentFragment = new DocumentFragment();

      for (
        let j = i * DAY_COUNT_PER_WEEK;
        j < (i + 1) * DAY_COUNT_PER_WEEK;
        j += 1
      ) {
        const now = j + 1 - firstDayIndex;
        if (now >= 1 && now <= this.lastDate) {
          week.dataset.dateStart = Math.min(
            +week.dataset.dateStart,
            now,
          ).toString();
          week.dataset.dateEnd = Math.max(
            +week.dataset.dateEnd,
            now,
          ).toString();
        }

        this.#makeCell(weekChildrenDocumentFragment, dateArr, j);
      }

      week.appendChild(weekChildrenDocumentFragment);
    }
    this.inner.appendChild(innerChildrenDocumentFragment);
  }
}

export default Calendar;
