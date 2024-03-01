'use strict';

(() => {
  const getCache = () => {
    const cache = new WeakMap();

    return (arg, func) => {
      if (typeof arg !== 'object') {
        throw new Error('Arg must be an object');
      }

      if (cache.has(arg)) {
        return cache.get(arg);
      }

      const result = func(arg);
      cache.set(arg, result);

      return result;
    };
  };


  try {
    const cacheComplexCalculations = getCache();

    const user1 = {user: 1};
    const user2 = {user: 2};

    console.log(cacheComplexCalculations(user1, (arg) => {
      console.log('run first function');

      return arg.user;
    }))

    console.log(cacheComplexCalculations(user2, (arg) => {
      console.log('run second function');

      return arg.user;
    }))

    console.log(cacheComplexCalculations(user1, (arg) => {
      console.log('run third function');

      return arg.user;
    }))

  } catch (e) {
    console.error(e);
  }
})();