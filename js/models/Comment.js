class Comment {
  #id = null;
  #name = '';
  #body = '';
  #email = '';

  constructor(payload) {
    if (!payload.id || !Number.isFinite(+payload.id)) {
      throw new Error('Payload must contain a valid id number');
    } else if (!payload.name || typeof payload.name !== 'string') {
      throw new Error('Payload must contain a valid string title');
    } else if (!payload.body || typeof payload.body !== 'string') {
      throw new Error('Payload must contain a valid string body');
    } else if (!payload.email || typeof payload.email !== 'string') {
      throw new Error('Payload must contain a valid string email');
    }


    this.#id = payload.id;
    this.#name = payload.name;
    this.#body = payload.body;
    this.#email = payload.email;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get body() {
    return this.#body;
  }

  get email() {
    return this.#email;
  }
}