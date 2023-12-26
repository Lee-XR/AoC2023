import {
	HANDTYPEVALUES,
	Input,
	LABELS,
	LABELVALUES,
	LABELVALUES2,
	TYPE,
} from './types.ts';

const HAND_LENGTH = 5;

export function getInput(input: string): Input {
	const [hand, bid] = input.split(' ');
	return {
		hand: hand,
		bid: parseInt(bid),
		type: getHandType(hand),
	};
}

function getHandType(hand: string): TYPE {
	const handLabels: Map<LABELS, number> = new Map();
	hand.split('').reduce<Map<LABELS, number>>((acc, cur) => {
		const label = cur as LABELS;
		const prev = acc.get(label);
		if (prev === undefined) return acc.set(label, 1);
		else return acc.set(label, prev + 1);
	}, handLabels);

	switch (handLabels.size) {
		case 5:
			return 'highCard';
		case 4:
			return 'onePair';
		case 3: {
			const iterator = handLabels.values();
			while (true) {
				const next = iterator.next();
				if (next.value === 3) return 'threeOfKind';
				if (next.done) return 'twoPair';
			}
		}
		case 2: {
			const iterator = handLabels.values();
			while (true) {
				const value = iterator.next().value;
				if (value === 4 || value === 1) return 'fourOfKind';
				if (value === 3 || value === 2) return 'fullHouse';
			}
		}
		case 1:
			return 'fiveOfKind';
		default:
			throw new Error(`Invalid map size: ${handLabels.size}`);
	}
}

export function sortInputs(a: Input, b: Input) {
	const typeValueA = HANDTYPEVALUES[a.type];
	const typeValueB = HANDTYPEVALUES[b.type];

	if (typeValueA === typeValueB) {
		for (let i = 0; i < HAND_LENGTH; i++) {
			const labelA = a.hand[i] as LABELS;
			const labelB = b.hand[i] as LABELS;
			if (labelA === labelB) continue;
			return LABELVALUES[labelA] > LABELVALUES[labelB] ? 1 : -1;
		}
		return 0;
	}
	return typeValueA > typeValueB ? 1 : -1;
}

/*
 * PART 2 LOGIC FUNCTIONS
 */

export function getInput2(input: string): Input {
	const [hand, bid] = input.split(' ');
	return {
		hand: hand,
		bid: parseInt(bid),
		type: getHandType2(hand),
	};
}

function getHandTypeSwitch(handLabels: Map<LABELS, number>) {
	switch (handLabels.size) {
		case 5:
			return 'highCard';
		case 4:
			return 'onePair';
		case 3: {
			const iterator = handLabels.values();
			while (true) {
				const next = iterator.next();
				if (next.value === 3) return 'threeOfKind';
				if (next.done) return 'twoPair';
			}
		}
		case 2: {
			const iterator = handLabels.values();
			while (true) {
				const value = iterator.next().value;
				if (value === 4 || value === 1) return 'fourOfKind';
				if (value === 3 || value === 2) return 'fullHouse';
			}
		}
		case 1:
			return 'fiveOfKind';
		default:
			throw new Error(`Invalid map size: ${handLabels.size}`);
	}
}

function getHandType2(hand: string): TYPE {
	const handLabels: Map<LABELS, number> = new Map();
	hand.split('').reduce<Map<LABELS, number>>((acc, cur) => {
		const label = cur as LABELS;
		const prev = acc.get(label);
		if (prev === undefined) return acc.set(label, 1);
		else return acc.set(label, prev + 1);
	}, handLabels);

	if (handLabels.get('J') === undefined) return getHandTypeSwitch(handLabels);
	handLabels.delete('J');

	switch (handLabels.size) {
		case 4:
			return 'onePair';
		case 3:
			return 'threeOfKind';
		case 2: {
			const iterator = handLabels.values();
			while (true) {
				const next = iterator.next();
				if (next.value === 3 || next.value === 1) return 'fourOfKind';
				if (next.done) return 'fullHouse';
			}
		}
		case 1:
		case 0:
			return 'fiveOfKind';
		default:
			throw new Error(`Invalid map size: ${handLabels.size}`);
	}
}

export function sortInputs2(a: Input, b: Input) {
	const typeValueA = HANDTYPEVALUES[a.type];
	const typeValueB = HANDTYPEVALUES[b.type];

	if (typeValueA === typeValueB) {
		for (let i = 0; i < HAND_LENGTH; i++) {
			const labelA = a.hand[i] as LABELS;
			const labelB = b.hand[i] as LABELS;
			if (labelA === labelB) continue;
			return LABELVALUES2[labelA] > LABELVALUES2[labelB] ? 1 : -1;
		}
		return 0;
	}
	return typeValueA > typeValueB ? 1 : -1;
}
