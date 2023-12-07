import {readLinesAsBlock} from "./Utils";

const blocks = readLinesAsBlock('day5');

const [,seedsText] = blocks[0][0].split(':');
const seeds = seedsText.trim().split(' ').map((text) => parseInt(text));
const maps : number[][][] = [];

for (let i = 1; i < blocks.length; i++) {
    const map: number[][] = [];
    for (let j = 0; j < blocks[i].length; j++) {
        if (j === 0) {
            continue;
        }
        map.push( blocks[i][j].split(' ').map((text) => parseInt(text)));
    }
    maps.push(map);
}

function mapValue(value: number, map: number[][]): number {
    for (const line of map) {
        const destination = line[0];
        const source = line[1];
        const length = line[2];
        if (source <= value && value < source + length) {
            return destination + value - source;
        }
    }
    return value;
}

let lowest = Infinity;

for (const seed of seeds) {
    let value = seed;
    for (const map of maps) {
        value = mapValue(value, map);
    }
    if (value < lowest) {
        lowest = value;
    }
}

console.log(`Part1: Lowest mapped value is ${lowest}`);

lowest = Infinity;
let count = 1;

for (let i = 0; i < seeds.length; i = i + 2) {
    const initial = seeds[i];
    const length = seeds[i+1];
    console.log(`Starting range #${count} for seed ${initial}`);
    for (let seedValue = initial; seedValue < initial + length; seedValue++) {
        let value = seedValue;
        for (const map of maps) {
            value = mapValue(value, map);
        }
        if (value < lowest) {
            lowest = value;
        }
    }
    count++;
}

console.log(`Part2: Lowest mapped value is ${lowest}`);



