class AlbumHeader {
  #wrapper = null;
  #id = null;
  #albumService = null;

  constructor(wrapper, id, albumService) {
    if (!wrapper || !(wrapper instanceof HTMLElement)) {
      throw new Error('form must be a valid block element');
    }
    this.#wrapper = wrapper;
    this.#id = id;
    if (!this.#id || !Number.isFinite(+this.#id) || +this.#id < 1) {
      throw new Error('Id must be a positive number');
    }

    this.#albumService = albumService;
    if (!this.#albumService || typeof this.#albumService !== 'function' ) {
      throw new Error('Album service must be a valid function');
    }
  }

  #setError = (error) => {
    alert(error);
  }

  request = async () => {
    try {
      const album = await this.#albumService(this.#id);

      requestAnimationFrame(() => {
        this.#wrapper.innerHTML = album.title;
      });
    } catch (e) {
      this.#setError(e.message);
    }
  }
}