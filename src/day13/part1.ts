import { getFilePath, readFileByLine } from '../utils/fs.ts';
import { getReflectionNum } from './logic.ts';

async function getSolution() {
	const filePath = getFilePath(13);
	const rl = readFileByLine(filePath);
	const pattern: string[] = [];
	let total = 0;

	for await (const line of rl) {
		if (line !== '') pattern.push(line);
		else {
			const reflectionNum = getReflectionNum(pattern);
			total += reflectionNum;
			pattern.splice(0, pattern.length);
		}
	}
	return total;
}

const Day13Part1Solution = await getSolution();
export default Day13Part1Solution;
