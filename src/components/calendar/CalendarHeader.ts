interface CalendarHeaderState {
  year: number;
  month: number;
  date: number;
  lastDate: number;
}

class CalendarHeader {
  parent: Element;

  header: Element;

  yearSelect: Element;

  monthSelect: Element;

  state: CalendarHeaderState;

  dateSelect: Element;

  constructor(parent: Element, state: CalendarHeaderState) {
    this.parent = parent;
    this.state = state;

    this.header = document.createElement('header');
    this.header.classList.add('calendar__header');

    this.yearSelect = document.createElement('select');
    this.yearSelect.classList.add('header__year');

    this.monthSelect = document.createElement('select');
    this.monthSelect.classList.add('header__month');

    this.dateSelect = document.createElement('select');
    this.dateSelect.classList.add('header__date');

    this.#initializeSelect();
  }

  #initializeSelect() {
    const yearDocumentFragment = new DocumentFragment();
    const latestYear = new Date().getFullYear();

    for (let i = 1970; i <= latestYear; i += 1) {
      const option = document.createElement('option');
      option.textContent = i.toString();
      option.value = i.toString();

      if (i === this.state.year) {
        option.selected = true;
      }

      yearDocumentFragment.appendChild(option);
    }

    this.yearSelect.appendChild(yearDocumentFragment);

    const monthDocumentFragment = new DocumentFragment();

    for (let i = 0; i < 12; i += 1) {
      const option = document.createElement('option');
      option.textContent = (i + 1).toString();

      option.value = i.toString();

      if (i === this.state.month) {
        option.selected = true;
      }

      monthDocumentFragment.appendChild(option);
    }

    this.monthSelect.appendChild(monthDocumentFragment);

    const dateDocumentFragment = new DocumentFragment();

    for (let i = 1; i <= this.state.lastDate; i += 1) {
      const option = document.createElement('option');
      option.textContent = i.toString();
      option.value = i.toString();

      if (i === this.state.date) {
        option.selected = true;
      }

      dateDocumentFragment.appendChild(option);
    }

    this.dateSelect.appendChild(dateDocumentFragment);

    const event = new CustomEvent('update:header', {
      detail: this.getState.bind(this),
    });

    const onChange = (e: Event, key: keyof CalendarHeaderState) => {
      this.state[key] = Number((e.target as HTMLSelectElement).value);
      document.body.dispatchEvent(event);
    };

    this.yearSelect.addEventListener('change', e => onChange(e, 'year'));
    this.monthSelect.addEventListener('change', e => onChange(e, 'month'));
    this.dateSelect.addEventListener('change', e => onChange(e, 'date'));
  }

  getState() {
    return this.state;
  }

  setState(state: CalendarHeaderState) {
    this.state = {
      ...state,
    };
  }

  render() {
    this.header.appendChild(this.yearSelect);
    this.header.appendChild(this.monthSelect);
    this.header.appendChild(this.dateSelect);

    this.parent.appendChild(this.header);
  }
}

export default CalendarHeader;
