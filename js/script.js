'use strict';

(() => {
  const model = {
    items: new Map(),
    getId() {
      return `${Date.now()}`.replaceAll(/\D/gis, '-');
    },
    getStoreKey() {
      return 'todo-items';
    },
    addItem(item) {
      const id = this.getId();
      item.id = id;
      this.items.set(id, item);

      this.save();

      return item;
    },
    save() {
      const payload = Array.from(this.items.values());
      localStorage.setItem(this.getStoreKey(), JSON.stringify(payload));
    },
    load() {
      const storedItems = JSON.parse(localStorage.getItem(this.getStoreKey()) ?? '[]');
      if (!Array.isArray(storedItems)) {
        return;
      }

      for (const item of storedItems) {
        this.items.set(item.id, item);
      }
    },
    removeItem(id) {
      this.items.delete(id);
      this.save();
    },
  };

  const view = {
    items: new Map(),
    form: document.querySelector('#todoForm'),
    list: document.querySelector('#todoItems'),
    getItemTemplate() {
      const template = document.querySelector('#task-template');
      return template.content.cloneNode(true);
    },
    addItem(id, item) {
      const template = this.getItemTemplate();
      const itemWrapper = template.querySelector('[data-component="todo-item"]');
      const titleEl = itemWrapper.querySelector('[data-role="title"]');
      const descEl = itemWrapper.querySelector('[data-role="desc"]');
      const removeBtn = itemWrapper.querySelector('[data-role="remove-btn"]');

      removeBtn.dataset.action = 'remove';
      removeBtn.dataset.id = id;
      titleEl.innerText = item.title;
      descEl.innerText = item.description;

      this.items.set(id, itemWrapper);

      requestAnimationFrame(() => {
        this.list.prepend(itemWrapper);
      })

      return itemWrapper;
    },
    removeItem(id) {
      requestAnimationFrame(() => {
        this.items.get(id).remove();
        this.items.delete(id);
      });
    }
  };


  const controller = {
    init() {
      view.form.addEventListener('submit', this.formSubmitHandler.bind(this));
      document.addEventListener('DOMContentLoaded', controller.loadHandler.bind(this));
      this.itemClickHandler = this.itemClickHandler.bind(this);
    },
    itemRemoveHandler(id) {
      model.removeItem(id);
      view.removeItem(id);
    },
    itemClickHandler({target}) {

      if (target.dataset.action === 'remove') {
        this.itemRemoveHandler(target.dataset.id);
      }
    },
    formSubmitHandler(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const itemData = {};
      for (const [name, val] of formData.entries()) {
        itemData[name] = val;
      }

      const storedItem = model.addItem(itemData);
      const itemEl = view.addItem(storedItem.id, storedItem);
      itemEl.addEventListener('click', this.itemClickHandler);

      view.form.reset();
    },
    loadHandler() {
      model.load();

      for (const [id, item] of model.items) {
        const itemEl = view.addItem(id, item);
        itemEl.addEventListener('click', this.itemClickHandler);
      }
    },
  };

  controller.init();
})();