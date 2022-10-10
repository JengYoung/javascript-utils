import {getLocalStorageItem, setLocalStorageItem} from '~/src/storage';
import {OPEN_UPDATE_SCHEDULE_MODAL, STORAGE_KEY} from './constants';
import CalendarForm, {CalendarScheduleInterface} from './Form';

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

    this.form = new CalendarForm(this.modalInner as Element, {
      headerText: '일정 변경',
      onSubmit(e: Event) {
        e.preventDefault();
        const nowState = (this as unknown as CalendarForm).state;
        // NOTE: this function is bound with CalendarForm Class Component

        const schedules = getLocalStorageItem(STORAGE_KEY);

        const nextSchedules = schedules.map(
          (schedule: CalendarScheduleInterface) =>
            schedule.id === nowState.id ? nowState : schedule,
        );

        setLocalStorageItem(STORAGE_KEY, nextSchedules);
      },
    });

    this.addEvent();
  }

  addEvent() {
    document.body.addEventListener(
      OPEN_UPDATE_SCHEDULE_MODAL,
      (e: CustomEventInit) => {
        this.setState({visible: true});
        this.form.setState(e.detail.state);
      },
    );

    this.modalCloseButton.addEventListener('click', () => {
      this.setState({visible: false});
    });
  }

  setState(state: Partial<ModalState>) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.render();
  }

  render() {
    if (this.root.contains(this.modal)) this.root.removeChild(this.modal);

    if (this.state.visible) {
      this.form.render();

      this.modalInner.appendChild(this.modalCloseButton);
      this.modal.appendChild(this.modalInner);

      this.root.appendChild(this.modal);
    }
  }
}

export default Modal;
