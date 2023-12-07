'use strict';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');

    form?.addEventListener('submit', () => {
      const data = new FormData(form);
      const jsonData = Array.from(data.entries()).reduce((acc, [name, value]) => {
        if (value.length || value.name?.length) {
          acc[name] = value.name || value;
        }

        return acc;
      }, {});

      localStorage.setItem('form-data', JSON.stringify(jsonData));
    });
  });

})();