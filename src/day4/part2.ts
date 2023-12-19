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
  const cardInstances: Record<number, number> = {};

  let i = 1;
  for await (const line of rl) {
    // get no. of matching numbers & add 1 instance (original) for current card
    const matches = getMatches(line);
    cardInstances[i] = (cardInstances[i] ?? 0) + 1;

    // loop j times for no. of matches
    for (let j = 1; j <= matches; j++) {
      // add instances of current cards to next i+j cards
      cardInstances[i + j] = (cardInstances[i + j] ?? 0) + cardInstances[i];
    }

    i++;
  }

  return Object.entries(cardInstances).reduce<number>(
    (acc, [_, cur]) => acc + cur,
    0
  );
}

const Day4Part2Solution = await getSolution();
export { Day4Part2Solution };
