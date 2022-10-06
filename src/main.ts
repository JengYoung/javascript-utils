import Calendar from './components/calendar';

const $app = document.querySelector('#app');

const calendar = new Calendar($app as Element);

console.log(calendar);
