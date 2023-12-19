import { readFileSync } from 'fs';
import { getInputFilePath } from '../utils/fs.ts';

const filePath = getInputFilePath(5);
const fileContentsArr: string[] = readFileSync(filePath, {
	encoding: 'utf8',
}).split('\n');
const fileSectionsObj: Record<string, string[]> = {};
let currentMap: string = '';
fileContentsArr.map((line, index) => {
	// First line set seeds value
	if (index === 0) {
		const [key, val] = line.split(': ');
		fileSectionsObj[key] = [val];
		return;
	}
	// Ignore empty character
	if (line === '') return;
	// Set map name as key
	if (line.includes(':')) {
		fileSectionsObj[line] = fileSectionsObj[line] ?? [];
		currentMap = line;
		return;
	}
	// Set map values into array
	fileSectionsObj[currentMap] = [...fileSectionsObj[currentMap], line];
	return;
});

function getMapValues(index: number) {
	return Object.values(fileSectionsObj)[index];
}

const seeds = getMapValues(0);
const seedToSoilMap = getMapValues(1);
const soilToFertMap = getMapValues(2);
const fertToWaterMap = getMapValues(3);
const waterToLightMap = getMapValues(4);
const lightToTempMap = getMapValues(5);
const tempToHumidMap = getMapValues(6);
const humidToLocationMap = getMapValues(7);

const Day5Part1Solution = Object.keys(fileSectionsObj).length;
export default Day5Part1Solution;
