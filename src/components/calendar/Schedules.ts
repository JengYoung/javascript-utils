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
          scheduleElement.textContent = scheduleState.title;

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
              if ((scheduleState.id as string) === '1665390940909') {
                console.log(orderIdx);
              }
              (scheduleElement as HTMLElement).dataset.order = `${orderIdx}`;
            }
          }

          for (let i = +dateStart; i <= +dateEnd; i += 1) {
            console.log(
              i,
              scheduleState,
              +scheduleState.dateStart.date - +dateStart,
            );
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
              (scheduleElement as HTMLElement).dataset.from = `${
                Math.abs(+dateStart) + 1
              }`;
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
