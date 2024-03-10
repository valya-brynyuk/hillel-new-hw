'use strict';

(() => {
  const documentLoadHandler = async () => {
    const albumListEl = document.querySelector('[data-role="album-list"]');

    try {
      const services = configureServices({
        BASE_URL: 'https://jsonplaceholder.typicode.com',
        ALBUM_URL: '/photos.html'
      });

      const albumList = new AlbumList(albumListEl, services.getAlbums, services.generateAlbumLink);
      await albumList.request();
    } catch (e) {
      console.error(e);
    }
  };

  document.addEventListener('DOMContentLoaded', documentLoadHandler);
})();