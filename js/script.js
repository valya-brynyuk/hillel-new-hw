'use strict';

(() => {
  const liClickHanlder = (event) => {
    console.log(event.target)
    console.log(event.target.innerText);
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('ul').addEventListener('click', liClickHanlder)
  })

})();