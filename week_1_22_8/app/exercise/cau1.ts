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

// Test
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
// Test
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
// Test
    // const car = new Car("BMW", "V1XSB201", 2026);
    // car.showCarInfo();

//Cau 4
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

// const rectangle = new Rectangle(1.5, 20);
// console.log(`Area: ${rectangle.calculateArea()}\nPerimeter: ${rectangle.calculatePerimeter()}`)

class BankAccount{
    balance: number;

    constructor(balance: number){
        this.balance = balance
    }

    withdraw(amount: number):void{
        if(amount <= 0){
            console.log(`The amount must be over 0\n`);
            return;
        }
        if(amount > this.balance){
            console.log(`Balance is not enough for withdrawing!\nCurrent balance: ${this.balance}\n`);
            return;
        }
        this.balance -= amount;
        console.log(`Withdraw successfully ${amount}!\nCurrent balance: ${this.balance}\n`);
            return;
    }

    deposit(amount:number):void{
         if(amount <= 0){
            console.log(`The amount must be over 0\n`);
            return;
        }
        this.balance += amount;
        console.log(`Deposit successfully ${amount}!\nCurrent balance: ${this.balance}\n`);
            return;
        
    }
}

// // Test
// const bankAccount = new BankAccount(0);
// bankAccount.withdraw(10);
// bankAccount.deposit(10);
// bankAccount.withdraw(20);
// bankAccount.deposit(10);
// bankAccount.withdraw(20);
// bankAccount.deposit(0);
// bankAccount.withdraw(0);
// bankAccount.deposit(100000);

// Cau 7
class User{
    private name: string;
    constructor(name: string){
        this.name = name;
    }
    getter(): string{
        return this.name;
    }
    setter(name: string): void{
        this.name = name
    }
}

// Test
// const user = new User("Long");
// console.log(user.getter());
// user.setter("Lan");
// console.log(user.getter())

class Product{
    name: string;
    price: number;

    constructor(name: string, price: number){
        this.name = name;
        this.price = price;
    }

}

const products : Product[] = [
    new Product("1", 5),
    new Product("2", 100),
    new Product("3", 50),
    new Product("4", 30),
    new Product("5", 130),
    new Product("6", 101),
    new Product("7", 99),
    new Product("8", 105),
]

// Test
// const filterdProducts = products.filter(p => p.price > 100)
// console.log("List with price > 100: \n")
// filterdProducts.forEach(e => console.log(`Name: ${e.name}, Price: ${e.price}\n`))

// Cau 9
interface Animal{
    name: string;
    sound() : void;
}

// Cau 10
class Account{
    public userName: string;
    private password: string;
    readonly info: string;

    constructor(userName: string, password: string, info: string){
        this.userName = userName;
        this.password = password;
        this.info = info;
    }
}


// Cau 11
class Animal{
    name: string;
    role: string;
    constructor(name: string, role: string){
        this.name = name;
        this.role = role
    }
}

class Dog extends Animal{
    bark():void{
        console.log("gau gau")
    }
}

class Cat extends Animal{
    meow():void{
        console.log("meo meo")
    }
}

const cat = new Cat("doraemon", "cat")
const dog = new Dog("Lucky", "dog")
// cat.meow();
// dog.bark();

// Cau 12

interface Flyable{
    name: string;
    fly(): void;
}


interface Swimmable{
    name: string;
    swim(): void;
}

class Bird implements Flyable{
    name: string;
    constructor(name: string){
        this.name = name;
    }
    fly() : void{
        console.log("Imma flying");
    }
}

class Fish implements Swimmable{
    name: string;
    constructor(name: string){
        this.name = name;
    }
    swim() : void{
        console.log("Imma swimming");
    }
}

const fish = new Fish("fish");
const bird = new Bird("bird");
fish.swim();
bird.fly();





