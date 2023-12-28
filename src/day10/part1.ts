import { log } from '../utils/log.ts';
import {
	getNextPipe,
	getOppositeDirection,
	getPipeConnection,
	getStartingPathDirections,
	getStartingPipe,
} from './logic.ts';

async function getSolution() {
	const startingPipe = getStartingPipe();
	const startingPathDirections = getStartingPathDirections();
	let steps = 0;
	let currentPipe = startingPipe;
	let nextDirection = startingPathDirections[0];
	while (true) {
		steps++;
		const nextPipe = getNextPipe(currentPipe, nextDirection);
		if (
			nextPipe.index === startingPipe.index &&
			nextPipe.line === startingPipe.line
		)
			break;
		nextDirection = getPipeConnection(nextPipe.tile).filter(
			(direction) => direction !== getOppositeDirection(nextDirection)
		)[0];
		currentPipe = nextPipe;
	}
	return steps / 2;
}

const Day10Part1Solution = await getSolution();
export default Day10Part1Solution;
