let arr = [-4, 3, -9, 0, 4, 1];

let length = arr.length;
let positiveNumbers = 0;
let negativeNumbers = 0;
let nullNumbers = 0;

for (let i = 0; i < arr.length; i++) {
    console.log(Math.sign(arr[i]));

    let operator = Math.sign(arr[i]);

    if (operator === 1) {
        positiveNumbers++;
    } else if (operator === -1) {
        negativeNumbers++;
    } else if (operator === 0) {
        nullNumbers++;
    }

}

let finalPositive = (positiveNumbers / length).toFixed(6);
let finalNegative = (negativeNumbers / length).toFixed(6);
let finalNull = (nullNumbers / length).toFixed(6);

console.log(finalPositive);
console.log(finalNegative);
console.log(finalNull);