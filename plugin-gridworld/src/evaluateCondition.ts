export type Primitive =
  | number
  | boolean
  | [number, number]
  | Array<Record<string, Primitive>>;

export type GameStateGetter = (property: string) => Primitive;

type Condition =
  | { and: Condition[] }
  | { or: Condition[] }
  | { not: Condition }
  | { equals: Predicate }
  | { greater_than: Predicate }
  | { less_than: Predicate }
  | { for_all: PredicateArray }
  | { for_any: PredicateArray };

type Predicate = {
  property: string;
  value: Primitive;
};

type PredicateArray = {
  property: string;
  condition: Condition;
};

export function evaluateCondition(
  condition: Condition,
  get: GameStateGetter
): boolean {
  if ("and" in condition) {
    return condition.and.every((c) => evaluateCondition(c, get));
  } else if ("or" in condition) {
    return condition.or.some((c) => evaluateCondition(c, get));
  } else if ("not" in condition) {
    return !evaluateCondition(condition.not, get);
  } else if ("equals" in condition) {
    const actual = get(condition.equals.property) as number;
    return deepEqual(actual, condition.equals.value);
  } else if ("greater_than" in condition) {
    return (
      (get(condition.greater_than.property) as number) >
      (condition.greater_than.value as number)
    );
  } else if ("less_than" in condition) {
    return (
      (get(condition.less_than.property) as number) <
      (condition.less_than.value as number)
    );
  } else if ("for_all" in condition) {
    const arr = get(condition.for_all.property) as Array<
    Record<string, Primitive>
    >;
    console.log(condition.for_all.condition);
    return arr.every((item: Record<string, Primitive>) =>
      evaluateCondition(condition.for_all.condition, (key) => item[key])
    );
  } else if ("for_any" in condition) {
    const arr = get(condition.for_any.property) as Array<
      Record<string, Primitive>
    >;
    return arr.some((item: Record<string, Primitive>) =>
      evaluateCondition(condition.for_any.condition, (key) => item[key])
    );
  } else {
    throw new Error("Unknown condition type");
  }
}

function deepEqual(a: any, b: any): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((v, i) => v === b[i]);
  }
  return a === b;
}



