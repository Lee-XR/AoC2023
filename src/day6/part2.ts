const raceTime = 34908986;
const distanceRecord = 204171312101780;

async function getSolution() {
	let numWinWays = 0;
	for (let pressedTime = 1; pressedTime < raceTime; pressedTime++) {
		const remainingTime = raceTime - pressedTime;
		const distance = pressedTime * remainingTime;
		if (distance > distanceRecord) numWinWays++;
	}
	return numWinWays;
}

const Day6Part2Solution = await getSolution();
export default Day6Part2Solution;
