import path from 'path';
import { getAssetsDirectoryPath, readFileByLine } from '../utils/fs.ts';

const colour = ['red', 'green', 'blue'] as const;
type Colour = (typeof colour)[number];

const loadedCondition: Record<Colour, number> = {
	red: 12,
	green: 13,
	blue: 14,
};

const filePath = path.join(getAssetsDirectoryPath(), 'day2', 'input.txt');
const rl = readFileByLine(filePath);

async function getSolution() {
	const possibleGames: number[] = [];
	for await (const line of rl) {
		const [game, sets] = line.split(':');
		const gameId: number = parseInt(game.replace(/[^0-9]/g, ''));

		const cubesCount: Record<Colour, number> = { red: 0, green: 0, blue: 0 };
		let isPossible = true;
		for (const set of sets.split('; ')) {
			const cubes = set.split(', ');
			for (const cube of cubes) {
				const [stringNum, colour] = cube.split(' ') as [string, Colour];
				const intNum = parseInt(stringNum);
				if (cubesCount[colour] + intNum <= loadedCondition[colour]) {
					cubesCount[colour] += intNum;
				} else {
					isPossible = false;
					break;
				}
			}
			if (!isPossible) break;
		}

		if (isPossible) possibleGames.push(gameId);
	}

	if (possibleGames.length > 0) {
		return possibleGames.reduce((acc, cur) => acc + cur, 0);
	} else {
		return 0;
	}
}

const Day2Part1Solution = await getSolution();
export default Day2Part1Solution;
