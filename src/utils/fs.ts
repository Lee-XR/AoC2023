import { createReadStream } from "fs";
import path from "path";
import { createInterface } from "readline";

export function getRootDirectoryPath() {
  return path.join(process.cwd());
}

export function getAssetsDirectoryPath() {
  return path.join(getRootDirectoryPath(), "src", "assets");
}

export function readFileByLine(filePath: string) {
  const fileStream = createReadStream(filePath);
  const rl = createInterface({ input: fileStream });
  return rl;
}
