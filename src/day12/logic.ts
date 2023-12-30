export function getConditionRecord(record: string) {
	const [conditionRecord, damagedString] = record.split(' ');
	return {
		conditionRecord,
		damagedSizes: damagedString.split(',').map((v) => parseInt(v)),
	};
}
