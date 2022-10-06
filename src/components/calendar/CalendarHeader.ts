interface CalendarHeaderState {
  year: number;
  month: number;
  date: number;
}

class CalendarHeader {
  parent: Element;

  header: Element;

  yearSelect: Element;

  monthSelect: Element;

  state: CalendarHeaderState;

  constructor(parent: Element, state: CalendarHeaderState) {
    this.parent = parent;

    this.header = document.createElement('header');
    this.header.classList.add('calendar__header');

    this.yearSelect = document.createElement('select');
    this.yearSelect.classList.add('header__year');

    this.monthSelect = document.createElement('select');
    this.monthSelect.classList.add('header__month');

    this.state = state;

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
  }

  render() {
    this.header.appendChild(this.yearSelect);
    this.header.appendChild(this.monthSelect);

    this.parent.appendChild(this.header);
  }
}

export default CalendarHeader;
