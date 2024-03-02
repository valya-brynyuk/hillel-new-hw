'use strict';

(() => {
  const WORK_DAYS = 25;
  const MARK_THRESHOLD = 90;
  const PRESENT_THRESHOLD = 0.9;
  const MIN_MARK = 0;
  const MAX_MARK = 100;

  const summary = (avgMark, avgPresent) => {
    if (avgMark > MARK_THRESHOLD && avgPresent > PRESENT_THRESHOLD) {
      return 'Молодець!';
    } else if (avgMark < MARK_THRESHOLD && avgPresent < PRESENT_THRESHOLD) {
      return 'Редиска!';
    }

    return 'Добре, але можна краще';
  };

  const getAge = (birthYear) => {
    return (new Date()).getFullYear() - birthYear;
  };

  const getAvgMark = (marks) => {
    if (!marks.length) {
      return 0;
    }

    const markSum = marks.reduce((acc, curr) => {
      acc += curr;

      return acc;
    }, 0);

    return Math.round((markSum / marks.length) * 100) / 100;
  };

  const setVisited = (presents, index, visited) => {
    if (index >= WORK_DAYS) {
      throw new Error('Student won`t work more than expected');
    }

    presents[index] = Boolean(visited);
  };

  const getAvgVisited = (presents) =>  {
    const visitedCount = presents.reduce((acc, curr) => {
      if (curr) {
        acc++;
      }

      return acc;
    }, 0);

    return Math.round(visitedCount / WORK_DAYS * 100) / 100;
  };

  const addMark = function(presents, marks, index, mark) {
    if (!Number.isFinite(mark)) {
      throw new Error('Mark must be a valid number')
    } else if (mark < MIN_MARK || mark > MAX_MARK) {
      throw new Error('Mark must be between 0 and 100');
    } if (index < 0 || !presents[index]) {
      throw new Error('Can not set mark to this day');
    }

    marks[index] = mark;
  };

  function Student(name, surname, birthYear) {
    if (!Number.isFinite(birthYear)) {
      throw new Error('Year must be a valid number');
    } else if (((new Date()).getFullYear() - birthYear) >= 120) {
      throw new Error('Student is too old')
    }

    let presentIndex = 0;

    return {
      name,
      surname,
      birthYear,
      marks: new Array(WORK_DAYS),
      presents: new Array(WORK_DAYS),
      getAge() {
        return getAge(this.birthYear);
      },
      summary() {
        const avgMark = this.getAvgMark();
        const avgPresent = this.getAvgVisited();

        return summary(avgMark, avgPresent);
      },
      getAvgMark() {
        return getAvgMark(this.marks);
      },
      present() {
        setVisited(this.presents, presentIndex, true);
        presentIndex++;
      },
      absent() {
        setVisited(this.presents, presentIndex, false);
        presentIndex++;
      },
      getAvgVisited() {
        return getAvgVisited(this.presents);
      },
      getInfo() {
        return `I'm ${this.surname} ${this.name}. I have ${this.getAge()} years old. My avg mark is ${this.getAvgMark()}. My presents was ${this.getAvgVisited()}.`;
      },
      addMark(mark) {
        addMark(this.presents, this.marks, presentIndex - 1, mark);
      }
    };
  }


  try {
    const student1 = new Student('Student', 'First', 1990);
    const student2 = new Student('Second', 'Student', 2000);
    for (let i = 0; i < WORK_DAYS; i++) {
      if (Math.random() > .1) {
        student1.present();

        if (Math.random() > .5) {
          student1.addMark(Math.round(Math.random() * 100));
        }
      } else {
        student1.absent();
      }

      if (Math.random() > .7) {
        student2.present();

        if (Math.random() > .5) {
          student2.addMark(Math.round(Math.random() * 100));
        }
      } else {
        student2.absent();
      }
    }

    console.log(student1.getInfo(), 'Report: ', student1.summary());
    console.log(student2.getInfo(),  'Report: ', student2.summary());

  } catch (e) {
    console.error(e);
  }
})();