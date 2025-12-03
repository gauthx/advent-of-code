const calculateFuelRequired = (mass) => {
  const fuelRequired = Math.floor(mass / 3) - 2;
  return fuelRequired;
};

const calculateAdditionalFuel = (fuel) => {
  if (fuel < 0) {
    return 0;
  }
  return fuel + calculateAdditionalFuel(calculateFuelRequired(fuel));
}

const stringsToNumbers = (array) => array.map((x) => parseInt(x));

const sumOfAll = (array) => array.reduce((sum, num) => sum + num, 0);

const main = () => {
  const fileContents = Deno.readTextFileSync("./input/inputs.txt");
  const masses = stringsToNumbers(fileContents.split("\n"));

  const fuelRequiredForEachMass = masses.map((mass) => calculateFuelRequired(mass));

  const additionalFuelAdded = fuelRequiredForEachMass.map((fuel) => calculateAdditionalFuel(fuel))

  console.log(sumOfAll(additionalFuelAdded));
};

main();

console.log(calculateAdditionalFuel(654))