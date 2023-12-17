export function getSolution<Input, Output>(
	callback: (...arg: Input[]) => Output
) {
	return callback;
}
