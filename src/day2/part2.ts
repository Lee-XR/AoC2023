import path from 'path';
import { getAssetsDirectoryPath, readFileByLine } from '../utils/fs.ts';

const colour = ['red', 'green', 'blue'] as const;
type Colour = (typeof colour)[number];

const filePath = path.join(getAssetsDirectoryPath(), 'day2', 'input.txt');
const rl = readFileByLine(filePath);

async function getSolution() {
	let powerSum = 0;
	for await (const line of rl) {
		const [_, sets] = line.split(': ');
		const fewestCubeCount: Record<Colour, number> = {
			red: 0,
			green: 0,
			blue: 0,
		};

		for (const set of sets.split('; ')) {
			const cubes = set.split(', ');
			for (const cube of cubes) {
				const [stringNum, colour] = cube.split(' ') as [string, Colour];
				const intNum = parseInt(stringNum);
				if (intNum > fewestCubeCount[colour]) fewestCubeCount[colour] = intNum;
			}
		}

		const power = Object.entries(fewestCubeCount).reduce(
			(acc, [_, cur]) => acc * cur,
			1
		);
		powerSum += power;
	}
	return powerSum;
}

const Day2Part2Solution = await getSolution();
export default Day2Part2Solution;
