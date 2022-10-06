class Calendar {
  target: Element;

  container: HTMLElement;

  inner: HTMLElement;

  constructor(target: Element) {
    this.target = target;

    this.container = document.createElement('div');
    this.container.classList.add('calendar');

    this.inner = document.createElement('div');
    this.inner.classList.add('inner');

    this.init();
  }

  init() {
    this.container.appendChild(this.inner);
    this.target.appendChild(this.container);
  }

  render() {}
}

export default Calendar;
