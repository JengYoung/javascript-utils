const delay = a => new Promise(resolve => setTimeout(() => resolve(a), 1000));

const go = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const add = a => a + 1;

const r = go(10, add, console.log);

console.log(r);

go(go(delay(10), add), console.log);
