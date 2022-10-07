class CalendarForm {
  target: Element;

  header: HTMLElement;

  form: HTMLFormElement;

  titleInput: HTMLInputElement;

  dateInput: HTMLInputElement;

  submitButton: HTMLButtonElement;

  constructor(target: Element) {
    this.target = target;

    this.form = document.createElement('form');
    this.form.classList.add('calendar-form');

    this.header = document.createElement('header');
    this.header.classList.add('calendar-form__header');
    this.header.textContent = '일정 등록';

    this.titleInput = document.createElement('input');
    this.titleInput.classList.add('calendar-form__title-input');

    this.dateInput = document.createElement('input');
    this.dateInput.classList.add('calendar-form__date-input');

    this.submitButton = document.createElement('button');
    this.submitButton.classList.add('calendar-form__submit-button');
    this.submitButton.textContent = '등록';

    this.target.appendChild(this.form);
  }

  render() {
    this.form.appendChild(this.header);
    this.form.appendChild(this.titleInput);
    this.form.appendChild(this.dateInput);
    this.form.appendChild(this.submitButton);
  }
}

export default CalendarForm;
