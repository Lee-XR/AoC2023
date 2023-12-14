import path from "path";
import { getAssetsDirectoryPath, readFileByLine } from "../utils/fs.ts";

const directionKeys = [
  "TOP",
  "TOP_LEFT",
  "TOP_RIGHT",
  "LEFT",
  "RIGHT",
  "BOTTOM",
  "BOTTOM_LEFT",
  "BOTTOM_RIGHT",
] as const;
type DirectionKeys = (typeof directionKeys)[number];

const directions: Record<DirectionKeys, number> = {
  TOP: -140,
  TOP_LEFT: -141,
  TOP_RIGHT: -139,
  LEFT: -1,
  RIGHT: 1,
  BOTTOM: 140,
  BOTTOM_LEFT: 139,
  BOTTOM_RIGHT: 141,
} as const;

const filePath = path.join(getAssetsDirectoryPath(), "day3", "input.txt");
const rl = readFileByLine(filePath);
const LINE_LENGTH = 140;

/*
 *   Index   -- start from 0
 *   Num     -- start from 1
 */
function checkEdgeCase(lineIndex: number, charNum: number) {
  const charPosition = lineIndex * LINE_LENGTH + charNum;
  const LOWER_LINE_LIMIT = lineIndex * LINE_LENGTH + 1;
  const UPPER_LINE_LIMIT = (lineIndex + 1) * LINE_LENGTH;
  const allowedDirections = Object.values(directions);

  if (charPosition === LOWER_LINE_LIMIT)
    return Object.entries(directions).filter(([direction, val]) => [""]);
}

async function getSolution() {
  let lineNum = 0;
  for await (const line of rl) {
    for (const c of line.split("")) {
    }
  }
}

const Day3Part1Solution = getSolution();
export default Day3Part1Solution;
