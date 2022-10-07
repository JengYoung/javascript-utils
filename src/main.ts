import Calendar from './components/calendar';
import CalendarForm from './components/calendar/Form';

const $app = document.querySelector('#app');

const calendar = new Calendar($app as Element);

const form = new CalendarForm($app as Element);

form.render();

calendar.render();
