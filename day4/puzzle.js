const toDigits = (number) => {
  const digits = [];
  while (number !== 0) {
    const digit = number % 10;
    digits.unshift(digit);
    number = (number - digit) / 10;
  }

  return digits;
};
const frequencyTable = (digits) => {
  const table = {}
  for (const digit of digits) {
    table[digit] = table[digit] + 1 || 1;
  }
  return table
}

const hasTwiceOccuringDigits = (digits) => {
  const frequencies = frequencyTable(digits)
  if (Object.values(frequencies).includes(2)) {
    return true;
  }
  return false;
}

const areDigitsOccuringMoreThan2 = (digits) => { //adjacent
  for (let index = 0; index < digits.length; index++) {
    const currentDigit = digits[index];
    const nextDigit = digits[index + 1];
    const nextNextDigit = digits[index + 2];
    if (currentDigit === nextDigit && nextDigit=== nextNextDigit) {
      return true;
    }
  }
  console.log(digits.join(""))
  return false;
};

const are2AdjacentDigitsSame = (digits) => {
  for (let index = 0; index < digits.length; index++) {
    const currentDigit = digits[index];
    const nextDigit = digits[index + 1];
    if (currentDigit === nextDigit) {
      return true;
    }
  }

  return false;
};

const areDigitsIncreasing = (digits) => {
  for (let index = 0; index < digits.length; index++) {
    const currentDigit = digits[index];
    const nextDigit = digits[index + 1];
    if (currentDigit > nextDigit) {
      return false;
    }
  }

  return true;
};

const findMatchingPasswords = (start, end) => {
  const matchingPasswords = [];
  for (let number = start; number <= end; number++) {
    const digits = toDigits(number);
    if (hasTwiceOccuringDigits(digits) && areDigitsIncreasing(digits)) { 
      console.log(number)
        matchingPasswords.push(number);
    }
  }
  console.log(matchingPasswords.length);
};

findMatchingPasswords(234208, 765869);
