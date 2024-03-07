const MODAL_OPEN_CLASS = 'show';

class PostModal {
  static EVENT_COMMENTS_LOADED = 'EVENT_COMMENTS_LOADED';
  static EVENT_CLOSED = 'EVENT_CLOSED';

  #modal = null;
  #post = null;
  #eventBus = null;
  #title = null;
  #body = null;
  #loadCommentsButton = null;
  #getCommentsService = null;

  constructor(modal, eventBus, getCommentsService) {
    if (!modal || !(modal instanceof HTMLElement)) {
      throw new Error('Modal template must be a valid html element');
    }
    this.#modal = modal;

    this.#eventBus = eventBus;
    if (!this.#eventBus || !(this.#eventBus instanceof EventBus)) {
      throw new Error('Event bus is required');
    }

    this.#title = this.#modal.querySelector('[data-role="post-title"]');
    if (!this.#title) {
      throw new Error('Can not find title element');
    }

    this.#body = this.#modal.querySelector('[data-role="post-content"]');
    if (!this.#body) {
      throw new Error('Can not find body element');
    }

    this.#loadCommentsButton = this.#modal.querySelector('[data-role="load-comments-btn"]');
    if (!this.#loadCommentsButton) {
      throw new Error('Can not find load comments button element');
    }

    const closeBtn = this.#modal.querySelector('[data-role="close-btn"]');
    if (!closeBtn) {
      throw new Error('Can not find load close button element');
    }

    this.#getCommentsService = getCommentsService;
    if (!this.#getCommentsService || typeof this.#getCommentsService !== 'function') {
      throw new Error('get comments service must be a valid function');
    }

    closeBtn.addEventListener('click', this.close);
    this.#modal.addEventListener('click', this.backdropClickHandler);
    document.addEventListener('keydown', this.keyDownHandler);
    this.#loadCommentsButton.addEventListener('click', this.loadCommentsClickHandler);
  }

  get eventBus () {
    return this.#eventBus;
  }

  keyDownHandler = (event) => {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  backdropClickHandler = (event) => {
    if (this.#modal === event.target) {
      this.close();
    }
  }

  setPost = (post) => {
    if (!post || !(post instanceof Post)) {
      throw new Error('post must be a valid Post object');
    }

    this.#post = post;
  }

  #startLoading  = () => {
    this.#loadCommentsButton.disabled = true;

    requestAnimationFrame(() => {
      this.#loadCommentsButton.dataset.defaultText = this.#loadCommentsButton.innerText;
      this.#loadCommentsButton.innerText = 'Loading...';
    });
  }

  #stopLoading = () => {
    this.#loadCommentsButton.disabled = false;

    requestAnimationFrame(() => {
      this.#loadCommentsButton.innerText = this.#loadCommentsButton.dataset.defaultText;
    });
  }

  close = () => {
    this.#post = null;
    this.#modal.classList.remove(MODAL_OPEN_CLASS);

    requestAnimationFrame(() => {
      this.#title.innerText = '';
      this.#body.innerText = '';
      this.#modal.style.display = '';
      this.#loadCommentsButton.style.display = '';

      this.#eventBus.trigger(PostModal.EVENT_CLOSED);
    })
  }

  show = () => {
    if (!this.#post) {
      throw new Error('Can not open modal w/o post');
    }

    this.#modal.classList.add(MODAL_OPEN_CLASS);

    requestAnimationFrame(() => {
      this.#title.innerText = this.#post.title;
      this.#body.innerText = this.#post.body;
      this.#modal.style.display = 'block';
    })
  }

  loadCommentsClickHandler = () => {
    this.#startLoading();

    Promise.resolve()
      .then(() => {
          return this.#getCommentsService(this.#post.id);
      })
      .then((data) => {
        this.#eventBus.trigger(PostModal.EVENT_COMMENTS_LOADED, {
          comments: data,
          post: this.#post,
        });
        requestAnimationFrame(() => {
          this.#loadCommentsButton.style.display = 'none';
        });
      })
      .catch((e) => {
        alert(e);
      }).finally(() => {
        this.#stopLoading();
      });
  }
}