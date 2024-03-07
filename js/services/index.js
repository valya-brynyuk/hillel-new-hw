const configureServices = (config) => {
  if (!config.BASE_URL || !config.BASE_URL.length || typeof config.BASE_URL !== 'string') {
    throw new Error('BASE_URL is required parameter for services');
  } else if (!config.APPID || !config.APPID.length || typeof config.APPID !== 'string') {
    throw new Error('APPID is required parameter for services');
  }

  return {
    getForecastByCity: getForecastByCity(config),
    EventBus,
  }
}