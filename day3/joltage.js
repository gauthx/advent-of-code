const dbg = (a) => {
  console.log(a)
  return a
}

const largestJoltage = (bank) => {
  let highestJoltage = 0;

  for (let i = 0; i < bank.length; i++) {
    for (let j = i + 1; j < bank.length; j++) {
      const firstBattery = parseInt(bank[i]);
      const secondBattery = parseInt(bank[j]);
      const joltage = (firstBattery * 10) + secondBattery;
      if (joltage > highestJoltage) {
        highestJoltage = joltage;
      }
    }
  }
  return dbg(highestJoltage);
};


const largest12DigitJoltage = (bank) => {

}

const parseInput = (input) => input.split("\n");

const main = () => {
  const fileContents = Deno.readTextFileSync("./input.txt");

  const batteryArrangements = parseInput(fileContents);
  console.log(batteryArrangements);
  console.log(batteryArrangements.reduce(
    (sum, batteryArrangement) => sum += largestJoltage(batteryArrangement),
    0,
  ));
};

main();
