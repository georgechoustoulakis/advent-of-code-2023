import {readLines} from "./Utils";

const lines = readLines('day4');

let score = 0;
const copies: Map<number, number> = new Map();

for (let i = 1; i <= lines.length; i++) {
    copies[i] = 1;
}

for (const line of lines) {
    const [cardText, rest] = line.split(':');

    const cardSplit = cardText.split(' ');
    const cardNumber = parseInt(cardSplit[cardSplit.length - 1]);

    const [winningNumbersText, numbersText] = rest.split('|');

    const winningNumbers: number[] = [];
    const numbers: number[] = [];

    for (const number of winningNumbersText.trim().replaceAll('  ', ' ').split(' ')) {
        winningNumbers.push(parseInt(number));
    }

    for (const number of numbersText.trim().replaceAll('  ', ' ').split(' ')) {
        numbers.push(parseInt(number));
    }

    let points: number | undefined = undefined;
    let numberOfMatches = 0;

    for (const number of numbers) {
        if (winningNumbers.includes(number)) {
            numberOfMatches = numberOfMatches + 1;
            if (points === undefined) {
                points = 1;
            } else {
                points = points * 2;
            }
        }
    }

    if (points !== undefined) {
        score = score + points;
        for (let i = 1; i <= numberOfMatches; i++) {

            copies[cardNumber + i] = copies[cardNumber + i] + copies[cardNumber];
            console.log(cardNumber, cardNumber + i);
        }
    }
}

console.log(`Part1: The total points are ${score}`);

let totalNumberOfCards = 0;
for (let i = 1; i <= lines.length; i++) {
    totalNumberOfCards = totalNumberOfCards + copies[i];
}

console.log(`Part1: The total cards are ${totalNumberOfCards}`);
