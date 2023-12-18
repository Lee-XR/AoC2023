import { getInputFilePath, readFileByLine } from "../utils/fs.ts";

const filePath = getInputFilePath(4);
const rl = readFileByLine(filePath);

function getMatches(line: string) {
  const [_, numbers] = line.split(": ");
  const [winningNums, numsList] = numbers
    .split(" | ")
    .map((nums) => nums.split(" ").filter((num) => num.length !== 0));
  return numsList.filter((num) => winningNums.includes(num)).length;
}

async function getSolution() {
  for await (const line of rl) {
    const matches = getMatches(line);
  }
}

const Day4Part2Solution = await getSolution();
export { Day4Part2Solution };
