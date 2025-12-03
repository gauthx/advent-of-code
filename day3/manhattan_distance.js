const movementDeltas = {
  R: (distance) => ({ dx: distance * 1, dy: 0 }),
  D: (distance) => ({ dx: 0, dy: distance * -1 }),
  U: (distance) => ({ dx: 0, dy: distance * 1 }),
  L: (distance) => ({ dx: distance * -1, dy: 0 }),
};

const parseInput = (input) => {
  const direction = input.slice(0, 1);
  const distanceToMove = parseInt(input.slice(1));
  return [direction, distanceToMove];
};

const findWirePosition = ({ x, y }, path) => {
  const [direction, distanceToMove] = parseInput(path);
  const { dx, dy } = movementDeltas[direction](distanceToMove);
  return { x: x + dx, y: y + dy };
};

const wirePositions = (initialPosition, paths) => {
  const positions = []

  let position = initialPosition;
  for (const path of paths) {
    console.log(position);
    position = findWirePosition(position, path);
    positions.push(position)
  }
  console.log(positions)
};

const main = () => {
  const position = { x: 0, y: 0 };
  const wire1Paths = ["R8", "U5", "L5", "D3"];
  wirePositions(position, wire1Paths);
};

main();
