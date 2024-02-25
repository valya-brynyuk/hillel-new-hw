'use strict';

(() => {
  const reverseIterator = (arr) => {
    if (!Array.isArray(arr)) {
      throw new Error('Param must be an array');
    }

    return {
      [Symbol.iterator]() {
        const arrCopy = [...arr];
        let index = arrCopy.length - 1;

        return {
          next() {
            if (index < 0) {
              return {
                done: true
              };
            }

            return {
              done: false,
              value: arrCopy[index--]
            };
          }
        }
      }
    }
  };


  for (const i of reverseIterator([1, 2, 3, 4])) {
    console.log(i);
  }


  function* fibonachi() {
    let last = 0;
    let current = 0;

    while (true) {
      yield current;

      const tmpCurrent = current;
      current += last;
      last = tmpCurrent;

      if (!current) {
        current = 1;
      }
    }
  }

  const fib = fibonachi();

  console.log(fib.next().value);
  console.log(fib.next().value);
  console.log(fib.next().value);
  console.log(fib.next().value);
  console.log(fib.next().value);
  console.log(fib.next().value);
  console.log(fib.next().value);
  console.log(fib.next().value);

  const keysIterator = (obj) => {
    if (typeof obj !== "object") {
      throw new Error('PAram must be an object');
    }

    return {
      [Symbol.iterator]() {
        const keys = Object.keys(obj);
        let index = 0;

        return {
          next() {
            if (index >= keys.length) {
              return {
                done: true
              };
            }

            return {
              done: false,
              value: keys[index++]
            };
          }
        }
      }
    }
  };


  for (const k of keysIterator({a: 1, b: 2, c: 3})) {
    console.log(k);
  }


})();