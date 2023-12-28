import { readFileSync } from 'fs';
import { getFilePath } from '../utils/fs.ts';

export const pipeTiles = ['|', '-', 'L', 'J', '7', 'F', '.', 'S'] as const;
export type PipeTiles = (typeof pipeTiles)[number];
export const pipeDirections = ['north', 'south', 'east', 'west'] as const;
export type PipeDirections = (typeof pipeDirections)[number];

export interface PipePosition {
	index: number;
	line: number;
	tile: PipeTiles;
}

const pipesGrid: PipeTiles[][] = [];
const filePath = getFilePath(10);
const fileString = readFileSync(filePath, { encoding: 'utf8' });
fileString.split('\n').reduce<PipeTiles[][]>((acc, cur) => {
	const pipeLine = cur.split('') as PipeTiles[];
	acc.push([...pipeLine]);
	return acc;
}, pipesGrid);

export function getStartingPipe(): PipePosition {
	const startingPipe: PipePosition = { index: 0, line: 0, tile: 'S' };
	pipesGrid.map((pipeLine, index) => {
		if (pipeLine.find((pipe) => pipe === 'S')) {
			startingPipe.index = pipeLine.findIndex((pipe) => pipe === 'S');
			startingPipe.line = index;
		}
	});
	return startingPipe;
}

export function getPipeConnection(
	pipeTile: Omit<PipeTiles, 'S' | '.'>
): [PipeDirections, PipeDirections] {
	switch (pipeTile) {
		case '|':
			return ['north', 'south'];
		case '-':
			return ['east', 'west'];
		case 'L':
			return ['north', 'east'];
		case 'J':
			return ['north', 'west'];
		case '7':
			return ['south', 'west'];
		case 'F':
			return ['south', 'east'];
		default:
			throw new Error(`Invalid pipe tile: ${pipeTile}`);
	}
}

export function getNextPipe(
	currentPipe: PipePosition,
	nextDirection: PipeDirections
): PipePosition {
	const { index, line } = currentPipe;
	switch (nextDirection) {
		case 'north':
			return {
				index: index,
				line: line - 1,
				tile: pipesGrid[line - 1][index],
			};
		case 'south':
			return {
				index: index,
				line: line + 1,
				tile: pipesGrid[line + 1][index],
			};
		case 'east':
			return {
				index: index + 1,
				line: line,
				tile: pipesGrid[line][index + 1],
			};
		case 'west':
			return {
				index: index - 1,
				line: line,
				tile: pipesGrid[line][index - 1],
			};
		default:
			throw new Error(`Invalid direction: ${nextDirection}`);
	}
}

export function getStartingPathDirections(): PipeDirections[] {
	const startingPipe = getStartingPipe();
	return pipeDirections.filter((direction) => {
		const nextPipe = getNextPipe(startingPipe, direction);
		const nextPipeConnection = getPipeConnection(nextPipe.tile);
		switch (direction) {
			case 'north':
				return nextPipeConnection?.includes('south');
			case 'south':
				return nextPipeConnection?.includes('north');
			case 'east':
				return nextPipeConnection?.includes('west');
			case 'west':
				return nextPipeConnection?.includes('east');
		}
	});
}

export function getOppositeDirection(direction: PipeDirections) {
	switch (direction) {
		case 'north':
			return 'south';
		case 'south':
			return 'north';
		case 'east':
			return 'west';
		case 'west':
			return 'east';
	}
}

export function checkIsVertice(pipeTile: PipeTiles): boolean {
	const verticePipeTiles: PipeTiles[] = ['L', 'J', 'F', '7', 'S'];
	return verticePipeTiles.includes(pipeTile);
}
