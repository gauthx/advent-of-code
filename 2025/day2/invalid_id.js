import { chunk } from "@std/collections/chunk";

const areAllSequencesSame = (array) => {
  let [firstEle] = array;
  firstEle = firstEle.join("")
  return array.every((ele) => ele.join("") === firstEle);
};

const isInvalid = (id) => {
  const idString = id.toString();
  for (let chunkSize = 1; chunkSize <= (idString.length / 2); chunkSize++) {
    const chunks = chunk(idString, chunkSize);
    if (areAllSequencesSame(chunks)) {
      return true;
    }
  }
  return false;
};


const sumOfInvalidIDsInARange = (start, end) => {
  let sum = 0;
  for (let id = start; id <= end; id++) {
    if (isInvalid(id)) {
      sum += id;
    }
  }
  return sum;
};

const parseInput = () => {
  const parsedRanges = [];
  const input = Deno.readTextFileSync("./puzzle_input.txt");
  const ranges = input.split(",");
  for (const range of ranges) {
    const startAndEnd = range.split("-").map((num) => parseInt(num));
    parsedRanges.push(startAndEnd);
  }
  return parsedRanges;
};

const main = () => {
  const ranges = parseInput();
  let totalSum = 0;
  for (const range of ranges) {
    const [start, end] = range;
    totalSum += sumOfInvalidIDsInARange(start, end);
  }
  console.log(totalSum);
};

main();
