// 2012
// Jscript.NET
// 1. JavaScript (run-time) is TypeScript (compile-time
// 2. Structural typing (duck typing)
// 3. Gradual adoption
// 4. Type Safety without getting in the way
// 5. Tooling

{
  // 7 Primitive Types in JS
  const result = "" === "";

  // String, Number, Boolean, undefined, null, BigInt, Symbol
  // Symbol - unique, immutable idenfitier
  const sym1 = Symbol("id");
  const ID_KEY = Symbol("id");

  const user = {
    name: "Kevin",
    [ID_KEY]: 12345,
  };

  console.log(user[ID_KEY]);

  let number = 45n;

  // Object -> Date(), Array
}

{
  let name = Symbol();

  // any, unknown, void, never
  let world: any = "Earth"; // opt out of the typing system

  world = 123;
  world = true;

  function add(a: number, b: number) {
    return a + b;
  }

  // unknown - put the type system on hold
  function adding(a: unknown, b: unknown): number {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    } else {
      return 0;
    }
  }

  // void - return type of function that doesn't return
  function printSomething(x: unknown) {}

  // never
  function example(x: string | number) {
    if (typeof x === "string") {
      return "Hello";
    } else if (typeof x === "number") {
      return x;
    }
  }
}

{
  const enum STATUS_CODE {
    "NOT_FOUND" = "This is not found",
    "OK" = "this is ok",
    "UNAUTHORIZED" = 403,
  }

  console.log(STATUS_CODE.OK);
}
