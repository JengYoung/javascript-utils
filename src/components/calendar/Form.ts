import InputBox from './InputBox';

class CalendarForm {
  target: Element;

  header: HTMLElement;

  form: HTMLFormElement;

  titleInput: InputBox;

  dateStartInput: InputBox;

  dateEndInput: InputBox;

  submitButton: HTMLButtonElement;

  constructor(target: Element) {
    this.target = target;

    this.form = document.createElement('form');
    this.form.classList.add('calendar-form');

    this.header = document.createElement('header');
    this.header.classList.add('calendar-form__header');
    this.header.textContent = '일정 등록';

    this.titleInput = new InputBox({
      parent: this.form,
      label: '일정 이름',
      idName: 'title-input',
      className: 'calendar-form__title-input',
      placeholder: '일정 이름을 입력해주세요. 📆',
      onInput: () => {},
    });

    this.dateStartInput = new InputBox({
      parent: this.form,
      label: '시작일',
      type: 'date',
      idName: 'date-input',
      className: 'calendar-form__date-start-input',
      onInput: this.onDateInput.bind(this),
    });

    this.dateEndInput = new InputBox({
      parent: this.form,
      label: '종료일',
      type: 'date',
      idName: 'date-input',
      className: 'calendar-form__date-end-input',
      onInput: this.onDateInput.bind(this),
    });

    this.submitButton = document.createElement('button');
    this.submitButton.classList.add('calendar-form__submit-button');
    this.submitButton.textContent = '등록';

    this.target.appendChild(this.form);
  }

  render() {
    this.form.innerHTML = '';
    this.form.appendChild(this.header);

    this.titleInput.render();
    this.dateStartInput.render();
    this.dateEndInput.render();

    this.form.appendChild(this.submitButton);
  }

  onDateInput(e: Event) {
    console.log((e.target as HTMLInputElement).value);
  }
}

export default CalendarForm;
