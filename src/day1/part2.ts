import { createReadStream } from 'fs';
import path from 'path';
import { createInterface } from 'readline';

const numMap: Record<string, number> = {
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const filePath = path.join(process.cwd(), 'src', 'assets', 'day1', 'input.txt');
const fileStream = createReadStream(filePath);
const rl = createInterface(fileStream);

async function getSolution() {
	let finalSum = 0;
	for await (const line of rl) {
		const numsArr: number[] = [];

		for (let i = 0; i < line.length; i++) {
			const charToNumber = parseInt(line[i]);
			if (!isNaN(charToNumber)) {
				numsArr.push(charToNumber);
				continue;
			}

			const nextSubstring = line.substring(i, line.length);
			for (const numKey in numMap) {
				if (nextSubstring.startsWith(numKey)) {
					numsArr.push(numMap[numKey]);
					break;
				}
			}
		}

		const lineValue = `${numsArr[0]}${numsArr[numsArr.length - 1]}`;
		finalSum += parseInt(lineValue);
	}
}

const Day1Part2Solution = getSolution();
export default Day1Part2Solution;
