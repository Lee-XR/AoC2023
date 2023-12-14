export function log<T>(logItem: T): void {
  console.log(logItem);
}

export function logLine(pattern: string = "-", count: number = 30): void {
  console.log(pattern.repeat(count));
}
