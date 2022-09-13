import throttle from '../throttle-debounce/throttle';
import debounce from '../throttle-debounce/debounce';

const input = document.createElement('input');

const input2 = document.createElement('input');

/* eslint-disable no-console */
input.addEventListener(
  'input',
  throttle(
    (e: Event) => console.log((e.target as HTMLInputElement).value),
    1000,
  ),
);
input2.addEventListener(
  'input',
  debounce(
    (e: Event) => console.log((e.target as HTMLInputElement).value),
    1000,
  ),
);

document.body.appendChild(input);
document.body.appendChild(input2);
