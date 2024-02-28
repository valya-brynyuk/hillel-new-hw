'use strict';

(() => {
  const WORK_DAYS = 25;
  const MARK_THRESHOLD = 90;
  const PRESENT_THRESHOLD = 0.9;

  class Student {
    name = '';
    surname = '';
    birthYear = '';
    marks = [];
    presents = new Array(WORK_DAYS);
    presentIndex = 0;

    constructor(name, surname, birthYear) {
      if (!Number.isFinite(birthYear)) {
        throw new Error('Year must be a valid number');
      } else if (((new Date()).getFullYear() - birthYear) >= 120) {
        throw new Error('Student is too old')
      }

      this.name = name;
      this.surname = surname;
      this.birthYear = birthYear;
    }

    getAge() {
      return (new Date()).getFullYear() - this.birthYear;
    }

    getAvgMark() {
      if (!this.marks.length) {
        return 0;
      }

      const markSum = this.marks.reduce((acc, curr) => {
        acc += curr;

        return acc;
      }, 0);

      return Math.round((markSum / this.marks.length) * 100) / 100;
    }

    #setVisited(visited) {
      if (this.presentIndex >= WORK_DAYS) {
        throw new Error('Student won`t work more than expected');
      }

      this.presents[this.presentIndex] = Boolean(visited);
      this.presentIndex++;
    }

    #getAvgVisited() {
        const visitedCount = this.presents.reduce((acc, curr) => {
          if (curr) {
            acc++;
          }

          return acc;
        }, 0);

        return Math.round(visitedCount / WORK_DAYS * 100) / 100;
    }

    present() {
      this.#setVisited(true);
    }

    absent() {
      this.#setVisited(false);
    }

    summary() {
      const avgMark = this.getAvgMark();
      const avgPresent = this.#getAvgVisited();

      if (avgMark > MARK_THRESHOLD && avgPresent > PRESENT_THRESHOLD) {
        return 'Молодець!';
      } else if (avgMark < MARK_THRESHOLD && avgPresent < PRESENT_THRESHOLD) {
        return 'Редиска!';
      }

      return 'Добре, але можна краще';
    }

    addMark(mark) {
      if (!Number.isFinite(mark)) {
        throw new Error('Mark must be a valid number')
      } else if (mark < 0 || mark > 100) {
        throw new Error('Mark must be between 0 and 100');
      }

      this.marks.push(mark);
    }

    getInfo() {
      return `I'm ${this.surname} ${this.name}. I have ${this.getAge()} years old. My avg mark is ${this.getAvgMark()}. My presents was ${this.#getAvgVisited()}.`;
    }
  }


  try {
    const student1 = new Student('Student', 'First', 1990);
    const student2 = new Student('Second', 'Student', 2000);
    for (let i = 0; i < WORK_DAYS; i++) {
      if (Math.random() > .1) {
        student1.present();
      } else {
        student1.absent();
      }

      if (Math.random() > .7) {
        student2.present();
      } else {
        student2.absent();
      }

      student1.addMark(Math.round(Math.random() * 100));
      student2.addMark(Math.round(Math.random() * 100));
    }

    console.log(student1.getInfo(), 'Report: ', student1.summary());
    console.log(student2.getInfo(),  'Report: ', student2.summary());

  } catch (e) {
    console.error(e);
  }
})();