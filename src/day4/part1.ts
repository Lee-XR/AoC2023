import path from 'path';
import { getAssetsDirectoryPath, readFileByLine } from '../utils/fs.ts';

const filePath = path.join(getAssetsDirectoryPath(), 'day4', 'input.txt');
const rl = readFileByLine(filePath);

async function getSolution() {
	for await (const line of rl) {
	}
}

const Day4Part1Solution = getSolution();
export default Day4Part1Solution;
