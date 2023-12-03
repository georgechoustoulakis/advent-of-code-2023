import {readLines} from "./Utils";

const lines = readLines('day2');

type Game = {
    red: number
    green: number
    blue: number
}

const idRegex = /Game (\d+)/g;
const redRegex = /(\d+) red/g;
const greenRegex = /(\d+) green/g;
const blueRegex = /(\d+) blue/g;


function parseGame(text: string): Game {
    return {
        red: parseInt(Array.from(text.matchAll(redRegex))?.[0]?.[1] ?? '0'),
        green: parseInt(Array.from(text.matchAll(greenRegex))?.[0]?.[1] ?? '0'),
        blue: parseInt(Array.from(text.matchAll(blueRegex))?.[0]?.[1] ?? '0'),
    };
}

function isValid({red, green, blue}: Game): boolean {
    return red <= 12 && green <= 13 && blue <= 14;
}

let idSum = 0;

for (const line of lines) {
    const [title, games] = line.split(':');
    const id = parseInt(Array.from(title.matchAll(idRegex))[0][1]);
    if (games.split(';').every((text: string) => {
        return isValid(parseGame(text));
    })) {
        idSum = idSum + id;
    }
}

console.log(`The sum of IDs is ${idSum}`);

let powerSum = 0;

for (const line of lines) {
    const [, games] = line.split(':');
    const minimalGame: Game = {
        red: 0,
        green: 0,
        blue: 0,
    };
    for (const text of games.split(';')) {
        const game = parseGame(text);
        minimalGame.red = Math.max(minimalGame.red, game.red);
        minimalGame.green = Math.max(minimalGame.green, game.green);
        minimalGame.blue = Math.max(minimalGame.blue, game.blue);
    }
    powerSum = powerSum + minimalGame.red * minimalGame.blue * minimalGame.green;
}
console.log(`The sum of powers is ${powerSum}`);