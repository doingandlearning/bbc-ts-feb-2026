import { test, expect } from "vitest";
import { add } from "./add.js";

test("adds two numbers correctly", () => {
  // Arrange  - Given
  const a = 3;
  const b = 4;
  const expected = 7;
  // Act      - When
  const result = add(a, b);
  // Assert   - Then
  expect(result).toEqual(expected);
  expect(result).to.be.a("number").equal(expected);
});

const testCases = [
  { a: -1, b: -10, result: -11 },
  { a: 0.3, b: 0.2, result: 0.5 },
  { a: 0, b: 0, result: 0 },
  { a: Number.MAX_SAFE_INTEGER, b: -1, result: Number.MAX_SAFE_INTEGER - 1 },
];

test.each(testCases)("adding $a and $b", ({ a, b, result }) => {
  expect(add(a, b)).toEqual(result);
});

test("error if non numbers are added", () => {
  expect(() => add(true as any, [] as any)).toThrow();
  expect(() => add(true as any, [] as any)).toThrowErrorMatchingInlineSnapshot(
    `[SyntaxError: Both arguments should be numbers.]`,
  );
  expect(() => add(true as any, [] as any)).toThrowErrorMatchingSnapshot();

  try {
    // add(true as any, [] as any);
  } catch (error) {
    console.log("Error thrown");
    expect(error).toBeInstanceOf(TypeError);
  }
});
