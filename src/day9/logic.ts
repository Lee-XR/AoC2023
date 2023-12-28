export function getHistoryNumArray(historyString: string) {
	return historyString.split(' ').map((val) => parseInt(val));
}

export function getDifference(history: number[]) {
	const difference: number[] = [];
	for (let i = 0; i < history.length; i++) {
		const currentVal = history[i];
		const previousVal = history[i - 1];
		if (previousVal === undefined) continue;
		difference.push(currentVal - previousVal);
	}
	return difference;
}

export function getNextHistoryValue(sequenceLastVals: number[]) {
	return sequenceLastVals.reduce((acc, cur) => acc + cur, 0);
}
