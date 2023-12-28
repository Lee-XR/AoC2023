import {
	PipePosition,
	checkIsVertice,
	getNextPipe,
	getOppositeDirection,
	getPipeConnection,
	getStartingPathDirections,
	getStartingPipe,
} from './logic.ts';

async function getSolution() {
	const startingPipe = getStartingPipe();
	const startingPathDirections = getStartingPathDirections();
	const vertices: PipePosition[] = [startingPipe];

	let steps = 0;
	let currentPipe = startingPipe;
	let nextDirection = startingPathDirections[0];
	while (true) {
		steps++;
		const nextPipe = getNextPipe(currentPipe, nextDirection);
		if (checkIsVertice(nextPipe.tile)) vertices.push(nextPipe);
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

	let totalX = 0,
		totalY = 0;
	for (let i = 0; i < vertices.length - 1; i++) {
		totalX += vertices[i].index * vertices[i + 1].line;
		totalY += vertices[i].line * vertices[i + 1].index;
	}
	const area = Math.abs(totalX - totalY) / 2;
	return area - steps / 2 + 1;
}

const Day10Part2Solution = await getSolution();
export default Day10Part2Solution;
