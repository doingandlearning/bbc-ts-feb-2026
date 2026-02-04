# Section 12 — Kitchen Sink: Advanced TypeScript Concepts

This section covers advanced TypeScript features that are powerful but don't fit into the main curriculum. These are "nice to have" tools that solve specific problems elegantly.

---

## 1. Function Overloading

Function overloading lets you define multiple function signatures for the same function name, providing different type information based on arguments.

### Basic Pattern

```ts
// Overload signatures (what callers see)
function getValue(value: string): string;
function getValue(value: number): number;

// Implementation signature (must be compatible)
function getValue(value: string | number): string | number {
  return value;
}
```

### Key Points

- **Overload signatures come first** — these are what TypeScript uses for type checking
- **Implementation comes last** — must be compatible with all overloads
- **More specific overloads first** — TypeScript picks the first matching overload
- **Return types can differ** — based on input types
- **Useful for:** APIs, DOM methods, library functions

### When to Use

- Different return types based on input
- Different parameter counts
- Handling arrays vs single items
- API endpoints with different response types

### Common Patterns

```ts
// Pattern: Single vs Array
function format(item: string): string;
function format(items: string[]): string[];

// Pattern: Optional parameters
function create(name: string): User;
function create(name: string, email: string): User;

// Pattern: String literal discrimination
function fetch(endpoint: "users"): Promise<User[]>;
function fetch(endpoint: "posts"): Promise<Post[]>;
```

---

## 2. Tuples

Tuples are fixed-length arrays with specific types at each position.

### Basic Tuples

```ts
type Point = [number, number];
const point: Point = [10, 20];
```

### Named Tuples (TypeScript 4.0+)

```ts
type UserInfo = [name: string, age: number, email: string];
```

### Readonly Tuples

```ts
type ReadonlyPoint = readonly [number, number];
```

### Rest Elements

```ts
type StringNumberBooleans = [string, number, ...boolean[]];
```

### Variadic Tuples (TypeScript 4.0+)

```ts
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];
```

### When to Use Tuples

- **Coordinates** — `[x, y]` or `[x, y, z]`
- **Multiple return values** — React's `useState` returns `[state, setState]`
- **Function parameters** — Fixed-position arguments
- **API responses** — `[data, status, headers]`

### Tuples vs Arrays

| Tuples | Arrays |
|--------|--------|
| Fixed length | Variable length |
| Specific types per position | Same type for all elements |
| `[string, number]` | `string[]` |

---

## 3. Records

`Record<K, T>` creates an object type with keys of type `K` and values of type `T`.

### Basic Usage

```ts
type UserRecord = Record<string, string>;
// Equivalent to: { [key: string]: string }
```

### With Union Keys

```ts
type Status = "pending" | "approved" | "rejected";
type StatusConfig = Record<Status, { color: string }>;
```

### When to Use Records

- **Configuration objects** — `Record<FeatureName, boolean>`
- **Maps/Dictionaries** — `Record<string, Value>`
- **Type-safe object creation** — Ensures all keys are present

### Record vs Index Signature

```ts
// Record (more concise)
type Map = Record<string, number>;

// Index signature (equivalent)
type MapAlt = {
  [key: string]: number;
};
```

---

## 4. Branded Types (Nominal Typing)

Branded types create distinct types from primitives to prevent mixing similar types.

### Basic Pattern

```ts
type UserId = string & { __brand: "UserId" };
type ProductId = string & { __brand: "ProductId" };

function createUserId(id: string): UserId {
  return id as UserId;
}
```

### Why Use Branded Types

- **Prevent mixing IDs** — `UserId` vs `ProductId` vs `OrderId`
- **Prevent mixing units** — `Meters` vs `Seconds` vs `Kilograms`
- **Prevent mixing currencies** — `USD` vs `EUR` vs `GBP`
- **Domain safety** — Ensure correct types are used

### Generic Helper

```ts
type Brand<T, B> = T & { __brand: B };

type UserId = Brand<string, "UserId">;
type PriceUSD = Brand<number, "USD">;
```

### When to Use

- **Primitive types that shouldn't mix** — IDs, currencies, units
- **Domain modeling** — Strong typing for business concepts
- **API boundaries** — Distinguish different string/number types

