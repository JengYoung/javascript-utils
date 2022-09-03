const debounce = (cb: (e: Event) => void, delay = 300) => {
  let timerFunc: null | NodeJS.Timeout = null;

  return (e: Event) => {
    if (timerFunc) clearTimeout(timerFunc);
    timerFunc = setTimeout(cb, delay, e)
  }
}

export default debounce;