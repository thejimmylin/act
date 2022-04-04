const queue = [];
const threshold = 5;
const transitions = [];
let deadline = 0;

const startTransition = (cb) => {
  transitions.push(cb) && translate();
};

const schedule = (callback) => {
  queue.push({ callback });
  startTransition(flush);
};

const task = (pending) => {
  const cb = () => transitions.splice(0, 1).forEach((c) => c());
  if (!pending && typeof Promise !== "undefined") {
    return () => queueMicrotask(cb);
  }
  if (typeof MessageChannel !== "undefined") {
    const { port1, port2 } = new MessageChannel();
    port1.onmessage = cb;
    return () => port2.postMessage(null);
  }
  return () => setTimeout(cb);
};

let translate = task(false);

const flush = () => {
  deadline = getTime() + threshold;
  let job = peek(queue);
  while (job && !shouldYield()) {
    const { callback } = job;
    job.callback = null;
    const next = callback();
    if (next) {
      job.callback = next;
    } else {
      queue.shift();
    }
    job = peek(queue);
  }
  job && startTransition(flush);
};

const shouldYield = () => {
  const pending = getTime() >= deadline;
  translate = task(pending);
  return pending;
};

const getTime = () => performance.now();

const peek = (queue) => queue[0];

export {
  schedule,
  startTransition,
  shouldYield,
}