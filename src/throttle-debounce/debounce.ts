/* eslint-disable-next-line no-unused-vars */
const debounce = (cb: Function, delay = 300) => {
  let timerFunc: null | NodeJS.Timeout = null;

  return (e: Event) => {
    if (timerFunc) clearTimeout(timerFunc);
    timerFunc = setTimeout(cb, delay, e) as unknown as NodeJS.Timeout;
  };
};

export default debounce;
