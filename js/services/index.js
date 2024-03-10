const configureServices = (config) => {
  if (!config.BASE_URL || !config.BASE_URL.length || typeof config.BASE_URL !== 'string') {
    throw new Error('BASE_URL is required parameter for services');
  } else if (!config.ALBUM_URL || !config.ALBUM_URL.length || typeof config.ALBUM_URL !== 'string') {
    throw new Error('ALBUM_URL is required parameter for services');
  }

  return {
    getAlbums: getAlbums(config),
    generateAlbumLink: generateAlbumLink(config),
    getAlbumIdFromUrl,
    getPhotosByAlbumId: getPhotosByAlbumId(config),
    getAlbumById: getAlbumById(config),
  }
}