'use strict';

(() => {
  let user = {
    name: 'John',
    surname: 'Dog',
    get fullName() {
      return `${this.name} ${this.surname}`;
    },
    set fullName(value) {
      if (!value.length) {
        throw new Error('Full name can not be empty');
      } else if (value.indexOf(' ') < 0) {
        throw new Error('Full name must contain name & surname divided with space');
      }

      const parts = value.split(' ');

      this.name = parts[0];
      this.surname = parts[1];
    }

  }

  console.log(user.fullName)
  user.fullName = 'Kyle Gwein'
  console.log(user.name)
  console.log(user.surname)

  Object.defineProperty(user, 'name', {
    writable: false
  });

  Object.defineProperty(user, 'age', {
    value: 20,
    enumerable: false
  });


  for (const key in user) {
    console.log(key, user[key])
  }

  console.log(Object.keys(user))

  user = Object.freeze(user);
  Object.defineProperty(user, 'age', {
    value: 25
  })
})();