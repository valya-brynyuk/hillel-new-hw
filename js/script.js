'use strict';

(() => {
  const documentLoadHandler = () => {
    const forecastForm = document.querySelector('[data-role="forecast-form"]');
    const forecastResultEl = document.querySelector('[data-role="forecast-result"]');
    const countdownElem = document.querySelector('[data-role="countdown"]');

    try {
      const COUNTDOWN_TTL = 10;
      const services = configureServices({
        BASE_URL: 'http://api.openweathermap.org',
        APPID: '5d066958a60d315387d9492393935c19',
      });

      const findForm = new ForecastForm(forecastForm, services.getForecastByCity, new services.EventBus());
      const forecastResult = new ForecastResult(forecastResultEl);
      const countdown = new Countdown(countdownElem, COUNTDOWN_TTL, new services.EventBus())

      findForm.eventBus.subscribe(ForecastForm.EVENT_DATA_LOADED, (forecast) => {
        forecastResult.setForecast(forecast);
        forecastResult.show();
        countdown.stop();
        countdown.start();
      });

      findForm.eventBus.subscribe(ForecastForm.EVENT_DATA_FAILED, () => {
        forecastResult.close();
        countdown.stop();
      });

      countdown.eventBus.subscribe(Countdown.EVENT_TIME_END, () => {
        findForm.request();
      });

    } catch (e) {
      console.error(e);
    }
  };

  document.addEventListener('DOMContentLoaded', documentLoadHandler);
})();