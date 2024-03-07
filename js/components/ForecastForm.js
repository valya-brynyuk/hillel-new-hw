const INVALID_CLASS = 'is-invalid';

class ForecastForm {
  static EVENT_DATA_LOADED = 'EVENT_DATA_LOADED';
  static EVENT_DATA_FAILED = 'EVENT_DATA_FAILED';

  #form = null;
  #input = null;
  #errorElem = null;
  #submitButton = null;
  #forecastService = null;
  #eventBus = null;

  constructor(form, forecastService, eventBus) {
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

    this.#forecastService = forecastService;
    if (!this.#forecastService || typeof this.#forecastService !== 'function' ) {
      throw new Error('Forecast service must be a valid function');
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
      throw new Error('City name is required field');
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

    this.request();
  }

  request = () => {
    this.#setError('');
    this.#startLoading();

    Promise.resolve()
      .then(() => {
        const payload = this.#getValidPayload();

        return this.#forecastService(payload.query);
      })
      .then((data) => {
        this.#eventBus.trigger(ForecastForm.EVENT_DATA_LOADED, data);
      })
      .catch((e) => {
        this.#setError(e.message);
        this.#eventBus.trigger(ForecastForm.EVENT_DATA_FAILED);
      })
      .finally(() => {
        this.#stopLoading();
      });
  }
}