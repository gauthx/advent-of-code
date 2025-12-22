const isEven = (num) => !(num & 1);

const toDigits = (num) => num.toString().split("");

const hasEvenNoOfDigits = (digits) => isEven(digits.length);

const areHalvesEqual = (digits) => {
  const firstHalf = digits.slice(0, digits.length / 2).join("");
  const secondHalf = digits.slice(digits.length / 2).join("");

  return firstHalf === secondHalf;
};

const isInvalidID = (id) => {
  const digits = toDigits(id);
  if (hasEvenNoOfDigits(digits)) {
    return areHalvesEqual(digits);
  }
  return false;
};

const sumOfInvalidIDsInARange = (start, end) => {
  let sum = 0;
  for (let id = start; id <= end; id++) {
    if (isInvalidID(id)) {
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
