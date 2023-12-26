import { readFileSync } from 'fs';
import { getFilePath } from '../utils/fs.ts';
import { getInput, sortInputs } from './logic.ts';

async function getSolution() {
	const filePath = getFilePath(7);
	const inputs = readFileSync(filePath, { encoding: 'utf8' })
		.split('\n')
		.map(getInput)
		.sort(sortInputs);

	return inputs.reduce<number>((acc, cur, index) => {
		const rank = index + 1;
		return acc + cur.bid * rank;
	}, 0);
}

const Day7Part1Solution = await getSolution();
export default Day7Part1Solution;
