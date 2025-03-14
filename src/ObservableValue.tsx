type Subscriber<Value> = (nextValue: Value) => void;

class Subscription {
  unsubscribe: () => void;
  constructor(unsubscribe: () => void) {
    this.unsubscribe = unsubscribe;
  }
}

class ObservableValue<Value> {
  value: Value;
  #subscriptions = new Map<number, Subscriber<Value>>();
  constructor(value: Value) {
    this.value = value;
  }

  subscribe(subscriber: Subscriber<Value>) {
    const id = this.#subscriptions.size;
    this.#subscriptions.set(id, subscriber);
    subscriber(this.value);
    return new Subscription(() => {
      this.#subscriptions.delete(id);
    });
  }

  next(value: Value) {
    this.value = value;
    for (const [, subscriber] of this.#subscriptions) {
      subscriber(this.value);
    }
  }
}

export default ObservableValue;
