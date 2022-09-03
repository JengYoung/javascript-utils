
const throttle = (cb: Function, delay = 300) => {
  let loading = false;
  
  return () => {
    if (loading) return;
    
    setTimeout(() => {
      loading = false;
    }, delay)
    
    loading = true;

    return cb();
  }
}

export default throttle;