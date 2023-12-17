import { getSolution } from '../utils/base.ts';
import { getInputFilePath, readFileByLine } from '../utils/fs.ts';

const filePath = getInputFilePath(4);
const rl = readFileByLine(filePath);

async function callback() {
	for await (const line of rl) {
	}
}

const Day4Part1Solution = getSolution(callback);
export default Day4Part1Solution;
