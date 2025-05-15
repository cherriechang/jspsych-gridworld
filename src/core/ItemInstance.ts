import { ItemCategory } from "./ItemCategory";
import { Position } from "./types";
import { v4 as uuid } from "uuid";

export class ItemInstance {
  public readonly id = uuid();
  constructor(
    public readonly category: ItemCategory,
    public readonly location: Position
  ) {}
}
