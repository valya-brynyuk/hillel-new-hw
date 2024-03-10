class AlbumItem {
  #wrapper = null;
  #title = '';
  #link = '';
  #getAlbumUrlService = null;

  constructor(wrapper, getAlbumUrlService) {
    if (!wrapper) {
      throw new Error('Wrapper must be a valid html element');
    }
    this.#wrapper = wrapper;
    this.#title = this.#wrapper.querySelector('[data-role="title"]');
    if (!this.#title) {
      throw new Error('Can not find title element');
    }

    this.#link = this.#wrapper.querySelector('[data-role="link"]');
    if (!this.#link) {
      throw new Error('Can not find link element');
    }

    this.#getAlbumUrlService = getAlbumUrlService;
    if (!this.#getAlbumUrlService || typeof this.#getAlbumUrlService !== 'function') {
      throw new Error('get album url service must be a valid function');
    }
  }

  setAlbum = (album) => {
    if (!(album instanceof Album)) {
      throw new Error('not valid Album value')
    }

    requestAnimationFrame(() => {
      this.#title.innerText = album.title;
      this.#link.href = this.#getAlbumUrlService(album);
    });
  }
}