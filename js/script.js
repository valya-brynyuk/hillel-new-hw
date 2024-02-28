'use strict';

(() => {
function Student (name, surname, birthYear) {
  if (!Number.isFinite(birthYear)) {
    throw new Error('Year must be a valid number');
  } else if (((new Date()).getFullYear() - birthYear) >= 120) {
    throw new Error('Student is too old')
  }

  this.name = name;
  this.surname = surname;
  this.birthYear = birthYear;
}
})();