import { getInputFilePath, readFileByLine } from '../utils/fs.ts';
import { log } from '../utils/log.ts';

const filePath = getInputFilePath(4);
const rl = readFileByLine(filePath);

async function getSolution() {
	let totalPoints = 0;
	for await (const line of rl) {
		let matches = 0;
		const [_, numbers] = line.split(': ');
		const [winningNums, numsList] = numbers
			.split(' | ')
			.map((nums) => nums.split(' ').filter((value) => value.length !== 0));

		numsList.map((num) => {
			if (winningNums.includes(num)) matches++;
		});

		if (matches === 1) totalPoints += 1;
		if (matches > 1) {
			totalPoints += (function fn(matches: number, val: number): number {
				return matches > 1 ? fn(--matches, val * 2) : val;
			})(matches, 1);
		}
	}
	return totalPoints;
}

const Day4Part1Solution = await getSolution();
export default Day4Part1Solution;