### Branded Types vs Type Aliases

```ts
// Type alias - structural (can mix)
type UserId = string;
type ProductId = string;
// These are interchangeable ❌

// Branded type - nominal (can't mix)
type UserId = string & { __brand: "UserId" };
type ProductId = string & { __brand: "ProductId" };
// These are distinct ✅
```

---

## 5. Const Type Parameters (TypeScript 5.0+)

`const` type parameters preserve literal types in generic functions without needing `as const` at the call site.

### Basic Usage

```ts
// Without const type parameter - type widens
function identity<T>(value: T): T {
  return value;
}
const result1 = identity("hello");
// Type: string (widened)

// With const type parameter - type stays narrow
function identityConst<const T>(value: T): T {
  return value;
}
const result2 = identityConst("hello");
// Type: "hello" (literal type preserved!)
```

### With Objects

```ts
function processConfig<const T>(config: T): T {
  return config;
}

const config = processConfig({
  apiUrl: "https://api.com",
  timeout: 5000
});
// Type: { readonly apiUrl: "https://api.com"; readonly timeout: 5000 }
// Literal types preserved!
```

### With Arrays

```ts
function processArray<const T extends readonly unknown[]>(items: T): T {
  return items;
}

const arr = processArray(["red", "green", "blue"]);
// Type: readonly ["red", "green", "blue"] (tuple with literals!)
```

### Const Type Parameters vs `as const`

```ts
// Old way: as const assertion
const oldWay = identity(["red", "green"] as const);
// Requires explicit `as const` at call site

// New way: const type parameter
const newWay = identityConst(["red", "green"]);
// No `as const` needed - function handles it!
```

### When to Use

- **Preserving literal types** — From function arguments
- **Configuration functions** — Keep exact values
- **Builder patterns** — Maintain literal types through chain
- **Avoiding `as const`** — Let function handle it

### Key Benefits

- **Preserves literals** — Without `as const` at call site
- **Cleaner API** — Function handles type preservation
- **Works with constraints** — Can still validate types
- **TypeScript 5.0+** — Modern feature

---

## How These Concepts Fit Together

### Example: Type-Safe API Client

```ts
// Function overloading for different endpoints
function fetch(endpoint: "users"): Promise<User[]>;
function fetch(endpoint: "posts"): Promise<Post[]>;
function fetch(endpoint: string): Promise<unknown>;

// Branded types for IDs
type UserId = string & { __brand: "UserId" };
type PostId = string & { __brand: "PostId" };

// Tuples for responses
type ApiResponse<T> = [data: T, status: number, headers: Record<string, string>];

// Const assertions for configuration
const endpoints = {
  users: "/api/users",
  posts: "/api/posts"
} as const;
```

---

## Common Pitfalls & Quick Fixes

### Function Overloading

* **Implementation not compatible**
  → Ensure implementation signature matches all overloads

* **Wrong overload order**
  → More specific overloads should come first

### Tuples

* **Confusing with arrays**
  → Tuples are fixed-length, arrays are variable-length

* **Forgetting readonly**
  → Use `readonly` tuple if you don't want mutation

### Records

* **Using Record when you need specific keys**
  → Use interface/type for known keys, Record for dynamic keys

### Branded Types

* **Forgetting to create branded values**
  → Use type guard functions to create branded values safely

* **Runtime behavior**
  → Brand property is erased at runtime (compile-time only)

### Const Assertions

* **Losing type validation**
  → Use `as const satisfies Type` for validation + literals

* **Overusing const assertions**
  → Only use when you need literal types or immutability

---

## What to Remember

* Function overloading provides precise types for different inputs
* Tuples are fixed-length arrays with specific types per position
* Records create object types with specific key/value types
* Branded types prevent mixing similar primitive types
* `as const` preserves literal types and prevents mutation
* These are advanced tools — use when they solve specific problems

---

### Final Checklist

* [ ] Can I create function overloads for different input/output types?
* [ ] Do I understand when to use tuples vs arrays?
* [ ] Can I use `Record<K, T>` for object types?
* [ ] Would branded types prevent type mixing issues?
* [ ] Do I know when `as const` is helpful?
* [ ] Can I combine these concepts effectively?
