import DateCell from './dateCell';

class Calendar {
  target: Element;

  container: HTMLElement;

  inner: HTMLElement;

  constructor(target: Element) {
    this.target = target;

    this.container = document.createElement('div');
    this.container.classList.add('calendar');

    this.inner = document.createElement('div');
    this.inner.classList.add('calendar__inner');
  }

  addCell() {
    for (let i = 0; i < 32; i += 1) {
      const dateCell = new DateCell(this.inner);
      dateCell.setDate(i);

      dateCell.render();
    }
  }

  render() {
    this.addCell();
    this.container.appendChild(this.inner);
    this.target.appendChild(this.container);
  }
}

export default Calendar;
