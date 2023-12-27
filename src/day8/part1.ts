import { Direction, getNetwork, getNextNode } from './logic.ts';

const instructions =
	'LRRRLRRRLRRLRRLRLRRLRRLRRRLRRLRRRLRRRLLRRRLRRRLRRRLRLRRLRRRLRLRRRLRRRLLRLRLRRLRRLLLRRLRRLRRRLLRRRLLRRRLRLRRRLRRRLLRRLRLLRLRRRLRRLRRLRLRLRLRLRLRRRLRLRRRLLRLRRLRRRLRRRLRLRRLRLLLRLRLRLRLRLRRRLLRRLRLRLLRRRLRRLRRRLRRLRRLRRRLLRRLRLRRLRRRLRRLRLRRLRLLRRLLRLRRRLRRLRLLRRRR';
const startNode = 'AAA';
const endNode = 'ZZZ';

async function getSolution() {
	const network = await getNetwork();
	let nextNode = startNode;
	let isEndNodeReached = false;
	let steps = 0;
	let i = 0;

	while (!isEndNodeReached) {
		nextNode = getNextNode(network, nextNode, instructions[i] as Direction);
		steps++;
		if (++i >= instructions.length) i = 0;
		if (nextNode === endNode) isEndNodeReached = true;
	}

	return steps;
}

const Day8Part1Solution = await getSolution();
export default Day8Part1Solution;
