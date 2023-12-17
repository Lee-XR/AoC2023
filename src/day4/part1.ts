import { getInputFilePath, readFileByLine } from '../utils/fs.ts';

const filePath = getInputFilePath(4);
const rl = readFileByLine(filePath);

async function getSolution() {
	for await (const line of rl) {
	}
}

const Day4Part1Solution = getSolution();
export default Day4Part1Solution;
