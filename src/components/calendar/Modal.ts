import CalendarForm from './Form';

interface ModalState {
  visible: boolean;
}
class Modal {
  state: ModalState;

  root: Element;

  modalInner: Element;

  modal: Element;

  modalCloseButton: HTMLButtonElement;

  form: CalendarForm;

  constructor(root: Element, state: ModalState) {
    this.root = root;
    this.state = state;

    this.modal = document.createElement('div');
    this.modal.classList.add('calendar-modal');

    this.modalInner = document.createElement('div');
    this.modalInner.classList.add('calendar-modal__inner');

    this.modalCloseButton = document.createElement('button');
    this.modalCloseButton.classList.add('calendar-modal__close-button');

    const modalCloseButtonLine1 = document.createElement('div');
    modalCloseButtonLine1.classList.add('close-button__line');

    const modalCloseButtonLine2 = document.createElement('div');
    modalCloseButtonLine2.classList.add('close-button__line');

    this.modalCloseButton.appendChild(modalCloseButtonLine1);
    this.modalCloseButton.appendChild(modalCloseButtonLine2);

    this.form = new CalendarForm(this.modalInner as Element);
  }

  setState(state: Partial<ModalState>) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
  }

  render() {
    this.form.render();
    this.modalInner.appendChild(this.modalCloseButton);
    this.modal.appendChild(this.modalInner);
    this.root.appendChild(this.modal);
  }
}

export default Modal;
