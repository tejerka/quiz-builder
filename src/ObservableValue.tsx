type Subscriber<Value> = (nextValue: Value) => void;

class Subscription {
  unsubscribe: () => void;
  constructor(unsubscribe: () => void) {
    this.unsubscribe = unsubscribe;
  }
}

class ObservableValue<Value> {
  value: Value;
  #subscriptions = new Array<Subscriber<Value>>();
  constructor(value: Value) {
    this.value = value;
  }

  subscribe(subscriber: Subscriber<Value>) {
    this.#subscriptions.push(subscriber);
    subscriber(this.value);
    return new Subscription(() => {
      this.#subscriptions.filter((fn) => fn !== subscriber);
    });
  }

  next(value: Value) {
    this.value = value;
    for (const subscriber of this.#subscriptions) {
      subscriber(value);
    }
  }
}

export default ObservableValue;
