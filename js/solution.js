'use strict';

(() => {
  const ROWS = 10;
  const COLS = 10;

  const createTable = (rows, cols) =>  {
    const table = document.createElement('table');
    let counter = 1;

    for (let i = 0; i < rows; i += 1) {
      const row = document.createElement('tr');

      for (let j = 0; j < cols; j += 1) {
        const td = document.createElement('td');
        td.innerText = counter++;
        row.appendChild(td);
      }

      table.appendChild(row);
    }

    return table;
  };

  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      document.body.appendChild(createTable(ROWS, COLS));
    });
  })
})();