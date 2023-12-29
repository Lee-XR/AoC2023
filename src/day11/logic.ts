import { readFileSync } from 'fs';
import { getFilePath } from '../utils/fs.ts';
import { log } from '../utils/log.ts';

interface GalaxyCoords {
	x: number;
	y: number;
}

export function getImage(): string[][] {
	const filePath = getFilePath(11);
	const imageString = readFileSync(filePath, { encoding: 'utf8' });

	return imageString.split('\n').reduce<string[][]>((acc, cur) => {
		acc.push([...cur.split('')]);
		return acc;
	}, []);
}

export function printImage(image: string[][]) {
	image.map((line) => log(line.join('')));
}

function getColumnValues(image: string[][], col: number) {
	return image.map((line) => line[col]);
}

export function expandSpace(image: string[][]): string[][] {
	const expandedRows = image.reduce<string[][]>((acc, cur) => {
		if (cur.every((v) => v === '.')) acc.push([...cur]);
		acc.push([...cur]);
		return acc;
	}, []);

	for (let col = 0; col < expandedRows[0].length; col++) {
		if (getColumnValues(expandedRows, col).every((v) => v === '.')) {
			expandedRows.map((line) => line.splice(col, 0, '.'));
			col++;
		}
	}
	return expandedRows;
}

export function getGalaxies(image: string[][]) {
	const galaxyCoords: GalaxyCoords[] = [];
	image.map((line, lineIndex) => {
		line.map((v, vIndex) => {
			if (v === '#') galaxyCoords.push({ x: vIndex, y: lineIndex });
		});
	});
	return galaxyCoords;
}

export function getGalaxyNum(image: string[][]) {
	return image.reduce<number>(
		(acc, cur) => acc + cur.filter((v) => v === '#').length,
		0
	);
}

export function getGalaxyPairs(num: number) {
	return (num * (num - 1)) / 2;
}

export function getShortestDistance(
	galaxy1: GalaxyCoords,
	galaxy2: GalaxyCoords
) {
	return Math.abs(galaxy1.x - galaxy2.x) + Math.abs(galaxy1.y - galaxy2.y);
}
