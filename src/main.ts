import Calendar from './components/calendar';
import CalendarForm from './components/calendar/Form';
import Modal from './components/calendar/Modal';

const $app = document.querySelector('#app');

const calendar = new Calendar($app as Element);

const form = new CalendarForm($app as Element);

const modal = new Modal(document.body as Element, {visible: true});

form.render();

calendar.render();

modal.render();
