'use strict';

(() => {
const getObjectTracker = () => {
  const trackedObjects = new WeakSet();

  return (obj) => {
    if (typeof obj !== 'object') {
      throw new Error('Param is not an object');
    }

    if (trackedObjects.has(obj)) {
      return true;
    }

    trackedObjects.add(obj);

    return false;
  };
}

try {
  const trackObjects = getObjectTracker();
  const user1 = {name: 'user 1'};
  const user2 = {name: 'user 2'};

  console.log(trackObjects(user1));
  console.log(trackObjects(user1));
  console.log(trackObjects(user2));
} catch (e) {
  console.error(e);
}
})();