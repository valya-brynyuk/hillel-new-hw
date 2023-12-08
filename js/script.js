'use strict';

(() => {
  const EVENT_UPDATE = 'update:favorite';

  const getStoredData = () => {
    try {
      const stored = localStorage.getItem('favorites');
      const serialized = stored ? JSON.parse(stored) : [
        [0, {id: 0, text: 'Lorem Ipsum 1', favorite: false}],
        [1, {id: 1, text: 'Lorem Ipsum 2', favorite: false}],
        [2, {id: 2, text: 'Lorem Ipsum 3', favorite: false}],
        [3, {id: 3, text: 'Lorem Ipsum 4', favorite: false}],
        [4, {id: 4, text: 'Lorem Ipsum 5', favorite: false}],
        [5, {id: 5, text: 'Lorem Ipsum 6', favorite: false}],
        [6, {id: 6, text: 'Lorem Ipsum 7', favorite: false}],
        [7, {id: 7, text: 'Lorem Ipsum 8', favorite: false}],
        [8, {id: 8, text: 'Lorem Ipsum 9', favorite: false}],
      ];

      return new Map(serialized);
    } catch (e) {
      console.error(e);

      return new Map();
    }
  }

  const storeData = (data) => {
    localStorage.setItem('favorites', JSON.stringify(Array.from(data.entries())));
  }

  const items = getStoredData();

  const createItem = (item) => {
    const DEFAULT_CLASSES = 'btn btn-success';
    const ACTIVE_CLASSES = 'btn btn-danger';

    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';

    const text = document.createTextNode(item.text);
    li.appendChild(text);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = item.favorite ? ACTIVE_CLASSES : DEFAULT_CLASSES;
    btn.innerText = item.favorite ? 'Unfavorite' : 'Favorite';
    li.appendChild(btn);

    btn.addEventListener('click', () => {
      item.favorite = !item.favorite;
      btn.className = item.favorite ? ACTIVE_CLASSES : DEFAULT_CLASSES;
      btn.innerText = item.favorite ? 'Unfavorite' : 'Favorite';

      const evt = new CustomEvent(EVENT_UPDATE, {
        detail: {
          item,
        },
      });
      li.dispatchEvent(evt);
    });

    return li;
  };

  const createList = (data) => {
    const list = document.createElement('ul');
    list.className = 'list-group';

    const dataUpdateHandler = (event) => {
      data.set(event.detail.item.id, event.detail.item);

      storeData(data);
    };

    data.forEach((datum) => {
      const item = createItem(datum);
      item.addEventListener(EVENT_UPDATE, dataUpdateHandler);
      list.appendChild(item);
    });

    return list;
  }



  const setTheme = (theme) => {
    document.body.dataset.bsTheme = theme;
  };

  const storeTheme = (theme) => {
    localStorage.setItem('theme', theme);
  };

  const getStoredTheme = () => {
    return localStorage.getItem('theme') || 'light';
  }

  document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.querySelector('[data-role="theme-select"]');
    const favoritesWrapper = document.querySelector('[data-role="favorites"]');

    themeSelect.addEventListener('change', () => {
      setTheme(themeSelect.value);
      storeTheme(themeSelect.value);
    });

    const storedTheme = getStoredTheme();
    setTheme(storedTheme);
    themeSelect.value = storedTheme;


    requestAnimationFrame(() => {
      const list = createList(items);
      favoritesWrapper.appendChild(list);
    });



  });

})();