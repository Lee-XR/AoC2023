import { createReadStream } from 'fs';
import path from 'path';
import { createInterface } from 'readline';

const filePath = path.join(process.cwd(), 'src', 'assets', 'day1', 'input.txt');
const fileStream = createReadStream(filePath);
const rl = createInterface({ input: fileStream });

async function getSolution() {
	let finalSum = 0;
	for await (const line of rl) {
		const numOnlyString = line.replace(/[^0-9]/g, '');
		const numsArr = numOnlyString.split('');
		const lineValue = `${numsArr[0]}${numsArr[numsArr.length - 1]}`;
		finalSum += parseInt(lineValue);
	}
}

const Day1Part1Solution = getSolution();
export default Day1Part1Solution;
