class EventBus {
  #handlers = new Map();

  #validateEvent = (event) => {
    if (typeof event !== 'string') {
      throw new Error('Event type must be a string');
    }
  }

  subscribe = (event, handler) => {
    this.#validateEvent(event);
    if (typeof handler !== 'function') {
      throw new Error('Handler type must be a function');
    }

    if (!this.#handlers.has(event)) {
      this.#handlers.set(event, []);
    }

    this.#handlers.get(event).push(handler);
  }

  trigger = (event, payload = null) => {
    this.#validateEvent(event);
    if (!this.#handlers.has(event)) {
      return;
    }

    for (const handler of this.#handlers.get(event)) {
      handler(payload);
    }
  }
}