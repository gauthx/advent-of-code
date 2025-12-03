const opCodes = {
  1: (a, b) => a + b,
  2: (a, b) => a * b,
};

const stringsToNumbers = (array) => array.map((x) => parseInt(x));

const main = (noun,verb) => {
  const fileContents = Deno.readTextFileSync("../input/inputs.txt");
  const intCodes = stringsToNumbers(fileContents.split(",")) ;
  
  intCodes[1] = noun;
  intCodes[2] = verb;
  
  for (let index = 0; index < intCodes.length; index += 4) {
    const opcode = intCodes[index];
    if (opcode === 99) {
      break;
    }
    const indexOfInput1 = intCodes[index + 1];
    const indexOfInput2 = intCodes[index + 2];
    const input1 = intCodes.at(indexOfInput1);
    const input2 = intCodes.at(indexOfInput2);
    const outputIndex = intCodes[index + 3];
    // console.log({
    //   opcode,
    //   indexOfNum1: indexOfInput1,
    //   indexOfNum2: indexOfInput2,
    //   input1,
    //   input2,
    //   outputIndex,
    // });
    intCodes[outputIndex] = opCodes[opcode](input1, input2);
  }
  
  return intCodes[0];
};

// main([1,0,0,0,99 ]);


const findNounAndVerb = (requiredOutput) => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      if (main( noun, verb) === requiredOutput) {
        console.log( [noun, verb]);
      }
    }    
  }
}

findNounAndVerb(19690720);
// main(stringsToNumbers(fileContents.split(",")),12,2);
