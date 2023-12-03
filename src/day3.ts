import {linesToGrid, readLines} from "./Utils";

const lines = readLines('day3');
const grid = linesToGrid(lines);

const numberOrDotRegex = /\d|[.]/g;

function testRegex(text: string): boolean {
    return text.match(numberOrDotRegex) === null;
}

function neighboursContainRegex(row: number, column: number): boolean {
    const isTopRow = row === 0;
    const isBottomRow = row === grid.length - 1;
    const isLeftColum = column === 0;
    const isRightColum = column === grid[0].length - 1;
    return (!isTopRow && testRegex(grid[row - 1][column])) || // top
        (!isTopRow && !isRightColum && testRegex(grid[row - 1][column + 1])) || // top right
        (!isRightColum && testRegex(grid[row][column + 1])) || // right
        (!isBottomRow && !isRightColum && testRegex(grid[row + 1][column + 1])) || // bottom right
        (!isBottomRow && testRegex(grid[row + 1][column])) || // bottom
        (!isBottomRow && !isLeftColum && testRegex(grid[row + 1][column - 1])) || // bottom left
        (!isLeftColum && testRegex(grid[row][column - 1])) || // left
        (!isTopRow && !isLeftColum && testRegex(grid[row - 1][column - 1])); // top left
}

const numberRegex = /(\d+)/g;
const gearRegex = /([*])/g;


let row = 0;
let sum = 0;
for (const line of lines) {
    const matches = Array.from(line.matchAll(numberRegex));
    for (const match of matches) {
        const length = match[0].length;
        let valid = false;
        for (let i = match.index; i < match.index + length; i++) {
            if (neighboursContainRegex(row, i)) {
                valid = true;
                break;
            }
        }
        if (valid) {
            const number = parseInt(match[0]);
            sum = sum + number;
        }
    }
    row = row + 1;
}

console.log(`Part1: Sum is ${sum}`);

// Part2: I have to re-do everything -_-

type Coordinate = {
    value: string
    row: number
    column: number
}

type NumberCoordinate = Coordinate & {
    length: number
    all: Coordinate[]
}

row = 0;
sum = 0;
const numbers: NumberCoordinate[] = [];
const gears: Coordinate[] = [];

for (const line of lines) {
    const numberMatches = Array.from(line.matchAll(numberRegex));
    for (const match of numberMatches) {
        const number = {
            value: match[0],
            row: row,
            column: match.index,
            length: match[0].length,
            all: []
        };
        for (let i = match.index; i < match.index + match[0].length; i++) {
            number.all.push({row, column: i});
        }
        numbers.push(number);
    }
    const gearMatches = Array.from(line.matchAll(gearRegex));
    for (const match of gearMatches) {
        gears.push({value: match[0], row, column: match.index});
    }
    row = row + 1;
}

for (const gear of gears) {
    const neighbours: NumberCoordinate[] = [];
    for (const number of numbers) {
        for (const coordinate of number.all) {
            if (Math.abs(gear.row - coordinate.row) <= 1 && Math.abs(gear.column - coordinate.column) <= 1) {
                neighbours.push(number);
                break;
            }
        }
    }
    if (neighbours.length === 2) {
        sum = sum + parseInt(neighbours[0].value) * parseInt(neighbours[1].value);
    }
}

console.log(`Part2: Sum of gear ratios is ${sum}`);


