class CommentItem {
  #wrapper = null;
  #name = null;
  #body = null;

  constructor(wrapper) {
    this.#wrapper = wrapper;
    if (!this.#wrapper) {
      throw new Error('Wrapper must be a valid block element');
    }

    this.#name = this.#wrapper.querySelector('[data-role="name"]');
    if (!this.#name) {
      throw new Error('Can not find name element');
    }

    this.#body = this.#wrapper.querySelector('[data-role="body"]');
    if (!this.#body) {
      throw new Error('Can not find body element');
    }
  }

  get wrapper () {
    return this.#wrapper;
  }

  setComment = (comment) => {
    if (!comment || !(comment instanceof Comment)) {
      throw new Error('Comment must be a valid comment');
    }

    requestAnimationFrame(() => {
      this.#name.innerText = comment.name;
      this.#body.innerText = comment.body;
    });
  }
}