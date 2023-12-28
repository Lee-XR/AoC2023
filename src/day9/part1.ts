import { getFilePath, readFileByLine } from '../utils/fs.ts';
import {
	getDifference,
	getHistoryNumArray,
	getNextHistoryValue,
} from './logic.ts';

async function getSolution() {
	const filePath = getFilePath(9);
	const rl = readFileByLine(filePath);
	let totalHistoryVal = 0;

	for await (const line of rl) {
		let isAllZero = false;
		let prevSequence = getHistoryNumArray(line);
		const sequenceLastVals: number[] = [...prevSequence.slice(-1)];
		while (!isAllZero) {
			const difference = getDifference(prevSequence);
			isAllZero = difference.every((val) => val === 0);
			sequenceLastVals.unshift(difference[difference.length - 1]);
			prevSequence = difference;
		}
		totalHistoryVal += getNextHistoryValue(sequenceLastVals);
	}
	return totalHistoryVal;
}

const Day9Part1Solution = await getSolution();
export default Day9Part1Solution;
