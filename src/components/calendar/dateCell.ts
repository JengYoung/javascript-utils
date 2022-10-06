class DateCell {
  parent: Element;

  cell: HTMLElement;

  dateText: HTMLElement;

  constructor(parent: Element) {
    this.parent = parent;

    this.cell = document.createElement('div');
    this.cell.classList.add('calendar__date');

    this.dateText = document.createElement('div');
    this.dateText.classList.add('date__name');
  }

  setDate(date: number) {
    this.dateText.textContent = date.toString();
  }

  render() {
    this.cell.appendChild(this.dateText);
    this.parent.appendChild(this.cell);
  }
}

export default DateCell;
