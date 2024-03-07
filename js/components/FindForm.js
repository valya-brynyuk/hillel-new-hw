const INVALID_CLASS = 'is-invalid';

class FindForm {
  static EVENT_POST_LOADED = 'EVENT_POST_LOADED';

  #form = null;
  #input = null;
  #errorElem = null;
  #submitButton = null;
  #getPostService = null;
  #eventBus = null;

  constructor(form, getPostService, eventBus) {
    if (!form || !(form instanceof HTMLFormElement)) {
      throw new Error('form must be a valid form element');
    }
    this.#form = form;
    this.#input = this.#form.querySelector('[data-role="input"]');
    if (!this.#input || !(this.#input instanceof HTMLInputElement)) {
      throw new Error('Can not find input element');
    }

    this.#errorElem = this.#form.querySelector('[data-role="error-elem"]');
    if (!this.#errorElem || !(this.#errorElem instanceof HTMLElement)) {
      throw new Error('Can not find error element');
    }

    this.#submitButton = this.#form.querySelector('[data-role="submit-button"]');
    if (!this.#submitButton) {
      throw new Error('Can not find submit button');
    }

    this.#getPostService = getPostService;
    if (!this.#getPostService || typeof this.#getPostService !== 'function' ) {
      throw new Error('Post service must be a valid function');
    }

    this.#eventBus = eventBus;
    if (!this.#eventBus || !(this.#eventBus instanceof EventBus)) {
      throw new Error('Event bus is required');
    }

    this.#form.addEventListener('submit', this.formSubmitHandler);
  }

  get eventBus() {
    return this.#eventBus;
  }

  #getValidPayload = () => {
    const query = this.#input.value.trim();
    if (!query.length) {
      throw new Error('Post id is required field');
    } else if (!Number.isFinite(+query) || +query < 1 || +query > 100) {
      throw new Error('Post id must be a valid number between 1 and 100');
    }

    return {
      query,
    };
  }

  #setError = (error) => {
    if (error.length) {
      this.#input.classList.add(INVALID_CLASS);
    } else {
      this.#input.classList.remove(INVALID_CLASS);
    }

    requestAnimationFrame(() => {
      this.#errorElem.innerText = error;
    });
  }

  #startLoading = () => {
    this.#input.disabled = true;
    this.#submitButton.disabled = true;

    requestAnimationFrame(() => {
      this.#submitButton.dataset.defaultText = this.#submitButton.innerText;
      this.#submitButton.innerText = 'Loading...';
    });
  }

  #stopLoading = () => {
    this.#input.disabled = false;
    this.#submitButton.disabled = false;

    requestAnimationFrame(() => {
       this.#submitButton.innerText = this.#submitButton.dataset.defaultText;
    });
  }

  formSubmitHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();

    this.#setError('');
    this.#startLoading();


    Promise.resolve()
      .then(() => {
        const payload = this.#getValidPayload();

        return this.#getPostService(payload.query);
      })
      .then((data) => {
        this.#eventBus.trigger(FindForm.EVENT_POST_LOADED, data);
        this.#input.value = '';
      })
      .catch((e) => {
        this.#setError(e.message);
      })
      .finally(() => {
        this.#stopLoading();
      });
  }
}