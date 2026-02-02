// 2012
// Jscript.NET
// 1. JavaScript (run-time) is TypeScript (compile-time
// 2. Structural typing (duck typing)
// 3. Gradual adoption
// 4. Type Safety without getting in the way
// 5. Tooling
var _a;
{
    // 7 Primitive Types in JS
    var result = "" === "";
    // String, Number, Boolean, undefined, null, BigInt, Symbol
    // Symbol - unique, immutable idenfitier
    var sym1 = Symbol("id");
    var ID_KEY = Symbol("id");
    var user = (_a = {
            name: "Kevin"
        },
        _a[ID_KEY] = 12345,
        _a);
    console.log(user[ID_KEY]);
    var number = 45n;
    // Object -> Date(), Array
}
{
    var name_1 = Symbol();
    // any, unknown, void, never
    var world = "Earth"; // opt out of the typing system
    world = 123;
    world = true;
    function add(a, b) {
        return a + b;
    }
    // unknown - put the type system on hold
    function adding(a, b) {
        if (typeof a === "number" && typeof b === "number") {
            return a + b;
        }
        else {
            return 0;
        }
    }
    // void - return type of function that doesn't return
    function printSomething(x) { }
    // never
    function example(x) {
        if (typeof x === "string") {
            return "Hello";
        }
        else if (typeof x === "number") {
            return x;
        }
    }
}
{
    console.log(200 /* STATUS_CODE.OK */);
}
