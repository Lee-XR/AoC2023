function checkIfHorizontal(topPatterns: string[], bottomPatterns: string[]) {
	const length = Math.max(topPatterns.length, bottomPatterns.length);
	for (let i = 0; i < length; i++) {
		if (topPatterns[i] === undefined || bottomPatterns[i] === undefined)
			return true;
		if (topPatterns[i] !== bottomPatterns[i]) return false;
	}
	return true;
}

function getHorizontalReflection(pattern: string[]): number {
	for (let i = 0; i < pattern.length - 1; i++) {
		if (pattern[i] === pattern[i + 1]) {
			const topPatterns = pattern.slice(0, i + 1).reverse();
			const bottomPatterns = pattern.slice(i + 1);
			const isReflection = checkIfHorizontal(topPatterns, bottomPatterns);
			if (isReflection) return i + 1;
		}
	}
	return -1;
}

function checkIfVertical(leftPatterns: string[], rightPatterns: string[]) {
	const length = Math.max(leftPatterns.length, rightPatterns.length);
	for (let i = 0; i < length; i++) {
		if (leftPatterns[i] === undefined || rightPatterns[i] === undefined)
			return true;
		if (leftPatterns[i] !== rightPatterns[i]) return false;
	}
	return true;
}

function getVerticalReflection(pattern: string[]): number {
	for (let i = 0; i < pattern[0].length - 1; i++) {
		const currentCol = pattern.map((col) => col[i]).join('');
		const nextCol = pattern.map((col) => col[i + 1]).join('');
		if (currentCol === nextCol) {
			const leftPatterns = Array.from({ length: i + 1 })
				.map((_, i) => pattern.map((col) => col[i]).join(''))
				.reverse();
			const rightPatterns = Array.from({
				length: pattern[0].length - (i + 1),
			}).map((_, j) => pattern.map((col) => col[j + i + 1]).join(''));
			const isReflection = checkIfVertical(leftPatterns, rightPatterns);
			if (isReflection) return i + 1;
		}
	}
	return -1;
}

export function getReflectionNum(pattern: string[]) {
	const horizontalNum = getHorizontalReflection(pattern);
	if (horizontalNum === -1) {
		const verticalNum = getVerticalReflection(pattern);
		return verticalNum;
	}
	return horizontalNum * 100;
}
