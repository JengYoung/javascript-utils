import {getLocalStorageItem, setLocalStorageItem} from '~/src/storage';
import {CalendarDateInterface} from '.';
import {DISPATCH_UPDATE_SCHEDULE} from './constants';
import InputBox from './InputBox';

export interface CalendarFormTitleInputInterface {
  title: string;
}

export interface CalendarScheduleInterface {
  title: string;
  dateStart: CalendarDateInterface;
  dateEnd: CalendarDateInterface;
}

export interface CalendarFormState extends CalendarScheduleInterface {
  schedules: CalendarScheduleInterface[];
}

class CalendarForm {
  target: Element;

  state: CalendarFormState;

  header: HTMLElement;

  form: HTMLFormElement;

  titleInput: InputBox;

  dateStartInput: InputBox;

  dateEndInput: InputBox;

  submitButton: HTMLButtonElement;

  #STORAGE_KEY = 'calendar-schedule';

  constructor(target: Element) {
    this.target = target;

    this.state = {
      title: '',
      dateStart: {
        year: -1,
        month: -1,
        date: -1,
      },
      dateEnd: {
        year: -1,
        month: -1,
        date: -1,
      },

      schedules: getLocalStorageItem(this.#STORAGE_KEY, []),
    };

    this.form = document.createElement('form');
    this.form.classList.add('calendar-form');

    this.header = document.createElement('header');
    this.header.classList.add('calendar-form__header');
    this.header.textContent = '일정 등록';

    this.titleInput = new InputBox({
      parent: this.form,
      state: {title: this.state.title},
      label: '일정 이름',
      idName: 'title-input',
      className: 'calendar-form__title-input',
      placeholder: '일정 이름을 입력해주세요. 📆',
      onInput: this.onTitleInput.bind(this),
    });

    this.dateStartInput = new InputBox({
      parent: this.form,
      state: this.state.dateStart,
      label: '시작일',
      type: 'date',
      idName: 'date-input',
      className: 'calendar-form__date-start-input',
      onInput: e => this.onDateInput.apply(this, [e, 'dateStart']),
    });

    this.dateEndInput = new InputBox({
      parent: this.form,
      state: this.state.dateEnd,
      label: '종료일',
      type: 'date',
      idName: 'date-input',
      className: 'calendar-form__date-end-input',
      onInput: e => this.onDateInput.apply(this, [e, 'dateEnd']),
    });

    this.submitButton = document.createElement('button');
    this.submitButton.classList.add('calendar-form__submit-button');
    this.submitButton.textContent = '등록';

    this.addEvent();

    this.target.appendChild(this.form);

    this.render();
  }

  setState(state: Partial<CalendarFormState>) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.dateStartInput.setState(this.state.dateStart);
    this.dateEndInput.setState(this.state.dateEnd);

    this.titleInput.setState({title: this.state.title});
  }

  render() {
    this.form.innerHTML = '';
    this.form.appendChild(this.header);

    this.titleInput.render();
    this.dateStartInput.render();
    this.dateEndInput.render();

    this.form.appendChild(this.submitButton);
  }

  addEvent() {
    this.form.addEventListener('submit', e => {
      e.preventDefault();

      setLocalStorageItem(
        this.#STORAGE_KEY,
        this.state.schedules.concat({
          title: this.state.title,
          dateStart: this.state.dateStart,
          dateEnd: this.state.dateEnd,
        }),
      );

      const event = new CustomEvent(DISPATCH_UPDATE_SCHEDULE);
      document.body.dispatchEvent(event);
    });
  }

  onTitleInput(e: Event) {
    const target = e.target as HTMLInputElement;

    this.setState({
      title: target.value,
    });
  }

  onDateInput(e: Event, stateKey: 'dateStart' | 'dateEnd') {
    const target = e.target as HTMLInputElement;
    const [year, month, date] = target.value.split('-');

    this.setState({
      [stateKey]: {
        year,
        month,
        date,
      },
    });
  }
}

export default CalendarForm;
