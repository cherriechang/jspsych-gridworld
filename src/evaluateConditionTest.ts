import {
  type Primitive,
  type GameStateGetter,
  evaluateCondition,
} from "./evaluateCondition";

const mockGameState: Record<string, any> = {
  player: {
    visit_tile: {
      Flag: [
        { unique: false },
        { unique: false },
        { unique: false },
        { some: false },
      ],
    },
  },
};

const get: GameStateGetter = (prop) =>
  prop
    .split(".")
    .reduce((obj, key) => obj?.[key], mockGameState) as unknown as Primitive;

console.log(
  evaluateCondition(
    {
      for_all: {
        property: "player.visit_tile.Flag",
        condition: {
          equals: {
            property: "unique",
            value: false,
          },
        },
      },
    },
    get
  )
);
