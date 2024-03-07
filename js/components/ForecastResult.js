const HIDE_CLASS = 'd-none';

class ForecastResult {
  #wrapper = null;
  #temp = '';
  #pressure = '';
  #description = '';
  #humidity = '';
  #speed = '';
  #deg = '';
  #icon = '';
  #name = '';

  constructor(wrapper) {
    if (!wrapper || !(wrapper instanceof HTMLElement)) {
      throw new Error('Wrapper must be a valid html element');
    }
    this.#wrapper = wrapper;
    this.#temp = this.#wrapper.querySelector('[data-role="temp"]');
    if (!this.#temp) {
      throw new Error('Can not find temp element');
    }

    this.#pressure = this.#wrapper.querySelector('[data-role="pressure"]');
    if (!this.#pressure) {
      throw new Error('Can not find pressure element');
    }

    this.#description = this.#wrapper.querySelector('[data-role="desc"]');
    if (!this.#description) {
      throw new Error('Can not find description element');
    }

    this.#humidity = this.#wrapper.querySelector('[data-role="humidity"]');
    if (!this.#humidity) {
      throw new Error('Can not find humidity element');
    }

    this.#speed = this.#wrapper.querySelector('[data-role="speed"]');
    if (!this.#speed) {
      throw new Error('Can not find speed element');
    }

    this.#deg = this.#wrapper.querySelector('[data-role="deg"]');
    if (!this.#deg) {
      throw new Error('Can not find deg element');
    }

    this.#icon = this.#wrapper.querySelector('[data-role="icon"]');
    if (!this.#icon) {
      throw new Error('Can not find icon element');
    }

    this.#name = this.#wrapper.querySelector('[data-role="name"]');
    if (!this.#name) {
      throw new Error('Can not find name element');
    }
  }

  setForecast = (forecast) => {
    if (!(forecast instanceof Forecast)) {
      throw new Error('not valid forecast value')
    }

    requestAnimationFrame(() => {
      this.#temp.innerText = forecast.tempFormatted;
      this.#pressure.innerText = forecast.pressureFormatted;
      this.#description.innerText = forecast.description;
      this.#humidity.innerText = forecast.humidityFormatted;
      this.#speed.innerText = forecast.speedFormatted;
      this.#deg.innerText = forecast.degFormatted;
      this.#icon.src = forecast.iconFormatted;
      this.#name.innerText = forecast.nameFormatted;
    });
  }

  show = () => {
    this.#wrapper.classList.remove(HIDE_CLASS);
  }

  close = () => {
    this.#wrapper.classList.add(HIDE_CLASS);

    requestAnimationFrame(() => {
      this.#temp.innerText = '';
      this.#pressure.innerText = '';
      this.#description.innerText = '';
      this.#humidity.innerText = '';
      this.#speed.innerText = '';
      this.#deg.innerText = '';
      this.#icon.src = '';
      this.#name.innerText = '';
    });
  }
}