import { getFilePath, readFileByLine } from '../utils/fs.ts';

interface NodeElements {
	left: string;
	right: string;
}

export type Direction = 'L' | 'R';

export async function getNetwork() {
	const filePath = getFilePath(8);
	const rl = readFileByLine(filePath);
	let i = 0;
	const network: Record<string, NodeElements> = {};

	for await (const line of rl) {
		if (++i > 2) {
			const [node, elements] = line.split(' = ');
			const [left, right] = elements.replace(/[()]/g, '').split(', ');
			network[node] = { left, right };
		}
	}

	return network;
}

export function getNextNode(
	network: Record<string, NodeElements>,
	node: string,
	direction: Direction
) {
	const currentNode = network[node];
	return direction === 'L' ? currentNode.left : currentNode.right;
}
