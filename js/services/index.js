const configureServices = (config) => {
  if (!config.BASE_URL || !config.BASE_URL.length || typeof config.BASE_URL !== 'string') {
    throw new Error('BASE_URL is required parameter for services');
  }

  return {
    getPostById: getPostById(config),
    EventBus,
    getCommentsByPostId: getCommentsByPostId(config),
  }
}