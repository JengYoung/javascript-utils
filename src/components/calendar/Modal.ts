import CalendarForm from './Form';

interface ModalState {
  visible: boolean;
}
class Modal {
  state: ModalState;

  root: Element;

  modalInner: Element;

  modal: Element;

  form: CalendarForm;

  constructor(root: Element, state: ModalState) {
    this.root = root;
    this.state = state;

    this.modal = document.createElement('div');
    this.modal.classList.add('calendar-modal');

    this.modalInner = document.createElement('div');
    this.modalInner.classList.add('calendar-modal__inner');

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
    this.modal.appendChild(this.modalInner);
    this.root.appendChild(this.modal);
  }
}

export default Modal;
