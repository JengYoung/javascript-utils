
const throttle = (cb: Function, delay = 300) => {
  let timerFunc: null | NodeJS.Timeout = null;

  return (e: Event) => {
    if (timerFunc) return;
    
    timerFunc = setTimeout(() => {
      cb(e);
      timerFunc = null;
    }, delay)
  }
}

export default throttle;