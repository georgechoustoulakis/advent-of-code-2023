import * as fs from 'fs';

export function readLines(filePath: string): string[] {
    const file = fs.readFileSync(`src/data/${filePath}`, 'utf-8');
    return file.split('\r\n');
}
