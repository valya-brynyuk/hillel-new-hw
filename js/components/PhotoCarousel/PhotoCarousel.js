class PhotoCarousel {
  #wrapper = null;
  #itemTemplate = null;
  #photoService = null;
  #albumId = 0;
  #items = [];
  #activeIndex = 0;
  #prevBtn = null;
  #list = null;
  #nextBtn = null;

  constructor(wrapper, albumId, photoService) {
    if (!wrapper || !(wrapper instanceof HTMLElement)) {
      throw new Error('form must be a valid block element');
    }
    this.#wrapper = wrapper;
    this.#itemTemplate = this.#wrapper.querySelector('[data-role="item-template"]');
    if (!this.#itemTemplate || !(this.#itemTemplate instanceof HTMLTemplateElement)) {
      throw new Error('Can not find item template element');
    }

    this.#photoService = photoService;
    if (!this.#photoService || typeof this.#photoService !== 'function' ) {
      throw new Error('Album service must be a valid function');
    }

    this.#albumId = albumId;
    if (!this.#albumId || !Number.isFinite(+this.#albumId) || this.#albumId < 1) {
      throw new Error('Album id must be a valid positive number');
    }

    this.#prevBtn = this.#wrapper.querySelector('[data-role="prev-btn"]');
    if (!this.#prevBtn) {
      throw new Error('Can not find prev button element');
    }

    this.#nextBtn = this.#wrapper.querySelector('[data-role="next-btn"]');
    if (!this.#nextBtn) {
      throw new Error('Can not find next button element');
    }

    this.#list = this.#wrapper.querySelector('[data-role="list"]');
    if (!this.#list) {
      throw new Error('Can not find list element');
    }

    this.#prevBtn.addEventListener('click', this.prevBtnClickHandler);
    this.#nextBtn.addEventListener('click', this.nextBtnClickHandler);
  }

  prevBtnClickHandler = () => {
    if (this.#items.length < 2) {
      return;
    }

    const nextIndex = this.#activeIndex - 1;
    this.#items[this.#activeIndex].deactivate();
    this.#activeIndex = nextIndex > 0 ? nextIndex : this.#items.length - 1;
    this.#items[this.#activeIndex].activate();
  }

  nextBtnClickHandler = () => {
    if (this.#items.length < 2) {
      return;
    }

    const nextIndex = this.#activeIndex + 1;
    this.#items[this.#activeIndex].deactivate();
    this.#activeIndex = nextIndex < this.#items.length ? nextIndex : 0;
    this.#items[this.#activeIndex].activate();
  }

  #setError = (error) => {
    alert(error);
  }

  #getItemTemplate = () => {
    return this.#itemTemplate.content.cloneNode(true).querySelector('[data-role="item"]');
  }

  #renderItems = (data) => {
    const frag = document.createDocumentFragment();
    for (const photo of data) {
      const template = this.#getItemTemplate()
      const photoItem = new PhotoItem(template);
      photoItem.setPhoto(photo);
      frag.appendChild(template);
      this.#items.push(photoItem);
    }

    if (this.#items.length) {
      this.#items[0].activate();
    }

    requestAnimationFrame(() => {
      this.#list.innerHTML = '';
      this.#list.appendChild(frag);
    });
  }

  request = async () => {
    try {
      const data = await this.#photoService(this.#albumId);

      this.#renderItems(data);
    } catch (e) {
      this.#setError(e.message);
    }
  }
}