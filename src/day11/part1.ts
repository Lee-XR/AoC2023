import {
	expandSpace,
	getGalaxies,
	getImage,
	getShortestDistance,
} from './logic.ts';

async function getSolution() {
	const imageArray = getImage();
	const expandedImage = expandSpace(imageArray);
	const galaxies = getGalaxies(expandedImage);

	let totalShortestDistance = 0;
	for (let i = 0; i < galaxies.length - 1; i++) {
		const currentGalaxy = galaxies[i];
		for (let j = i + 1; j < galaxies.length; j++) {
			const nextGalaxy = galaxies[j];
			totalShortestDistance += getShortestDistance(currentGalaxy, nextGalaxy);
		}
	}
	return totalShortestDistance;
}

const Day11Part1Solution = await getSolution();
export default Day11Part1Solution;
