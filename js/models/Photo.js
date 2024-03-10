class Photo {
  #id  = 0;
  #title   = '';
  #url   = '';

  constructor(payload) {
    if (!payload.id || !Number.isFinite(+payload.id) || payload.id < 1) {
      throw new Error('Payload must contain id as positive number');
    } else if (!payload.title || typeof payload.title !== 'string') {
      throw new Error('Payload must contain a valid title string');
    } else if (!payload.url || typeof payload.url !== 'string') {
      throw new Error('Payload must contain a valid url string');
    }

    this.#id = payload.id;
    this.#title = payload.title;
    this.#url = payload.url;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get url() {
    return this.#url;
  }
}