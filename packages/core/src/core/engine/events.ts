function subscribe<T>(eventName: string, listener: (args: T) => void) {
  document.addEventListener(eventName, (event) => {
    const e = event as CustomEvent;
    listener(e.detail as T);
  });
}

function unsubscribe(eventName: string, listener: any) {
  document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data: unknown) {
  const event = new CustomEvent(eventName, { detail: data });
  document.dispatchEvent(event);
}

export { publish, subscribe, unsubscribe };
