'use strict';

(() => {
function Student (name, surname, birthYear) {
  if (((new Date()).getFullYear() - birthYear) >= 120) {
    throw new Error('Student is too old')
  }

  this.name = name;
  this.surname = surname;
  this.birthYear = birthYear;
}
})();