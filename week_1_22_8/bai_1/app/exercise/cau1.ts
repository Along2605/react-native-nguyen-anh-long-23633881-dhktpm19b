// Cau 1

class Person {
    name: string;
    age: number;

    constructor(name: string, age: number){
        this.name = name;
        this.age = age;
    }

     display(): void {
        console.log(`Name: ${this.name}\nAge: ${this.age}`)
    }

}


// const person = new Person("Long", 21);
// person.display();


// Cau 2
class Student extends Person{

    grade: number;

    constructor(name: string, age: number, grade: number){
        super(name, age);
        this.grade = grade;
    }

    displayAll(): void{
        console.log(`Name: ${this.name}\nAge: ${this.age}\nGrade: ${this.grade}`)
    }
}

// const student = new Student("Anh Long", 20, 12);
// student.displayAll();

// Cau 3
class Car{

    brand: string; 
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    showCarInfo(): void{
        console.log(`Car info:\n\tBrand: ${this.brand}\n\tModel: ${this.model}\n\tYear: ${this.year}`)
    }

}
    // const car = new Car("BMW", "V1XSB201", 2026);
    // car.showCarInfo();

class Rectangle {
    width: number;
    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }

    calculateArea():number{
        return this.width * this.height;
    }
    
    calculatePerimeter():number{
        return (this.width + this.height) *2;
    }
}

const rectangle = new Rectangle(1.5, 20);
console.log(`Area: ${rectangle.calculateArea()}\nPerimeter: ${rectangle.calculatePerimeter()}`)

