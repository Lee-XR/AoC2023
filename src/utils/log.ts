export function logger<T>(logItem: T): void {
	console.log(logItem);
}

export function lineLogger(pattern?: string, count?: number): void {
	console.log((pattern ?? '-').repeat(count ?? 15));
}
