import { readFileSync } from 'fs';
import { getFilePath } from '../utils/fs.ts';
import { getInput2, sortInputs2 } from './logic.ts';

async function getSolution() {
	const filePath = getFilePath(7);
	const inputs = readFileSync(filePath, { encoding: 'utf8' })
		.split('\n')
		.map(getInput2)
		.sort(sortInputs2);

	return inputs.reduce<number>((acc, cur, index) => {
		const rank = index + 1;
		return acc + cur.bid * rank;
	}, 0);
}

const Day7Part2Solution = await getSolution();
export default Day7Part2Solution;
