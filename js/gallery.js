'use strict';

(() => {
  const documentLoadHandler = async () => {
    const photoListEl = document.querySelector('[data-role="photo-list"]');
    const albumHeaderEl = document.querySelector('[data-role="album-header"]');

    try {
      const services = configureServices({
        BASE_URL: 'https://jsonplaceholder.typicode.com',
        ALBUM_URL: '/photos.html'
      });

      const albumId = services.getAlbumIdFromUrl(document.location.href);

      const photoCarousel = new PhotoCarousel(photoListEl, albumId, services.getPhotosByAlbumId);
      const albumHeader = new AlbumHeader(albumHeaderEl, albumId, services.getAlbumById);

      await Promise.all([
        photoCarousel.request(),
        albumHeader.request(),
      ]);

    } catch (e) {
      alert(e);
    }
  };

  document.addEventListener('DOMContentLoaded', documentLoadHandler);
})();