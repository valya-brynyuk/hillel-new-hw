'use strict';

(() => {
  const getStoredData = () => {
    const formData = localStorage.getItem('form-data');

    try {
      return JSON.parse(formData) || {};
    } catch (e) {
      console.error(e);

      return {}
    }
  };

  const renderEmptyBlock = () => {
    const wrapper = document.createElement('div');
    wrapper.className = 'card bg-warning';

    const content = document.createElement('div');
    content.className = 'card-body';
    content.innerText = 'No stored items';
    wrapper.appendChild(content);

    return wrapper;
  };

  const renderList = (data) => {
    const wrapper = document.createElement('ul');
    wrapper.className = 'list-group';

    for (const [name, value] of Array.from(Object.entries(data))) {
      const item = document.createElement('li');
      item.className = 'list-group-item';

      const nameEl = document.createElement('b');
      nameEl.innerText = name;
      item.appendChild(nameEl);

      const text = document.createTextNode(` - ${value}`);
      item.appendChild(text);

      wrapper.appendChild(item);
    }


    return wrapper;
  };

  document.addEventListener('DOMContentLoaded', () => {
    const resultWrapper = document.querySelector('[data-role="result"]');

    const data = getStoredData();
    requestAnimationFrame(() => {
      resultWrapper.innerHTML = '';

      if (Object.keys(data).length) {
        resultWrapper.appendChild(renderList(data));
      } else {
        resultWrapper.appendChild(renderEmptyBlock());
      }
    });
  });

})();