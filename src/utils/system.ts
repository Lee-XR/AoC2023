export function isTestTrue() {
	return process.argv[2] !== undefined && process.argv[2] === 'test';
}
