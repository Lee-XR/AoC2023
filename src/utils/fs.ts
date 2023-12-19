import { createReadStream } from "fs";
import path from "path";
import { createInterface } from "readline";

export function getRootDirectoryPath() {
  return path.join(process.cwd());
}

export function getAssetsDirectoryPath() {
  return path.join(getRootDirectoryPath(), "src", "assets");
}

export function getInputFilePath(day: number, fileName: string = "input.txt") {
  return path.join(getAssetsDirectoryPath(), `day${day}`, fileName);
}

export function getTestFilePath(day: number, fileName: string = "test.txt") {
  return path.join(getAssetsDirectoryPath(), `day${day}`, fileName);
}

export function readFileByLine(filePath: string) {
  const fileStream = createReadStream(filePath);
  const rl = createInterface({ input: fileStream });
  return rl;
}
