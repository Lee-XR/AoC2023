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

export function expandSpace2(image: string[][]) {
	const emptyColIndex: number[] = [];
	const emptyRowIndex: number[] = [];

	image.map((row, index) => {
		if (row.every((v) => v === '.')) emptyRowIndex.push(index);
	});

	for (let col = 0; col < image[0].length; col++) {
		if (getColumnValues(image, col).every((v) => v === '.'))
			emptyColIndex.push(col);
	}
	return { emptyColIndex, emptyRowIndex };
}

function getPointDistance(point1: number, point2: number) {
	return Math.abs(point1 - point2);
}

export function getShortestDistance2(
	galaxy1: GalaxyCoords,
	galaxy2: GalaxyCoords,
	emptyRowIndex: number[],
	emptyColIndex: number[]
) {
	const higherX = Math.max(galaxy1.x, galaxy2.x);
	const lowerX = Math.min(galaxy1.x, galaxy2.x);
	const higherY = Math.max(galaxy1.y, galaxy2.y);
	const lowerY = Math.min(galaxy1.y, galaxy2.y);

	const emptyColsNum = emptyColIndex.filter(
		(n) => n > lowerX && n < higherX
	).length;
	const emptyRowsNum = emptyRowIndex.filter(
		(n) => n > lowerY && n < higherY
	).length;

	const xDistance =
		getPointDistance(galaxy1.x, galaxy2.x) + emptyColsNum * 999999;
	const yDistance =
		getPointDistance(galaxy1.y, galaxy2.y) + emptyRowsNum * 999999;

	return xDistance + yDistance;
}
