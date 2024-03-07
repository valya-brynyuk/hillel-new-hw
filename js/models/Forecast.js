class Forecast {
  #temp  = '';
  #pressure   = '';
  #description  = '';
  #humidity   = '';
  #speed    = '';
  #deg     = '';
  #icon  = '';
  #name = '';

  constructor(payload) {
    if (!payload.main || typeof payload.main !== 'object') {
      throw new Error('Payload must contain main key with nested values');
    } else if (!payload.wind || typeof payload.wind !== 'object') {
      throw new Error('Payload must contain wind key with nested values');
    } else if (!payload.weather || !Array.isArray(payload.weather) || !payload.weather.length) {
      throw new Error('Payload must contain a weather block with valid array');
    } else if (!payload.main.temp || !Number.isFinite(+payload.main.temp)) {
      throw new Error('Main block must contain a valid temp number');
    } else if (!payload.main.pressure || !Number.isFinite(+payload.main.pressure)) {
      throw new Error('Main block must contain a valid pressure number');
    } else if (!payload.main.humidity || !Number.isFinite(+payload.main.humidity)) {
      throw new Error('Main block must contain a valid humidity number');
    } else if (!payload.wind.speed || !Number.isFinite(+payload.wind.speed)) {
      throw new Error('Wind block must contain a valid speed number');
    } else if (!payload.wind.deg || !Number.isFinite(+payload.wind.deg)) {
      throw new Error('Wind block must contain a valid deg number');
    } else if (!payload.weather[0].description) {
      throw new Error('Weather array must contain a valid description');
    } else if (!payload.weather[0].icon) {
      throw new Error('Weather array must contain a valid icon');
    } else if (!payload.name) {
      throw new Error('Payload array must contain a valid name');
    }

    this.#temp = payload.main.temp;
    this.#pressure = payload.main.pressure;
    this.#description = payload.weather[0].description;
    this.#humidity = payload.main.humidity;
    this.#speed = payload.wind.speed;
    this.#deg = payload.wind.deg;
    this.#icon = payload.weather[0].icon;
    this.#name = payload.name;
  }

  get nameFormatted() {
    return `${this.#name} forecast`;
  }

  get tempFormatted() {
    const temp = Math.round(this.#temp);
    return `${temp > 0 ? '+' : ''}${temp}°C`;
  }

  get pressureFormatted() {
    return `${this.#pressure}mmHg`;
  }

  get description() {
    return this.#description;
  }

  get humidityFormatted() {
    return `${this.#humidity}%`;
  }

  get speedFormatted() {
    return `${this.#speed}m/s`;
  }

  get degFormatted() {
    if (this.#deg > 337.5 || this.#deg < 22.5) {
      return 'N';
    } else if (this.#deg > 22.5 || this.#deg < 67.5) {
      return 'NE';
    } else if (this.#deg > 67.5 || this.#deg < 112.5) {
      return 'E';
    } else if (this.#deg > 112.5 || this.#deg < 157.5) {
      return 'SE';
    } else if (this.#deg > 157.5 || this.#deg < 202.5) {
      return 'S';
    } else if (this.#deg > 202.5 || this.#deg < 247.5) {
      return 'SW';
    } else if (this.#deg > 247.5 || this.#deg < 292.5) {
      return 'W';
    } else if (this.#deg > 292.5 || this.#deg < 337.5) {
      return 'NW';
    }

    return '';
  }

  get iconFormatted() {
    return `https://openweathermap.org/img/w/${this.#icon}.png`;
  }

}