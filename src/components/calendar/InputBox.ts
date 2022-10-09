import {CalendarDateInterface} from '.';
import {CalendarFormTitleInputInterface} from './Form';

/* eslint-disable-next-line no-unused-vars */
type InputEventCallback = (_event: Event) => any;

export interface InputParam {
  parent: HTMLElement;
  state: CalendarFormTitleInputInterface | CalendarDateInterface;
  label: string;
  type?: string;
  idName: string;
  className?: string;
  placeholder?: string;
  onInput: InputEventCallback;
}

class InputBox {
  parent: InputParam['parent'];

  state: InputParam['state'];

  inputBox: Element;

  input: HTMLInputElement;

  label: HTMLLabelElement;

  onInput: InputParam['onInput'];

  constructor(param: InputParam) {
    const {
      parent,
      state,
      label,
      type = 'text',
      idName,
      className,
      placeholder = '',
      onInput,
    } = param;

    this.parent = parent;

    this.state = state;

    this.inputBox = document.createElement('div');
    this.inputBox.classList.add('input-box');

    this.label = document.createElement('label');
    this.label.classList.add('input-box__label');
    this.label.htmlFor = idName;
    this.label.textContent = label;

    this.input = document.createElement('input');
    this.input.id = idName;
    if (className) this.input.classList.add(className, 'input-box__input');
    this.input.type = type;
    this.input.placeholder = placeholder;
    this.input.autofocus = true;

    this.onInput = onInput;

    this.addEvent();

    this.render();
  }

  addEvent() {
    this.input.addEventListener('input', this.onInput);
  }

  setState(state: typeof this.state) {
    if (JSON.stringify(this.state) === JSON.stringify(state)) return;

    this.state = {
      ...this.state,
      ...state,
    };
  }

  render() {
    this.parent.appendChild(this.inputBox);

    this.inputBox.appendChild(this.label);
    this.inputBox.appendChild(this.input);
  }
}

export default InputBox;
