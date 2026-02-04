# Unit 12: Kitchen Sink 🧰

Advanced TypeScript concepts that are useful but don't fit neatly into other units.

## Topics Covered

1. **Function Overloading** - Multiple function signatures for the same function
2. **Tuples and Records** - Fixed-length arrays and object types with specific keys
3. **Branded Types** - Nominal typing to prevent mixing similar types
4. **Const Type Parameters** - Preserve literal types in generic functions (TypeScript 5.0+)

## Files

- `01-function-overloading.ts` - Function overloading examples
- `02-tuples-and-records.ts` - Tuples and Record utility type
- `03-branded-types.ts` - Branded/nominal types
- `04-const-type-parameters.ts` - `const` type parameters and literal type preservation

## Learning Objectives

By the end of this unit, you will understand:

- How to create function overloads for different input/output combinations
- When and how to use tuples vs arrays
- How to use `Record<K, T>` for object types
- How branded types prevent type mixing
- How `as const` preserves literal types and prevents mutation
- When to use each technique in real-world scenarios

## Quick Reference

### Function Overloading
```typescript
function process(input: string): string[];
function process(input: number): number[];
function process(input: string | number): string[] | number[] {
  // Implementation
}
```

### Tuples
```typescript
type Point = [number, number];
type UserInfo = [name: string, age: number, email: string];
```

### Records
```typescript
type StatusConfig = Record<"pending" | "approved", { color: string }>;
```

### Branded Types
```typescript
type UserId = string & { __brand: "UserId" };
```

### Const Type Parameters
```typescript
function identity<const T>(value: T): T {
  return value;
}
const result = identity("hello"); // type is "hello", not string
```
