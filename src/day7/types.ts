export const LABELVALUES = {
	A: 13,
	K: 12,
	Q: 11,
	J: 10,
	T: 9,
	9: 8,
	8: 7,
	7: 6,
	6: 5,
	5: 4,
	4: 3,
	3: 2,
	2: 1,
} as const;
export const HANDTYPEVALUES = {
	fiveOfKind: 6,
	fourOfKind: 5,
	fullHouse: 4,
	threeOfKind: 3,
	twoPair: 2,
	onePair: 1,
	highCard: 0,
} as const;

export type LABELS = keyof typeof LABELVALUES;
export type TYPE = keyof typeof HANDTYPEVALUES;

export interface Input {
	hand: string;
	bid: number;
	type: TYPE;
}
