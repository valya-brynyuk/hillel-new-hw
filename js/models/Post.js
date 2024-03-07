class Post {
  #id = null;
  #title = '';
  #body = '';

  constructor(payload) {
    if (!payload.id || !Number.isFinite(+payload.id)) {
      throw new Error('Payload must contain a valid id number');
    } else if (!payload.title || typeof payload.title !== 'string') {
      throw new Error('Payload must contain a valid string title');
    } else if (!payload.body || typeof payload.body !== 'string') {
      throw new Error('Payload must contain a valid string body');
    }

    this.#id = payload.id;
    this.#title = payload.title;
    this.#body = payload.body;
  }

  get id() {
    return this.#id;
  }

  get title() {
    return this.#title;
  }

  get body() {
    return this.#body;
  }
}