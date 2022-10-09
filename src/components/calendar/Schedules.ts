import {CalendarDateInterface} from '.';
import {CalendarScheduleInterface} from './Form';

export interface ScheduleState extends CalendarDateInterface {
  schedules: CalendarScheduleInterface[];
}

class Schedule {
  parent: Element;

  state: ScheduleState;

  timeStampState: {
    dateStart: number;
    dateEnd: number;
  }[];

  constructor(parent: Element, state: ScheduleState) {
    this.parent = parent;
    this.state = state;

    this.timeStampState = this.state.schedules.map(schedule => ({
      dateStart: +new Date(
        +schedule.dateStart.year,
        +schedule.dateStart.month - 1,
        +schedule.dateStart.date,
      ),
      dateEnd: +new Date(
        +schedule.dateEnd.year,
        +schedule.dateEnd.month - 1,
        +schedule.dateEnd.date,
      ),
    }));

    this.render();
  }

  setState(state: ScheduleState) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
  }

  #getScheduleTimeStamp(schedule: CalendarScheduleInterface): [number, number] {
    return [
      +new Date(
        +schedule.dateStart.year,
        +schedule.dateStart.month - 1,
        +schedule.dateStart.date,
      ),
      +new Date(
        +schedule.dateEnd.year,
        +schedule.dateEnd.month - 1,
        +schedule.dateEnd.date,
      ),
    ];
  }

  #checkThisMonthSchedule(scheduleState: CalendarScheduleInterface): boolean {
    return (
      +scheduleState.dateStart.year <= +this.state.year &&
      +scheduleState.dateStart.month <= +this.state.month &&
      +scheduleState.dateEnd.year >= +this.state.year &&
      +scheduleState.dateEnd.month >= +this.state.month
    );
  }

  render() {
    const weeks = this.parent.querySelectorAll('.calendar__week');
    if (!weeks.length) return;

    const dateScheduleCounts = Array.from({length: weeks.length}, () =>
      new Array(7).fill(0),
    );

    this.state.schedules.forEach((scheduleState: CalendarScheduleInterface) => {
      if (this.#checkThisMonthSchedule(scheduleState)) {
        weeks.forEach((weekElement: Element, idx) => {
          const {dateStart} = (weekElement as HTMLElement).dataset;
          const {dateEnd} = (weekElement as HTMLElement).dataset;

          if (!dateStart || !dateEnd) return;

          const [dateStartTimeStamp, dateEndTimeStamp] =
            this.#getScheduleTimeStamp({
              dateStart: {
                year: this.state.year,
                month: this.state.month,
                date: +dateStart,
              },
              dateEnd: {
                year: this.state.year,
                month: this.state.month,
                date: +dateEnd,
              },
              title: `${scheduleState.title}ㅎㅎ`,
            });

          const [scheduleDateStartTimeStamp, scheduleDateEndTimeStamp] =
            this.#getScheduleTimeStamp(scheduleState);

          // NOTE: 범위가 겹치지 않는 경우 리턴
          if (
            dateStartTimeStamp > scheduleDateEndTimeStamp ||
            dateEndTimeStamp < scheduleDateStartTimeStamp
          ) {
            return;
          }

          const scheduleElement = document.createElement('div');
          scheduleElement.classList.add('calendar__schedule');
          scheduleElement.textContent = scheduleState.title;

          if (scheduleDateStartTimeStamp < dateStartTimeStamp) {
            scheduleElement.classList.add('calendar__schedule--earlier');
          }

          if (scheduleDateEndTimeStamp > dateEndTimeStamp) {
            scheduleElement.classList.add('calendar__schedule--later');
          }

          // 해당 날짜와 중복되는 일정 개수를 구한다.

          (scheduleElement as HTMLElement).dataset.from = '0';
          (scheduleElement as HTMLElement).dataset.to = '6';

          for (let i = +dateStart; i <= +dateEnd; i += 1) {
            if (
              +scheduleState.dateStart.date <= i &&
              +scheduleState.dateEnd.date >= i
            ) {
              (scheduleElement as HTMLElement).dataset.order = `${
                dateScheduleCounts[idx][i - +dateStart]
              }`;

              dateScheduleCounts[idx][i - +dateStart] += 1;
            }

            if (+scheduleState.dateStart.date === i) {
              console.log(scheduleState, i);
              (scheduleElement as HTMLElement).dataset.from = (
                +scheduleState.dateStart.date - +dateStart
              ).toString();
            }

            if (+scheduleState.dateEnd.date === i) {
              (scheduleElement as HTMLElement).dataset.to = (
                +scheduleState.dateEnd.date - +dateStart
              ).toString();
            }
          }

          scheduleElement.textContent = scheduleState.title;
          weekElement.appendChild(scheduleElement);

          const elem = weekElement;

          (elem as HTMLElement).dataset.maxScheduleCount = `${Math.max(
            ...dateScheduleCounts[idx],
          )}`;
        });
      }
    });
  }
}

export default Schedule;
