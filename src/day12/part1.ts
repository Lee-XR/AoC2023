import { getFilePath, readFileByLine } from '../utils/fs.ts';
import { logLine } from '../utils/log.ts';
import { getConditionRecord } from './logic.ts';

async function getSolution() {
	const filePath = getFilePath(12);
	const rl = readFileByLine(filePath);

	for await (const line of rl) {
		const { conditionRecord, damagedSizes } = getConditionRecord(line);
	}
}

const Day12Part1Solution = await getSolution();
export default Day12Part1Solution;
