const ACTIVE_CLASS = 'active';

class PhotoItem {
  #wrapper = null;
  #title = '';
  #image = '';

  constructor(wrapper) {
    if (!wrapper) {
      throw new Error('Wrapper must be a valid html element');
    }
    this.#wrapper = wrapper;
    this.#title = this.#wrapper.querySelector('[data-role="title"]');
    if (!this.#title) {
      throw new Error('Can not find title element');
    }

    this.#image = this.#wrapper.querySelector('[data-role="image"]');
    if (!this.#image) {
      throw new Error('Can not find image element');
    }
  }

  setPhoto = (photo) => {
    if (!(photo instanceof Photo)) {
      throw new Error('not valid Photo value')
    }

    requestAnimationFrame(() => {
      this.#title.innerText = photo.title;
      this.#image.src = photo.url;
    });
  }

  activate = () => {
    this.#wrapper.classList.add(ACTIVE_CLASS);
  }

  deactivate = () => {
    this.#wrapper.classList.remove(ACTIVE_CLASS);
  }
}