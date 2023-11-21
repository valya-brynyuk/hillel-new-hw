'use strict';

(() => {
  const generateList = (numArr) => {
    if (!Array.isArray(numArr)) {
      throw new Error('Only arrays with numbers are allowed');
    }

    const list = document.createElement('ul');
    for (const item of numArr) {
      const li = document.createElement('li');
      if (Array.isArray(item)) {
        li.appendChild(generateList(item));
      } else if (typeof item !== 'number') {
        throw new Error('Only numbers supported in array');
      } else {
        li.innerText = item;
      }

      list.appendChild(li);
    }

    return list;
  };

  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      document.body.appendChild(generateList([1, 2, 3, [4, 5, 6, [7, 8], 9], 0]));
    });
  })
})();