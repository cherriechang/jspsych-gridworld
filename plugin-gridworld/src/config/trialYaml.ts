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
  rows: 8
  cols: 12
  start_location: [6, 4]
  total_steps: 0

items:
  Flag:
    blocks: false
    collects: true
    unique: true
    locations:
      [0, 1]: 1
      [1, 6]: 1
      [11, 0]: 1
      [11, 7]: 1
      [4, 6]: 1
      [9, 1]: 1
    visual:
      color: "#0000ff"

end_condition:
  for_all:
    over: player.visit_tile.Flag
    equals: true
`;

export const trial5config = `general:
  rows: 8
  cols: 16
  start_location: [4, 4]
  total_steps: 100  # unlimited

items:
  Apple:
    blocks: false
    collects: true
    unique: false
    locations:
      [1, 2]: 1
      [15, 3]: 3
      [9, 0]: 2
    visual:
      color: "#ff0000"

  Banana:
    blocks: false
    collects: true
    unique: false
    locations:
      [5, 3]: 3
      [10, 5]: 2
    visual:
      color: "#ffff00"

  Orange:
    blocks: false
    collects: true
    unique: false
    locations:
      [12, 7]: 1
      [12, 6]: 1
      [13, 7]: 1
      [13, 6]: 1
    visual:
      color: "#ffa500"

  Boulder:
    blocks: true
    collects: false
    unique: true
    locations:
      [1, 1]: 1 
      [2, 1]: 1 
      [3, 2]: 1 
      [5, 5]: 1 
      [5, 6]: 1 
      [5, 7]: 1 
      [14, 1]: 1 
      [13, 2]: 1 
      [12, 3]: 1 
      [11, 4]: 1
    visual:
      color: "#808080"

end_condition:
  or:
    - equals:
        property: player.steps_remaining
        value: 0
    - and:
        - greater_than:
            property: player.inventory.Apple
            value: 3
        - greater_than:
            property: player.inventory.Banana
            value: 2
        - greater_than:
            property: player.inventory.Orange
            value: 3
`;

export const trial6config = `
general:
  rows: 12
  cols: 20
  start_location: [6, 6]
  total_steps: 100

items:
  Apple:
    blocks: false
    collects: true
    unique: false
    locations:
      [1,1]: 3
      [10,2]: 5
      [18,11]: 2
    visual:
      color: "#ff0000"

  Banana:
    blocks: false
    collects: true
    unique: false
    locations:
      [2,8]: 4
      [15,5]: 3
    visual:
      color: "#ffff00"

  Orange:
    blocks: false
    collects: true
    unique: false
    locations:
      [4,10]: 3
      [7,3]: 2
      [19,0]: 1
    visual:
      color: "#ffa500"

  Boulder:
    blocks: true
    collects: false
    unique: true
    locations:
      [5,5]: 1
      [6,5]: 1
      [7,5]: 1
      [5,6]: 1
      [6,6]: 1
      [7,6]: 1
      [8,5]: 1
      [9,5]: 1
    visual:
      color: "#808080"

  Poison:
    blocks: false
    collects: false
    unique: false
    locations:
      [3,3]: 1
      [12,7]: 1
      [16,9]: 1
      [2,11]: 1
      [18,2]: 1
    visual:
      color: "#00aa00"

  Key:
    blocks: false
    collects: true
    unique: true
    locations:
      [0,11]: 1
    visual:
      color: "#ff00ff"

  Portal:
    blocks: false
    collects: false
    unique: true
    locations:
      [19,11]: 1
    visual:
      color: "#00ffff"

end_condition:
  and:
    # 1) You must pick up at least 8 apples
    - greater_than:
        property: player.inventory.Apple
        value: 8

    # 2) Exactly 4 bananas
    - equals:
        property: player.inventory.Banana
        value: 4

    # 3) Avoid all poison (never step on any Poison tile)
    - for_all:
        over: player.visit_tile.Poison
        equals: false

    # 4) Reach the Portal at least once
    - for_any:
        over: player.visit_tile.Portal
        equals: true

    # 5) And you must not run out of steps
    - greater_than:
        property: player.steps_remaining
        value: 0
`;