// for now -- this will be passed in as a parameter in jspsych
export const trial1config = `
general:
  rows: 5
  cols: 10
  start_location: [0, 0]
  total_steps: 15

items:
  GoalTile:
    blocks: false
    collects: true
    unique: true
    locations:
      [9, 4]: 1
    visual:
      color: "#00ff00"

end_condition:
  or:
    - equals:
        property: player.inventory.GoalTile
        value: 1
    - equals:
        property: player.steps_remaining
        value: 0
`;

export const trial2config = `general:
  rows: 5
  cols: 10
  start_location: [0, 0]
  total_steps: 15

items:
  GoalTile:
    blocks: false
    collects: true
    unique: true
    locations:
      [9, 4]: 1
    visual:
      color: "#00ff00"

  Boulder:
    blocks: true
    collects: false
    unique: true
    locations:
      [1, 1]: 1
      [2, 1]: 1
      [3, 1]: 1
      [5, 0]: 1
      [5, 1]: 1
      [5, 2]: 1
      [7, 1]: 1
      [7, 2]: 1
      [7, 3]: 1
      [7, 4]: 1
    visual:
      color: "#808080"

end_condition:
  or:
    - equals:
        property: player.inventory.GoalTile
        value: 1
    - equals:
        property: player.steps_remaining
        value: 0
`;

export const trial3config = `general:
  rows: 5
  cols: 10
  start_location: [0, 0]
  total_steps: 0  # unlimited

items:
  Apple:
    blocks: false
    collects: true
    unique: false
    locations:
      [1, 2]: 1
      [9, 0]: 1
    visual:
      color: "#ff0000"

  Banana:
    blocks: false
    collects: true
    unique: false
    locations:
      [5, 3]: 3
    visual:
      color: "#ffff00"

  Orange:
    blocks: false
    collects: true
    unique: false
    locations:
      [8, 4]: 1
    visual:
      color: "#ffa500"

end_condition:
  and:
    - equals:
        property: player.inventory.Apple
        value: 2
    - equals:
        property: player.inventory.Banana
        value: 3
    - equals:
        property: player.inventory.Orange
        value: 1
`;

export const trial4config = `general:
  rows: 5
  cols: 10
  start_location: [0, 4]
  total_steps: 0

items:
  Flag:
    blocks: false
    collects: false
    unique: true
    locations:
      [2, 3]: 1
      [4, 6]: 1
      [1, 9]: 1
    visual:
      color: "#0000ff"

end_condition:
  for_all:
    over: player.visit_tile.Flag
    equals: true
`;
