class Comments {
  #wrapper = null;
  #commentList = null;
  #itemTemplate = null;
  #emptyBlockTemplate = null;

  constructor(wrapper) {
    this.#wrapper = wrapper;
    if (!this.#wrapper || !(this.#wrapper instanceof HTMLElement)) {
      throw new Error('Wrapper must be a valid block element');
    }

    this.#commentList = this.#wrapper.querySelector('[data-role="comments-list"]');
    if (!this.#commentList) {
      throw new Error('Can not find comment list element');
    }

    this.#itemTemplate = this.#wrapper.querySelector('[data-role="item-template"]');
    if (!this.#itemTemplate) {
      throw new Error('Can not find comment item template element');
    }

    this.#emptyBlockTemplate = this.#wrapper.querySelector('[data-role="empty-block"]');
    if (!this.#emptyBlockTemplate) {
      throw new Error('Can not find comment empty block template element');
    }
  }

  reset = () => {
    requestAnimationFrame(() => {
      this.#commentList.innerHTML = '';
    });
  }

  #getEmptyBlock = () => {
    return this.#emptyBlockTemplate.content.cloneNode(true);
  }

  #getItemBlock = () => {
    return this.#itemTemplate.content.cloneNode(true);
  }

  #setupEmptyBlock = () => {
    this.reset();

    requestAnimationFrame(() => {
      this.#commentList.appendChild(this.#getEmptyBlock());
    });
  }

  #setupComments = (comments) => {
    this.reset();

    const frag = document.createDocumentFragment();
    for (const comment of comments) {
      const template = this.#getItemBlock();
      const commentItem = new CommentItem(template);
      commentItem.setComment(comment);
      frag.appendChild(commentItem.wrapper)
    }

    requestAnimationFrame(() => {
      this.#commentList.appendChild(frag);
    });
  }

  setItems = (comments) => {
    if (!Array.isArray(comments)) {
      throw new Error('comments must be a valid array');
    } if (!comments.length) {
      this.#setupEmptyBlock();
    }

    this.#setupComments(comments);
  }
}