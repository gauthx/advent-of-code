const toDigits = (num) => {
  const digits = [];
  while (num !== 0) {
    const digit = num % 10;
    digits.unshift(digit);
    num = (num - digit) / 10;
  }
  return digits;
};

const dbg = (a) => {
  console.log(a);
  return a;
};

const padToFiveDigits = (digits) => {
  const padded = [...digits];
  for (let index = 0; index < (5 - digits.length); index++) {
    padded.unshift(0);
  }
  return padded;
};

const parseInstruction = (instruction) => {
  const digits = toDigits(instruction);
  const padded = padToFiveDigits(digits);
  const [modeOfParam3, modeOfParam2, modeOfParam1, fourthDigit, fifthDigit] =
    padded;
  return {
    paramModes: [modeOfParam1, modeOfParam2, modeOfParam3],
    opCode: (fourthDigit * 10) + fifthDigit,
  };
};

const getAddress = (mode, rawIndex, intCodes) => {
  return mode === 0 ? intCodes[rawIndex] : rawIndex;
};

const sum = (a, b) => a + b;
const product = (a, b) => a * b;

const operations = {
  1: sum,
  2: product,
};

const performOperation = (codes, pointer, operationCode, modesOfParam) => {
  const intCodes = [...codes];
  const [modeOfParam1, modeOfParam2, modeOfParam3] = modesOfParam;

  const input1 = intCodes[getAddress(modeOfParam1, pointer + 1, intCodes)];
  const input2 = intCodes[getAddress(modeOfParam2, pointer + 2, intCodes)];
  const indexToInsert = getAddress(modeOfParam3, pointer + 3, intCodes);
  intCodes[indexToInsert] = operations[operationCode](input1, input2);

  return { intCodes, pointer: pointer + 4 };
};

const input = (codes, pointer) => {
  const intCodes = [...codes];
  const indexToInsert = intCodes[pointer + 1];
  const number = parseInt(prompt("Enter: "));
  // console.log({ intCodes, indexToInsert });
  intCodes[indexToInsert] = number;

  return { intCodes, pointer: pointer + 2 };
};

const printAddress = (intCodes, index, opCode, inputModes) => {
  // console.log(index)
  const indexToPrint = index + 1;
  const [mode] = inputModes;
  console.log(
    "logging output...",
    intCodes[getAddress(mode, indexToPrint, intCodes)],
  );
  return { intCodes, pointer: index + 2 };
};

const isNonZero = (num) => num !== 0;
const isZero = (num) => num === 0;

const jumpIfTrue = (intCodes, index, opCode, inputModes) => {
  const [modeOfParam1, modeOfParam2] = inputModes;
  const actualIndex1 = getAddress(modeOfParam1, index + 1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, index + 2, intCodes);

  if (isNonZero(intCodes[actualIndex1])) {
    return { intCodes, pointer: intCodes[actualIndex2] };
  }
  return { intCodes, pointer: index + 3 };
};

const jumpIfFalse = (intCodes, index, opCode, inputModes) => {
  const [modeOfParam1, modeOfParam2] = inputModes;
  const actualIndex1 = getAddress(modeOfParam1, index + 1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, index + 2, intCodes);

  if (isZero(intCodes[actualIndex1])) {
    return { intCodes, pointer: intCodes[actualIndex2] };
  }
  return { intCodes, pointer: index + 3 };
};

const isLessThan = (codes, index, opCode, inputModes) => {
  const intCodes = [...codes];
  const [modeOfParam1, modeOfParam2, modeOfParam3] = inputModes;
  const actualIndex1 = getAddress(modeOfParam1, index + 1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, index + 2, intCodes);
  const actualPositionToInsert = getAddress(
    modeOfParam3,
    index + 3,
    intCodes,
  );

  const valueToInsert = intCodes[actualIndex1] < intCodes[actualIndex2] ? 1 : 0;
  intCodes[actualPositionToInsert] = valueToInsert;
  return { intCodes, pointer: index + 4 };
};

const areEqual = (codes, index, opCode, inputModes) => {
  const intCodes = [...codes];
  const [modeOfParam1, modeOfParam2, modeOfParam3] = inputModes;
  const actualIndex1 = getAddress(modeOfParam1, index + 1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, index + 2, intCodes);
  const actualPositionToInsert = getAddress(
    modeOfParam3,
    index + 3,
    intCodes,
  );

  const valueToInsert = intCodes[actualIndex1] === intCodes[actualIndex2]
    ? 1
    : 0;
  intCodes[actualPositionToInsert] = valueToInsert;

  return { intCodes, pointer: index + 4 };
};

const opCodes = {
  1: performOperation,
  2: performOperation,
  3: input,
  4: printAddress,
  5: jumpIfTrue,
  6: jumpIfFalse,
  7: isLessThan,
  8: areEqual,
};

const stringsToNumbers = (array) => array.map((x) => parseInt(x));

const main = () => {
  const fileContents = Deno.readTextFileSync("./input.txt");
  let intCodes = stringsToNumbers(fileContents.split(","));
  // let intCodes = [
  //   3,
  //   21,
  //   1008,
  //   21,
  //   8,
  //   20,
  //   1005,
  //   20,
  //   22,
  //   107,
  //   8,
  //   21,
  //   20,
  //   1006,
  //   20,
  //   31,
  //   1106,
  //   0,
  //   36,
  //   98,
  //   0,
  //   0,
  //   1002,
  //   21,
  //   125,
  //   20,
  //   4,
  //   20,
  //   1105,
  //   1,
  //   46,
  //   104,
  //   999,
  //   1105,
  //   1,
  //   46,
  //   1101,
  //   1000,
  //   1,
  //   20,
  //   4,
  //   20,
  //   1105,
  //   1,
  //   46,
  //   98,
  //   99,
  // ];
  let pointer = 0;
  // console.log("provided intCodes", intCodes);

  while (pointer < intCodes.length) {

    const instruction = intCodes[pointer];
    if (instruction === 99) {
      break;
    }
    console.log({ intCodes });
    const parsed = parseInstruction(instruction);

    const result = opCodes[parsed.opCode](
      intCodes,
      pointer,
      parsed.opCode,
      parsed.paramModes,
    );
    intCodes = result.intCodes;
    pointer = result.pointer;
  }

};

main();
