const dbg = (a) => {
  console.log(a);
  return a;
};

const toDigits = (num) => {
  const digits = [];
  while (num !== 0) {
    const digit = num % 10;
    digits.unshift(digit);
    num = (num - digit) / 10;
  }
  return digits;
};

function padToFiveDigits(digits) {
  const padded = [...digits];
  for (let index = 0; index < (5 - digits.length); index++) {
    padded.unshift(0);
  }
  return padded;
}

const parseInstruction = (instruction) => {
  const digits = toDigits(instruction);
  const padded = padToFiveDigits(digits);
  const [firstDigit, secondDigit, thirdDigit, fourthDigit, fifthDigit] = padded;
  return [
    firstDigit,
    secondDigit,
    thirdDigit,
    ((fourthDigit || 0) * 10) + fifthDigit,
  ];
};

const getAddress = (mode, index, intCodes) => {
  return mode === 0 ? intCodes[index] : index;
};

const operation = (codes, index, operationCode) => {
  const intCodes = [...codes];

  const indexOfInput1 = index + 1;
  const indexOfInput2 = index + 2;
  const outputIndex = index + 3;

  const input1 = intCodes[getAddress(modeOfParam1, indexOfInput1, intCodes)];
  const input2 =
    intCodes[dbg(getAddress(modeOfParam2, indexOfInput2, intCodes))];
  const indexToInsert = getAddress(modeOfParam3, outputIndex, intCodes);
  intCodes[indexToInsert] = opCodes[operationCode](input1, input2);

  return { intCodes, pointerDelta: 4 };
};
const opCodes = {
  1: operation,
  2: operation,
  3: input,
  4: printAddress,
};

const stringsToNumbers = (array) => array.map((x) => parseInt(x));

const main = () => {
  const fileContents = Deno.readTextFileSync("./input.txt");
  let intCodes = stringsToNumbers(fileContents.split(","));
  let index = 0;

  console.log("Given IntCodes", intCodes);

  while (index < intCodes.length) {
    const instruction = intCodes[index];
    const [modeOfParam3, modeOfParam2, modeOfParam1, operationCode] =
      parseInstruction(instruction);
    intCodes = opCodes[operationCode](intCodes, index, operationCode);
  }
  return intCodes[0];
};

main();
