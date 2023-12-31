import * as fs from 'fs';

export function readLines(filePath: string): string[] {
    const file = fs.readFileSync(`src/data/${filePath}`, 'utf-8');
    return file.split(/\r?\n/);
}

export function readLinesAsBlock(filePath: string): string[][] {
    const file = fs.readFileSync(`src/data/${filePath}`, 'utf-8');
    const rawBlocks = file.split(/\r?\n\r?\n/);
    const blocks: string[][] = [];
    for (const block of rawBlocks) {
        blocks.push(block.split(/\r?\n/))
    }
    return blocks;
}

export function linesToGrid(lines: string[]): string[][] {
    const grid: string[][] = [];
    for (const line of lines) {
        grid.push(line.split(''));
    }
    return grid;
}
