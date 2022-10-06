interface DateCellState {
  date: number;
}

interface DateCellProps {
  date: number;
}

class DateCell {
  #activeClassName = 'date__name--active';

  parent: Element;

  cell: HTMLElement;

  dateText: HTMLElement;

  state: DateCellState;

  props: DateCellProps;

  constructor(parent: Element, props: DateCellProps) {
    this.parent = parent;

    this.props = props;

    this.cell = document.createElement('div');
    this.cell.classList.add('calendar__date');

    this.dateText = document.createElement('div');
    this.dateText.classList.add('date__name');

    this.state = {
      date: 0,
    };

    this.addEvent();
  }

  getState() {
    return this.state;
  }

  setState(state: DateCellState) {
    this.state = {
      ...this.state,
      ...state,
    };

    if (this.props.date === this.state.date) {
      this.dateText.classList.add(this.#activeClassName);
    } else if (this.dateText.classList.contains(this.#activeClassName))
      this.dateText.classList.remove(this.#activeClassName);
  }

  setDate(date: number) {
    this.setState({date});
    this.dateText.textContent = date.toString();
  }

  render() {
    this.cell.appendChild(this.dateText);
    this.parent.appendChild(this.cell);
  }

  addEvent() {
    const dateTextChangeEvent = new CustomEvent('update:date-name', {
      detail: this.getState.bind(this),
    });

    this.dateText.addEventListener('click', (e: Event) => {
      const {textContent} = e.target as HTMLElement;

      this.setState({date: Number(textContent)});

      document.body.dispatchEvent(dateTextChangeEvent);
    });
  }
}

export default DateCell;
