import { readFileSync } from 'fs';
import { getInputFilePath } from '../utils/fs.ts';

const filePath = getInputFilePath(5);
const fileContentsArr: string[] = readFileSync(filePath, {
	encoding: 'utf8',
}).split('\n');

function getMapValues() {
	let mapName = '';
	const valuePairs = fileContentsArr.reduce<Record<string, string[]>>(
		(acc, cur) => {
			if (cur.includes(':')) {
				mapName = cur.replace(':', '');
				acc[mapName] = [];
				return acc;
			}
			if (cur !== '') {
				acc[mapName] = [...acc[mapName], cur];
				return acc;
			}
			return acc;
		},
		{}
	);
	return {
		seedValues: Object.values(valuePairs)[0],
		seedToSoil: Object.values(valuePairs)[1],
		soilToFertilizer: Object.values(valuePairs)[2],
		fertilizerToWater: Object.values(valuePairs)[3],
		waterToLight: Object.values(valuePairs)[4],
		lightToTemperature: Object.values(valuePairs)[5],
		temperatureToHumidity: Object.values(valuePairs)[6],
		humidityToLocation: Object.values(valuePairs)[7],
	};
}

function getMap(s: string) {
	const v = s.split(' ');
	return {
		source: parseInt(v[1]),
		destination: parseInt(v[0]),
		range: parseInt(v[2]),
	};
}

async function getSolution() {
	const { seedValues, ...mapValues } = getMapValues();
	const seedLocationValues: number[] = [];

	seedValues[0].split(' ').forEach((val) => {
		const intVal = parseInt(val);
		let correspondingVal = intVal;
		Object.values(mapValues).forEach((values) => {
			for (let i = 0; i < values.length; i++) {
				const { source, destination, range } = getMap(values[i]);
				if (correspondingVal >= source && correspondingVal < source + range) {
					correspondingVal += destination - source;
					break;
				}
			}
		});
		seedLocationValues.push(correspondingVal);
	});
	return Math.min(...seedLocationValues);
}

const Day5Part1Solution = await getSolution();
export default Day5Part1Solution;
