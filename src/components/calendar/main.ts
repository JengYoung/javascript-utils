/**
 * 현재 타입스크립트 코드의 엔트리는 src/main.ts 입니다.
 * 해당 소스코드를 src/main에 옮겨서 작동하면 정상 작동합니다.
 */
import Calendar from '@/components/calendar';
import {
  KEY_ESCAPE,
  OPEN_UPDATE_SCHEDULE_MODAL,
  STORAGE_KEY,
  UPDATE_LOCAL_STORAGE,
} from '@/components/calendar/constants';
import CalendarForm, {
  CalendarScheduleInterface,
} from '@/components/calendar/Form';
import Modal from '@/components/calendar/Modal';
import {getLocalStorageItem} from '@/storage';

export interface AppState {
  visible: boolean;
  schedules: CalendarScheduleInterface[];
}

class App {
  app: Element;

  calendar: Calendar;

  form: CalendarForm;

  modal: Modal;

  state: AppState;

  constructor() {
    this.app = document.querySelector('#app') as Element;

    this.state = {
      visible: false,
      schedules: getLocalStorageItem(STORAGE_KEY, []),
    };

    this.calendar = new Calendar(this.app as Element);
    this.form = new CalendarForm(this.app as Element);
    this.modal = new Modal(document.body as Element, {
      visible: this.state.visible,
    });

    this.addEvent();
  }

  addEvent() {
    document.body.addEventListener(
      OPEN_UPDATE_SCHEDULE_MODAL,
      (e: CustomEventInit) => {
        this.setState({visible: true});
        this.modal.form.setState(e.detail.state);
      },
    );

    document.body.addEventListener(UPDATE_LOCAL_STORAGE, () => {
      this.setState({
        visible: false,
        schedules: getLocalStorageItem(STORAGE_KEY, []),
      });
    });

    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === KEY_ESCAPE && this.state.visible) {
        this.setState({visible: false});
      }
    });
  }

  setState(state: Partial<AppState>) {
    this.state = {
      ...this.state,
      ...state,
    };

    this.form.setState({
      schedules: this.state.schedules,
    });
    this.calendar.setState({
      schedules: this.state.schedules,
    });

    this.modal.setState({
      visible: this.state.visible,
    });
  }

  render() {
    this.form.render();
    this.calendar.render();
    this.modal.render();
  }
}

new App().render();
