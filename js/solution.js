'use strict';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const items = document.querySelectorAll('ul > li');
    const texts = [];

    for (const item of Array.from(items)) {
      console.log(item);

      texts.push(item.innerText);
    }

    console.log(`Elements count: ${items.length}`)
    console.log(texts);
  });
})();