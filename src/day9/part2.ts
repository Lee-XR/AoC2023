import { getFilePath, readFileByLine } from '../utils/fs.ts';
import {
	getDifference,
	getHistoryNumArray,
	getPrevHistoryValue,
} from './logic.ts';

async function getSolution() {
	const filePath = getFilePath(9);
	const rl = readFileByLine(filePath);
	let totalHistoryVal = 0;

	for await (const line of rl) {
		let isAllZero = false;
		let prevSequence = getHistoryNumArray(line);
		const sequenceFirstVals: number[] = [...prevSequence.slice(0, 1)];
		while (!isAllZero) {
			const difference = getDifference(prevSequence);
			isAllZero = difference.every((val) => val === 0);
			sequenceFirstVals.unshift(difference[0]);
			prevSequence = difference;
		}
		totalHistoryVal += getPrevHistoryValue(sequenceFirstVals);
	}
	return totalHistoryVal;
}

const Day9Part2Solution = await getSolution();
export default Day9Part2Solution;
