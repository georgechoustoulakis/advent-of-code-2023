import {readLines} from "./Utils";

const lines = readLines('day1');

const regex = /[0-9]/g;
let sum = 0;

for (const line of lines) {
    const numbers = line.match(regex) as string[];
    sum = sum + parseInt(numbers[0]) * 10;
    sum = sum + parseInt(numbers[numbers.length - 1]);
}

console.log(`Part1: The sum is ${sum}`);

function textNumberToNumber(textNumber: string): number {
    switch (textNumber) {
        case 'one':
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
    }
    return parseInt(textNumber);
}

const regexPart2 = /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g;
let sumPart2 = 0;

for (const line of lines) {
    const numbers = [...line.matchAll(regexPart2)];
    sumPart2 = sumPart2 + textNumberToNumber(numbers[0][1]) * 10;
    sumPart2 = sumPart2 + textNumberToNumber(numbers[numbers.length - 1][1]);
}

console.log(`Part2: The sum is ${sumPart2}`);
