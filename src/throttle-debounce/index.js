import throttle from './throttle.ts';
import debounce from './debounce.ts';

const input = document.createElement('input', { class: 'input' });

const input2 = document.createElement('input', { class: 'input2' })

input.addEventListener('input', throttle(() => {
  console.log(e.target.value)
}, 300))

document.body.appendChild(input);
document.body.appendChild(input2);



