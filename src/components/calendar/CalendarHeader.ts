import readonly from '~/src/readonly';

interface CalendarHeaderState {
  year: number;
  month: number;
  date: number;
  lastDate: number;
}

class CalendarHeader {
  parent: Element;

  header: Element;

  selectBox: Element;

  yearSelect: HTMLSelectElement;

  monthSelect: HTMLSelectElement;

  dateSelect: HTMLSelectElement;

  state: CalendarHeaderState;

  dayBox: Element;

  constructor(parent: Element, state: CalendarHeaderState) {
    this.parent = parent;
    this.state = state;

    this.header = document.createElement('header');
    this.header.classList.add('calendar__header');

    this.selectBox = document.createElement('section');
    this.selectBox.classList.add('calender__selects');

    this.yearSelect = document.createElement('select');
    this.yearSelect.classList.add('header__year');

    this.monthSelect = document.createElement('select');
    this.monthSelect.classList.add('header__month');

    this.dateSelect = document.createElement('select');
    this.dateSelect.classList.add('header__date');

    this.dayBox = document.createElement('div');
    this.dayBox.classList.add('header__days');

    this.#initialize();
    this.addEvent();
  }

  #initialize() {
    this.header.innerHTML = '';
    this.selectBox.innerHTML = '';
    this.dayBox.innerHTML = '';
    this.yearSelect.innerHTML = '';
    this.monthSelect.innerHTML = '';
    this.dateSelect.innerHTML = '';

    const renderOption = (
      key: keyof CalendarHeaderState,
      select: HTMLSelectElement,
      iterNumFrom: number,
      iterNumTo: number,
    ) => {
      const documentFragment = new DocumentFragment();

      for (let i = iterNumFrom; i <= iterNumTo; i += 1) {
        const option = document.createElement('option');
        option.textContent = i.toString();
        option.value = i.toString();

        if (i === this.state[key]) {
          option.selected = true;
        }

        documentFragment.appendChild(option);
      }

      select.appendChild(documentFragment);
    };

    renderOption('year', this.yearSelect, 1970, new Date().getFullYear() + 30);
    renderOption('month', this.monthSelect, 0, 11);
    renderOption('date', this.dateSelect, 0, this.state.lastDate);

    const days: string[] = readonly([
      'SUN',
      'MON',
      'TUE',
      'WED',
      'THU',
      'FRI',
      'SAT',
    ]);

    const dayDocumentFragment = new DocumentFragment();

    days.forEach(value => {
      const day = document.createElement('div');
      day.className = 'days__day';
      day.textContent = value;
      dayDocumentFragment.appendChild(day);
    });

    this.dayBox.appendChild(dayDocumentFragment);
  }

  addEvent() {
    const event = new CustomEvent('update:header', {
      detail: this.getState.bind(this),
    });

    const onChange = (e: Event, key: keyof CalendarHeaderState) => {
      this.setState({[key]: Number((e.target as HTMLSelectElement).value)});

      const nextDate = new Date(
        this.state.year,
        this.state.month,
        this.state.date,
      );

      if (
        Number.isNaN(nextDate.getTime()) ||
        nextDate.getMonth() !== this.state.month ||
        nextDate.getDate() !== this.state.date
      ) {
        this.state.date = 1;
      }

      document.body.dispatchEvent(event);
    };

    this.yearSelect.addEventListener('change', e => onChange(e, 'year'));
    this.monthSelect.addEventListener('change', e => onChange(e, 'month'));
    this.dateSelect.addEventListener('change', e => onChange(e, 'date'));
  }

  getState() {
    return this.state;
  }

  setState(state: Partial<CalendarHeaderState>) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
  }

  render() {
    this.#initialize();

    this.selectBox.appendChild(this.yearSelect);
    this.selectBox.appendChild(this.monthSelect);
    this.selectBox.appendChild(this.dateSelect);

    this.header.appendChild(this.selectBox);
    this.header.appendChild(this.dayBox);

    this.parent.appendChild(this.header);
  }
}

export default CalendarHeader;
