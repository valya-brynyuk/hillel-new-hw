class Album {
  #id  = 0;
  #title   = '';

  constructor(payload) {
    if (!payload.id || !Number.isFinite(+payload.id) || payload.id < 1) {
      throw new Error('Payload must contain id as positive number');
    } else if (!payload.title || typeof payload.title !== 'string') {
      throw new Error('Payload must contain a valid title string');
    }

    this.#id = payload.id;
    this.#title = payload.title;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }
}