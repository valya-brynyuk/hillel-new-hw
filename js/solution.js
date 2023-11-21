'use strict';

(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const list = document.querySelector('ul');

    const attrs = [];

    const attrNames = [];
    for (const attr of Array.from(list.attributes)) {
      attrs.push(attr.value);
      attrNames.push(attr.name);
    }

    console.log(attrs);
    console.log(attrNames);

    requestAnimationFrame(() => {
      list.lastElementChild.innerText = `Hello, my name is Valia`;
    });

    list.firstElementChild.dataset.myName = 'Valia';
    delete list.dataset.dogTail;
  })
})();