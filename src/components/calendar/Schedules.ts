import {CalendarDateInterface} from '.';
import {CalendarScheduleInterface} from './Form';

export interface ScheduleState extends CalendarDateInterface {
  schedules: CalendarScheduleInterface[];
}

class Schedule {
  parent: Element;

  state: ScheduleState;

  constructor(parent: Element, state: ScheduleState) {
    this.parent = parent;
    this.state = state;

    this.render();
  }

  setState(state: ScheduleState) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
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
    this.state.schedules.forEach((scheduleState: CalendarScheduleInterface) => {
      if (this.#checkThisMonthSchedule(scheduleState)) {
        const weeks = this.parent.querySelectorAll('.calendar__week');
        if (!weeks.length) return;

        weeks.forEach((weekElement: Element) => {
          const {dateStart} = (weekElement as HTMLElement).dataset;
          const {dateEnd} = (weekElement as HTMLElement).dataset;

          if (!dateStart || !dateEnd) return;

          const dateStartTimeStamp = +new Date(
            this.state.year,
            this.state.month - 1,
            +dateStart,
          );

          const dateEndTimeStamp = +new Date(
            this.state.year,
            this.state.month - 1,
            +dateEnd,
          );

          const scheduleDateStartTimeStamp = +new Date(
            +scheduleState.dateStart.year,
            +scheduleState.dateStart.month - 1,
            +scheduleState.dateStart.date,
          );

          const scheduleDateEndTimeStamp = +new Date(
            +scheduleState.dateEnd.year,
            +scheduleState.dateEnd.month - 1,
            +scheduleState.dateEnd.date,
          );

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

          if (scheduleDateEndTimeStamp < dateStartTimeStamp) {
            scheduleElement.classList.add('calendar__schedule--earlier');
          }

          if (scheduleDateEndTimeStamp > dateEndTimeStamp) {
            scheduleElement.classList.add('calendar__schedule--later');
          }

          for (let i = +dateStart; i <= +dateEnd; i += 1) {
            if (+scheduleState.dateStart.date === i) {
              (scheduleElement as HTMLElement).dataset.from = (
                i - +dateStart
              ).toString();
            }

            if (+scheduleState.dateEnd.date === i) {
              (scheduleElement as HTMLElement).dataset.to = (
                i - +dateEnd
              ).toString();
            }
          }

          scheduleElement.textContent = scheduleState.title;
          weekElement.appendChild(scheduleElement);
        });
      }
    });
  }
}

export default Schedule;
