import {readLines} from "./Utils";

const lines = readLines('day6');

const [,timeText] = lines[0].split(':');
const [,distanceText] = lines[1].split(':');

const timesPart1 = timeText.trim().split(/\s+/).map((text)=> parseInt(text));
const distancesPart1 = distanceText.trim().split(/\s+/).map((text)=> parseInt(text));

const timesPart2 = [parseInt(timeText.trim().replaceAll(' ', ''))];
const distancesPart2 = [parseInt(distanceText.trim().replaceAll(' ', ''))];

function solve(times: number[], distances: number[]): number {
    let multiplied: number;

    for (let i = 0; i < times.length; i++) {
        let possibleWins = 0;

        const time = times[i];
        const distance = distances[i];
        for (let timePressed = 0; timePressed <= time; timePressed++) {
            const distanceTravelled = timePressed*(time-timePressed);
            if (distanceTravelled > distance) {
                possibleWins++;
            }
        }
        if (multiplied === undefined) {
            multiplied = possibleWins;
        } else {
            multiplied = multiplied * possibleWins;
        }

    }
    return multiplied;
}

const part1 = solve(timesPart1, distancesPart1);
console.log(`Part1: multiplied = ${part1}`);

const part2 = solve(timesPart2, distancesPart2);
console.log(`Part2: multiplied = ${part2}`);