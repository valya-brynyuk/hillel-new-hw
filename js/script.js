'use strict';

(() => {
  function Human(name, age) {
    if (!Number.isFinite(age) || age <= 0) {
      throw new Error('Age must ba a valid positive number');
    }

    this.name = name;
    this.age = age;

    Human.prototype.showInfo = function() {
      console.log(`Hi, I'm ${this.name} and I have ${this.age} years old.`);
    }
  }

  function Car(brand, model, year, number) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.number = number;
    this.owner = null;

    Car.prototype.setOwner = function(owner) {
      if (!(owner instanceof Human)) {
        throw new Error('Owner must be a human');
      } else if (owner.age < 18) {
        throw new Error('Owner must be older than 18 years old');
      }

      this.owner = owner;
    };

    Car.prototype.showInfo = function () {
      console.log(`Brand: ${this.brand}`);
      console.log(`Model: ${this.model}`);
      console.log(`Year: ${this.year}`);
      console.log(`Number: ${this.number}`);

      if (this.owner) {
        console.log(`Owner: `);
        this.owner.showInfo();
      } else {
        console.log('Car has no owner')
      }
    };
  }

  const human1 = new Human('John Doe', 31);
  const human2 = new Human('Paul Gilbert', 25);
  const human3 = new Human('Batman', 40);

  const car1 = new Car('Audi', 'R8', 2023, '23424');
  const car2 = new Car('VolksWagen', 'Passat', 1996, '44424');
  const car3 = new Car('BatMobil', 'Turbo+', 1990, '1111');

  car1.setOwner(human1);
  car2.setOwner(human2);
  car3.setOwner(human3);

  car1.showInfo();
  car2.showInfo();
  car3.showInfo();

})();