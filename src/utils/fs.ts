import { createReadStream } from 'fs';
import path from 'path';
import { createInterface } from 'readline';
import { isTestTrue } from './system.ts';

export function getRootDirectoryPath() {
	return path.join(process.cwd());
}

export function getAssetsDirectoryPath() {
	return path.join(getRootDirectoryPath(), 'src', 'assets');
}

export function getInputFilePath(day: number, fileName: string = 'input.txt') {
	return path.join(getAssetsDirectoryPath(), `day${day}`, fileName);
}

export function getTestFilePath(day: number, fileName: string = 'test.txt') {
	return path.join(getAssetsDirectoryPath(), `day${day}`, fileName);
}

export function getFilePath(day: number) {
	return isTestTrue() ? getTestFilePath(day) : getInputFilePath(day);
}

export function readFileByLine(filePath: string) {
	const fileStream = createReadStream(filePath);
	const rl = createInterface({ input: fileStream });
	return rl;
}
