interface RaceInput {
	raceTime: number;
	distanceRecord: number;
}

const raceInputs: RaceInput[] = [
	{
		raceTime: 34,
		distanceRecord: 204,
	},
	{
		raceTime: 90,
		distanceRecord: 1713,
	},
	{
		raceTime: 89,
		distanceRecord: 1210,
	},
	{
		raceTime: 86,
		distanceRecord: 1780,
	},
];

async function getSolution() {
	return raceInputs.reduce<number>((acc, cur) => {
		const { raceTime, distanceRecord } = cur;
		let numWinWays = 0;
		for (let pressedTime = 1; pressedTime < raceTime; pressedTime++) {
			const remainingTime = raceTime - pressedTime;
			const distance = pressedTime * remainingTime;
			if (distance > distanceRecord) numWinWays++;
		}
		return acc * numWinWays;
	}, 1);
}

const Day6Part1Solution = await getSolution();
export default Day6Part1Solution;
