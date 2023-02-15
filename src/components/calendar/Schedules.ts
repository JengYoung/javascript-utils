import {setLocalStorageItem} from '~/src/utils/storage/localStorage';
import {CalendarDateInterface} from '.';
import {
  OPEN_UPDATE_SCHEDULE_MODAL,
  STORAGE_KEY,
  UPDATE_LOCAL_STORAGE,
} from './constants';
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

    this.addEvent();

    this.render();
  }

  setState(state: Partial<ScheduleState>) {
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

  #checkValidSchedule(scheduleState: CalendarScheduleInterface): boolean {
    return (
      +scheduleState.dateStart.year < +this.state.year ||
      (+scheduleState.dateStart.year === +this.state.year &&
        +scheduleState.dateStart.month <= +this.state.month &&
        +scheduleState.dateEnd.year >= +this.state.year &&
        +scheduleState.dateEnd.month >= +this.state.month)
    );
  }

  render() {
    const weeks = this.parent.querySelectorAll('.calendar__week');
    if (!weeks.length) return;

    const dateScheduleCounts = Array.from({length: weeks.length}, () =>
      new Array(7).fill(0),
    );

    const scheduleMap: number[][][] = [];
    for (let i = 0; i < weeks.length; i += 1) {
      scheduleMap.push([]);
      for (let dateIndex = 0; dateIndex < 7; dateIndex += 1) {
        scheduleMap[i].push([]);
        for (let k = 0; k < 13; k += 1) {
          scheduleMap[i][dateIndex].push(0);
        }
      }
    }

    this.state.schedules.forEach((scheduleState: CalendarScheduleInterface) => {
      if (this.#checkValidSchedule(scheduleState)) {
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
              title: `${scheduleState.title}`,
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
          scheduleElement.dataset.id = scheduleState.id;

          if (scheduleDateStartTimeStamp < dateStartTimeStamp) {
            scheduleElement.classList.add('calendar__schedule--earlier');
          }

          if (scheduleDateEndTimeStamp > dateEndTimeStamp) {
            scheduleElement.classList.add('calendar__schedule--later');
          }

          (scheduleElement as HTMLElement).dataset.from = '0';
          (scheduleElement as HTMLElement).dataset.to = '6';

          // NOTE: 이미 구축된 일정을 추가적으로 더 쌓을 필요는 없다. 따라서 해당 flag가 active되면 그냥 넘어간다.
          let isAlreadyBuilt = false;

          for (let i = +dateStart; i <= +dateEnd; i += 1) {
            /* eslint-disable-next-line no-continue */
            if (i < 1 || isAlreadyBuilt) continue;

            const nowDateIndex = i - +dateStart;

            const [nowDateStartTimeStamp, nowDateEndTimeStamp] =
              this.#getScheduleTimeStamp({
                dateStart: {
                  year: this.state.year,
                  month: this.state.month,
                  date: +i,
                },
                dateEnd: {
                  year: this.state.year,
                  month: this.state.month,
                  date: +i,
                },
                title: `${scheduleState.title}`,
              });

            if (
              scheduleDateStartTimeStamp <= nowDateStartTimeStamp &&
              scheduleDateEndTimeStamp >= nowDateEndTimeStamp
            ) {
              let flag = false;
              for (
                let orderIndex = 0;
                orderIndex < scheduleMap[idx][nowDateIndex].length;
                orderIndex += 1
              ) {
                /* eslint-disable-next-line no-continue */
                if (flag) continue;

                if (scheduleMap[idx][nowDateIndex][orderIndex] === 0) {
                  for (let k = nowDateIndex; k <= 6; k += 1) {
                    if (
                      scheduleDateStartTimeStamp <=
                        +new Date(
                          this.state.year,
                          this.state.month - 1,
                          k + +dateStart,
                        ) &&
                      scheduleDateEndTimeStamp >=
                        +new Date(
                          this.state.year,
                          this.state.month - 1,
                          k + +dateStart,
                        )
                    ) {
                      scheduleMap[idx][k][orderIndex] =
                        +(scheduleState.id as string);
                    }
                  }
                  flag = true;
                  isAlreadyBuilt = true;
                }
              }
            }
          }

          for (let i = 0; i < 7; i += 1) {
            const orderIdx = scheduleMap[idx][i].findIndex(
              id => id === +(scheduleState.id as string),
            );
            if (orderIdx > -1) {
              (scheduleElement as HTMLElement).dataset.order = `${orderIdx}`;
            }
          }

          for (let i = +dateStart; i <= +dateEnd; i += 1) {
            const [nowDateStartTimeStamp, nowDateEndTimeStamp] =
              this.#getScheduleTimeStamp({
                dateStart: {
                  year: this.state.year,
                  month: this.state.month,
                  date: +i,
                },
                dateEnd: {
                  year: this.state.year,
                  month: this.state.month,
                  date: +i,
                },
                title: `${scheduleState.title}`,
              });

            // NOTE: 캘린더 일정의 순서를 정해준다.
            if (
              scheduleDateStartTimeStamp <= nowDateStartTimeStamp &&
              scheduleDateEndTimeStamp >= nowDateEndTimeStamp
            ) {
              dateScheduleCounts[idx][i - +dateStart] += 1;
            }

            if (i < 1) {
              (scheduleElement as HTMLElement).dataset.from = (
                Math.abs(+dateStart) + 1
              ).toString();
            }

            if (scheduleDateStartTimeStamp === nowDateStartTimeStamp) {
              (scheduleElement as HTMLElement).dataset.from = (
                +scheduleState.dateStart.date - +dateStart
              ).toString();
            }

            if (scheduleDateEndTimeStamp === nowDateEndTimeStamp) {
              (scheduleElement as HTMLElement).dataset.to = (
                +scheduleState.dateEnd.date - +dateStart
              ).toString();
            }

            if (scheduleDateEndTimeStamp > nowDateEndTimeStamp) {
              (scheduleElement as HTMLElement).dataset.to = (
                i - +dateStart
              ).toString();
            }
          }

          const scheduleDeleteButton = document.createElement('button');
          scheduleDeleteButton.classList.add('schedule__delete-btn');
          scheduleDeleteButton.dataset.id = `${scheduleState.id}`;

          const scheduleDeleteButtonLine1 = document.createElement('div');
          const scheduleDeleteButtonLine2 = document.createElement('div');
          scheduleDeleteButtonLine1.classList.add('delete-btn__line');
          scheduleDeleteButtonLine2.classList.add('delete-btn__line');

          scheduleDeleteButton.appendChild(scheduleDeleteButtonLine1);
          scheduleDeleteButton.appendChild(scheduleDeleteButtonLine2);

          const scheduleText = document.createElement('span');
          scheduleElement.appendChild(scheduleText);
          scheduleText.textContent = scheduleState.title;

          weekElement.appendChild(scheduleElement);
          scheduleElement.appendChild(scheduleDeleteButton);

          const elem = weekElement;

          (elem as HTMLElement).dataset.maxScheduleCount = `${Math.max(
            ...dateScheduleCounts[idx],
          )}`;
        });
      }
    });
  }

  addEvent() {
    document.body.addEventListener('click', e => {
      const scheduleElement = (e.target as HTMLElement).closest(
        '.calendar__schedule',
      );

      if (!scheduleElement) return null;

      const info = this.state.schedules.filter(
        schedule => schedule.id === (scheduleElement as HTMLElement).dataset.id,
      );

      const event = new CustomEvent(OPEN_UPDATE_SCHEDULE_MODAL, {
        detail: {
          state: {...info[0], schedules: this.state.schedules},
        },
      });

      document.body.dispatchEvent(event);

      return info;
    });

    document.body.addEventListener('click', e => {
      const scheduleDeleteButtonElement = (e.target as HTMLElement).closest(
        '.schedule__delete-btn',
      );

      if (scheduleDeleteButtonElement) {
        const nextSchedules = this.state.schedules.filter(
          schedule =>
            schedule.id !==
            (scheduleDeleteButtonElement as HTMLElement).dataset.id,
        );

        setLocalStorageItem(STORAGE_KEY, nextSchedules);

        const event = new CustomEvent(UPDATE_LOCAL_STORAGE);
        document.body.dispatchEvent(event);
      }
    });
  }
}

export default Schedule;
