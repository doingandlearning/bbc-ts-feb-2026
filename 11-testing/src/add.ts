export function add(a: number, b: number) {
  if (typeof a !== "number" || typeof b !== "number") {
    throw new SyntaxError("Both arguments should be numbers.");
  }
  return a + b;
}
