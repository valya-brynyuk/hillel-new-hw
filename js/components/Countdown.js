class Countdown {
  static EVENT_TICK = 'EVENT_TICK';
  static EVENT_TIME_END = 'EVENT_TIME_END';

  #wrapper = null;
  #timeElem = null;
  #stopButton = null;
  #ttl = 0;
  #initialTtl = 0;
  #timerDescriptor = 0;
  #eventBus = null;

  constructor(wrapper, ttl, eventBus) {
    if (!wrapper || !(wrapper instanceof HTMLElement)) {
      throw new Error('wrapper must be a valid element');
    }
    this.#wrapper = wrapper;
    this.#timeElem = this.#wrapper.querySelector('[data-role="time"]');
    if (!this.#timeElem) {
      throw new Error('Can not find time element');
    }

    this.#stopButton = this.#wrapper.querySelector('[data-role="stop-btn"]');
    if (!this.#stopButton) {
      throw new Error('Can not find stop button element');
    }

    this.#ttl = ttl;
    this.#initialTtl = ttl;
    if (!this.#ttl || !Number.isFinite(+ttl) || +ttl < 0) {
      throw new Error('ttl must be valid positive number');
    }

    this.#eventBus = eventBus;
    if (!this.#eventBus || !(this.#eventBus instanceof EventBus)) {
      throw new Error('Event bus is required');
    }

    this.#stopButton.addEventListener('click', this.stopBtnClickHandler);
  }

  get eventBus() {
    return this.#eventBus;
  }

  stopBtnClickHandler = () => {
    this.stop();
  }

  #updateView = () => {
    const minutes = this.#ttl > 59 ? Math.floor(this.#ttl / 59) : 0;
    const seconds = minutes > 0 ? this.#ttl - minutes * 59 : this.#ttl;

    this.#timeElem.value = `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0');
  }

  tickHandler = () => {
    this.#eventBus.trigger(Countdown.EVENT_TICK, {
      ttl: this.#ttl,
    });
    this.#updateView();
    this.#ttl -= 1;

    if (this.#ttl < 0) {
      this.stop();

      this.#eventBus.trigger(Countdown.EVENT_TIME_END);
    }
  }

  stop = () => {
    clearInterval(this.#timerDescriptor);
    this.#stopButton.disabled = true;
    this.#timerDescriptor = 0;
  }

  start = () => {
    if (this.#timerDescriptor) {
      throw new Error('timer already started');
    }

    this.#ttl = this.#initialTtl;
    this.#stopButton.disabled = false;

    this.#timerDescriptor = setInterval(this.tickHandler, 1000);
  }
}