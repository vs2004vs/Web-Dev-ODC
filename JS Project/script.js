// 1. Variables & Data Types
let name = "Varro Smith";
let age = 22;
let isStudent = false;
console.log(name, age, isStudent);

// 2. Arithmetic Operators
let a = 10, b = 5;
console.log("Sum:", a + b);
console.log("Difference:", a - b);
console.log("Product:", a * b);
console.log("Quotient:", a / b);

// 3. Conditional Statements
let num = 7;
if (num % 2 === 0) console.log("Even");
else console.log("Odd");

// 4. Comparison Operators
let x = 10, y = "10";
console.log(x == y);
console.log(x === y);
console.log(x != y);

// 5. For Loop
for (let i = 1; i <= 10; i++) console.log(i);

// 6. While Loop
let j = 10;
while (j >= 1) {
  console.log(j);
  j--;
}

// 7. Function Declaration
function squareNumber(n) {
  return n * n;
}
console.log(squareNumber(4));

// 8. Arrow Function
const multiply = (a, b) => a * b;
console.log(multiply(3, 5));

// 9. Arrays & Iteration
let fruits = ["Apple", "Banana", "Orange", "Grapes", "Mango"];
for (let fruit of fruits) console.log(fruit);

// 10. JSON Parsing
let jsonData = '{"course":"JavaScript","duration":4,"intermediate":true}';
let parsed = JSON.parse(jsonData);
console.log(parsed.course, parsed.duration);
