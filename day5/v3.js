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
    modeOfParam3,
    modeOfParam2,
    modeOfParam1,
    opCode: ((fourthDigit || 0) * 10) + fifthDigit,
  };
};

const sum = (a, b) => a + b;
const product = (a, b) => a * b;

const operations = {
  1: sum,
  2: product,
};

const performOperation = (codes, index, operationCode, inputModes) => {
  const intCodes = [...codes];

  const [modeOfParam1, modeOfParam2, modeOfParam3] = inputModes;

  const indexOfInput1 = index + 1;
  const indexOfInput2 = index + 2;
  const outputIndex = index + 3;

  const input1 = intCodes[getAddress(modeOfParam1, indexOfInput1, intCodes)];
  const input2 = intCodes[getAddress(modeOfParam2, indexOfInput2, intCodes)];
  const indexToInsert = getAddress(modeOfParam3, outputIndex, intCodes);
  // console.log({input1,input2})
  intCodes[indexToInsert] = operations[operationCode](input1, input2);

  return { intCodes, pointerDelta: 4 };
};

const input = (codes, index) => {
  const intCodes = [...codes];
  const indexToInsert = intCodes[index + 1];
  const number = parseInt(prompt("Enter 1: "));
  // console.log({ intCodes, indexToInsert });
  intCodes[indexToInsert] = number;

  return { intCodes, pointerDelta: 2 };
};

const printAddress = (intCodes, index, opCode, inputModes) => {
  // console.log(index)
  const indexToPrint = index + 1;
  const [mode] = inputModes;
  console.log(
    "logging output...",
    intCodes[getAddress(mode, indexToPrint, intCodes)],
  );
  return { intCodes, pointerDelta: 2 };
};

const jumpIfTrue = (intCodes, index, opCode, inputModes) => {
  const [modeOfParam1,modeOfParam2] = inputModes;
  const valueIndex1 = index + 1;
  const valueIndex2 = index + 2;
  const actualIndex1 = getAddress(modeOfParam1, valueIndex1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, valueIndex2, intCodes);
  if (intCodes[actualIndex1] !== 0) {
    return { intCodes, pointerDelta: actualIndex2 - index };
  }
  return { intCodes, pointerDelta: 3 };
};

const jumpIfFalse = (intCodes, index, opCode, inputModes) => {
   const [modeOfParam1,modeOfParam2] = inputModes;
  const valueIndex1 = index + 1;
  const valueIndex2 = index + 2;
  const actualIndex1 = getAddress(modeOfParam1, valueIndex1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, valueIndex2, intCodes);

  console.log("Inside jumpiffalse",{modeOfParam1,modeOfParam2,index,valueIndex1,valueIndex2,actualIndex1,actualIndex2})
  if (intCodes[actualIndex1] === 0) {
    return { intCodes, pointerDelta: actualIndex2 - index };
  }
  return { intCodes, pointerDelta: 3 };
};

const isLessThan = (codes, index, opCode, inputModes) => {
  const intCodes = [...codes];
  const [modeOfParam1, modeOfParam2, modeOfParam3] = inputModes;
  const valueIndex1 = index + 1;
  const valueIndex2 = index + 2;
  const poisitionToInsert = index + 3;
  const actualIndex1 = getAddress(modeOfParam1, valueIndex1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, valueIndex2, intCodes);
  const actualPositionToInsert = getAddress(
    modeOfParam3,
    poisitionToInsert,
    intCodes,
  );
  console.log({ actualIndex1, actualIndex2, poisitionToInsert });

  if (intCodes[actualIndex1] < intCodes[actualIndex2]) {
    intCodes[actualPositionToInsert] = 1;
    return { intCodes, pointerDelta: 4 };
  }
  intCodes[actualPositionToInsert] = 0;
  return { intCodes, pointerDelta: 4 };
};

const areEqual = (codes, index, opCode, inputModes) => {
  const intCodes = [...codes];
  const [modeOfParam1, modeOfParam2, modeOfParam3] = inputModes;
  const valueIndex1 = index + 1;
  const valueIndex2 = index + 2;
  const poisitionToInsert = index + 3;
  const actualIndex1 = getAddress(modeOfParam1, valueIndex1, intCodes);
  const actualIndex2 = getAddress(modeOfParam2, valueIndex2, intCodes);
  const actualPositionToInsert = getAddress(
    modeOfParam3,
    poisitionToInsert,
    intCodes,
  );
  console.log({ actualIndex1, actualIndex2, poisitionToInsert });

  if (intCodes[actualIndex1] === intCodes[actualIndex2]) {
    intCodes[actualPositionToInsert] = 1;
    return { intCodes, pointerDelta: 4 };
  }
  intCodes[actualPositionToInsert] = 0;
  return { intCodes, pointerDelta: 4 };
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

const getAddress = (mode, index, intCodes) => {
  return mode === 0 ? intCodes[index] : index;
};

const stringsToNumbers = (array) => array.map((x) => parseInt(x));

const main = () => {
  // const fileContents = Deno.readTextFileSync("./input.txt");
  // let intCodes = stringsToNumbers(fileContents.split(","));
  let intCodes = [3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,
1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,
999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99];
  let pointer = 0;
  // console.log("provided intCodes", intCodes);
  console.log("given intcode", intCodes,"\n\n\n");

  while (pointer < intCodes.length) {
    const instruction = intCodes[pointer];
    if (instruction === 99) {
      break;
    }
    // console.log({ intCodes });
    const parsed = parseInstruction(instruction);
    const inputModes = [
      parsed.modeOfParam1,
      parsed.modeOfParam2,
      parsed.modeOfParam3,
    ];

    const result = opCodes[parsed.opCode](
      intCodes,
      pointer,
      parsed.opCode,
      inputModes,
    );
    intCodes = result.intCodes;
    pointer += result.pointerDelta;
    console.log(" iterating ...res", result.intCodes);
  }

  console.log("\n\n\nAfter execution:", { intCodes, index: pointer });
};

main();
