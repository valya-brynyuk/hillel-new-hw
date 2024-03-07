const getForecastByCity = (config) => (city) => {
  return fetch(`${config.BASE_URL}/data/2.5/weather?q=${city}&units=metric&APPID=${config.APPID}`)
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(resp.statusText)
      }

      return resp.json();
    }).then((json) => new Forecast(json));
}