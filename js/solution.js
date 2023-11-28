'use strict';

(() => {
  const ACTIVE_CLASS = 'show';

  document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('[data-role="input"]');
    const ghostBlock = document.querySelector('[data-role="ghost-block"]');

    input.addEventListener('focus', () => {
      ghostBlock.classList.add(ACTIVE_CLASS);
    });

    input.addEventListener('blur', () => {
      ghostBlock.classList.remove(ACTIVE_CLASS);
    });
  })
})();