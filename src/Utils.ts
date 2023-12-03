import * as fs from 'fs';

export function readLines(filePath: string): string[] {
    const file = fs.readFileSync(`src/data/${filePath}`, 'utf-8');
    return file.split('\r\n');
}

export function linesToGrid(lines: string[]): string[][] {
    const grid: string[][] = [];
    for (const line of lines) {
        grid.push(line.split(''));
    }
    return grid;
}
