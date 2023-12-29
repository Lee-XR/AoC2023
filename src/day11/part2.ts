import {
	expandSpace2,
	getGalaxies,
	getImage,
	getShortestDistance2,
} from './logic.ts';

async function getSolution() {
	const imageArray = getImage();
	const { emptyRowIndex, emptyColIndex } = expandSpace2(imageArray);
	const galaxies = getGalaxies(imageArray);

	let totalShortestDistance = 0;
	for (let i = 0; i < galaxies.length - 1; i++) {
		const currentGalaxy = galaxies[i];
		for (let j = i + 1; j < galaxies.length; j++) {
			const nextGalaxy = galaxies[j];
			totalShortestDistance += getShortestDistance2(
				currentGalaxy,
				nextGalaxy,
				emptyRowIndex,
				emptyColIndex
			);
		}
	}
	return totalShortestDistance;
}

const Day11Part2Solution = await getSolution();
export default Day11Part2Solution;
