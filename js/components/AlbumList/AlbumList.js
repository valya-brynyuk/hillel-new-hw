class AlbumList {
  #wrapper = null;
  #itemTemplate = null;
  #albumService = null;
  #getAlbumUrlService = null;

  constructor(wrapper, albumService, getAlbumUrlService) {
    if (!wrapper || !(wrapper instanceof HTMLElement)) {
      throw new Error('form must be a valid block element');
    }
    this.#wrapper = wrapper;
    this.#itemTemplate = this.#wrapper.querySelector('[data-role="item-template"]');
    if (!this.#itemTemplate || !(this.#itemTemplate instanceof HTMLTemplateElement)) {
      throw new Error('Can not find item template element');
    }

    this.#albumService = albumService;
    if (!this.#albumService || typeof this.#albumService !== 'function' ) {
      throw new Error('Album service must be a valid function');
    }

    this.#getAlbumUrlService = getAlbumUrlService;
    if (!this.#getAlbumUrlService || typeof this.#getAlbumUrlService !== 'function') {
      throw new Error('get album url service must be a valid function');
    }
  }

  #setError = (error) => {
    alert(error);
  }

  #getItemTemplate = () => {
    return this.#itemTemplate.content.cloneNode(true);
  }

  #renderItems = (data) => {
    const frag = document.createDocumentFragment();
    for (const album of data) {
      const template = this.#getItemTemplate()
      const albumItem = new AlbumItem(template, this.#getAlbumUrlService);
      albumItem.setAlbum(album);
      frag.appendChild(template);
    }

    requestAnimationFrame(() => {
      this.#wrapper.innerHTML = '';
      this.#wrapper.appendChild(frag);
    });
  }

  request = async () => {
    try {
      const data = await this.#albumService();
      this.#renderItems(data);
    } catch (e) {
      this.#setError(e.message);
    }
  }
}