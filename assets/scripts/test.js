class Course {
  constructor(title, length, price) {
    this.title = title;
    this.length = length;
    this.price = price;
  }
}

class CoursesList {
  #courses = [
    new Course("Machine learning courses", "5-months", 150),
    new Course("Operating systems courses", "4-months", 80),
    new Course("Software development and design courses", "8-months", 300),
  ];

  set items(value) {
    if(value <0){
      throw 'invalid'
    }
    // Set the price for all courses
    for (const course of this.#courses) {
      course.price = value;
    }
  }

  get totalAmount() {
    const sum = this.#courses.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.price;
    }, 0);
    return `\$${sum}`;
  }

  render() {
    for (const course of this.#courses) {
      console.log(course);
    }
    console.log(this.totalAmount);
  }
}

const courseList = new CoursesList();
courseList.items = 200; // Set the price for all courses to 200
courseList.render();

/*********************************************************************************** */
//Task-2 method:to calculate prices of every class
//Task-3 :inheritance
class PracticalCourse extends Course {
  constructor(title, length, price, numOfEx) {
    super(title, length, price);
    this.numOfEx = numOfEx;
  }
  render() {
    console.log(this.title, this.length, this.price, this.numOfEx);
  }
}
class TheoreticalCourse extends Course {
  publich() {
    console.log("Theoretical Classes is using Publich-Method");
  }
}

////
class App {
  static init() {
    const courseList = new CoursesList().render();
    const practicalCourse = new PracticalCourse(
      "practicalCourse",
      "5-months",
      80,
      20
    );
    const theoCourse = new TheoreticalCourse().publich();
    practicalCourse.render();

    return practicalCourse, theoCourse, courseList;
  }
}
App.init();
