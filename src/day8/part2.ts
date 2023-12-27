import {
	Direction,
	getNetwork,
	getNextNode,
	getPrimeFactors,
} from './logic.ts';

const instructions =
	'LRRRLRRRLRRLRRLRLRRLRRLRRRLRRLRRRLRRRLLRRRLRRRLRRRLRLRRLRRRLRLRRRLRRRLLRLRLRRLRRLLLRRLRRLRRRLLRRRLLRRRLRLRRRLRRRLLRRLRLLRLRRRLRRLRRLRLRLRLRLRLRRRLRLRRRLLRLRRLRRRLRRRLRLRRLRLLLRLRLRLRLRLRRRLLRRLRLRLLRRRLRRLRRRLRRLRRLRRRLLRRLRLRRLRRRLRRLRLRRLRLLRRLLRLRRRLRRLRLLRRRR';

async function getSolution() {
	const network = await getNetwork();
	const nodeEndingA = Object.keys(network).filter((node) => node.endsWith('A'));
	const nodeSteps = nodeEndingA.map((node) => {
		let nextNode = node;
		let steps = 0;
		let i = 0;

		while (true) {
			nextNode = getNextNode(network, nextNode, instructions[i] as Direction);
			steps++;
			if (++i >= instructions.length) i = 0;
			if (nextNode.endsWith('Z')) break;
		}
		return steps;
	});

	return nodeSteps
		.map((node) => getPrimeFactors(node))
		.reduce((acc, cur) => {
			acc.push(...cur.filter((factor) => acc.indexOf(factor) === -1));
			return acc;
		}, [])
		.reduce((acc, cur) => acc * cur, 1);
}

const Day8Part2Solution = await getSolution();
export default Day8Part2Solution;
