// Const Type Parameters (TypeScript 5.0+)
// Preserves literal types in generic functions without needing `as const`

// ============================================================================
// Basic Const Type Parameters
// ============================================================================

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

// ============================================================================
// Const Type Parameters with Objects
// ============================================================================

// Without const - object properties widen
function processConfig<T>(config: T): T {
  return config;
}

const config1 = processConfig({
  apiUrl: "https://api.example.com",
  timeout: 5000
});
// Type: { apiUrl: string; timeout: number } (widened)

// With const - object properties stay literal
function processConfigConst<const T>(config: T): T {
  return config;
}

const config2 = processConfigConst({
  apiUrl: "https://api.example.com",
  timeout: 5000
});
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }
// Literal types preserved!

// ============================================================================
// Const Type Parameters with Arrays
// ============================================================================

// Without const - array widens
function processArray<T>(items: T[]): T[] {
  return items;
}

const arr1 = processArray(["red", "green", "blue"]);
// Type: string[] (widened)

// With const - array stays as tuple with literals
function processArrayConst<const T extends readonly unknown[]>(items: T): T {
  return items;
}

const arr2 = processArrayConst(["red", "green", "blue"]);
// Type: readonly ["red", "green", "blue"] (tuple with literal types!)

// ============================================================================
// Const Type Parameters vs as const
// ============================================================================

// Old way: as const assertion
const oldWay = identity(["red", "green"] as const);
// Type: readonly ["red", "green"]
// Requires explicit `as const` at call site

// New way: const type parameter
const newWay = identityConst(["red", "green"]);
// Type: readonly ["red", "green"]
// No `as const` needed - function handles it!

// ============================================================================
// Const Type Parameters with Constraints
// ============================================================================

// Const type parameter with constraint
function processString<const T extends string>(value: T): T {
  return value;
}

const str1 = processString("hello");
// Type: "hello" (literal preserved)

const str2 = processString("world" as string);
// Type: string (widened because input was widened)

// ============================================================================
// Const Type Parameters with Objects and Constraints
// ============================================================================

interface Config {
  apiUrl: string;
  timeout: number;
}

// Const type parameter with interface constraint
function createConfig<const T extends Config>(config: T): T {
  return config;
}

const config = createConfig({
  apiUrl: "https://api.example.com",
  timeout: 5000
});
// Type: { readonly apiUrl: "https://api.example.com"; readonly timeout: 5000 }
// Literal types preserved while still validating against Config!

// ============================================================================
// Const Type Parameters with Arrays and Constraints
// ============================================================================

// Const type parameter for arrays
function createTuple<const T extends readonly unknown[]>(items: T): T {
  return items;
}

const tuple1 = createTuple([1, 2, 3]);
// Type: readonly [1, 2, 3]

const tuple2 = createTuple(["hello", "world"]);
// Type: readonly ["hello", "world"]

// ============================================================================
// Practical Examples
// ============================================================================

// Example 1: API Endpoint Configuration
function createEndpoint<const T extends string>(path: T): T {
  return path;
}

const usersEndpoint = createEndpoint("/api/users");
// Type: "/api/users" (literal!)

const postsEndpoint = createEndpoint("/api/posts");
// Type: "/api/posts" (literal!)

// Example 2: Status Configuration
function createStatus<const T extends string>(status: T): T {
  return status;
}

const status = createStatus("pending");
// Type: "pending" (literal!)

// Example 3: Theme Configuration
function createTheme<const T extends Record<string, string>>(theme: T): T {
  return theme;
}

const theme = createTheme({
  primary: "#3b82f6",
  secondary: "#64748b",
  success: "#10b981"
});
// Type: { readonly primary: "#3b82f6"; readonly secondary: "#64748b"; readonly success: "#10b981" }
// All literal types preserved!

// Example 4: Feature Flags
function createFeatures<const T extends Record<string, boolean>>(features: T): T {
  return features;
}

const features = createFeatures({
  darkMode: true,
  analytics: false,
  beta: true
});
// Type: { readonly darkMode: true; readonly analytics: false; readonly beta: true }
// Literal boolean values preserved!

// ============================================================================
// Const Type Parameters vs Regular Generics
// ============================================================================

// Regular generic - widens
function wrap<T>(value: T) {
  return { value };
}

const wrapped1 = wrap("hello");
// wrapped1.value: string

// Const generic - preserves literals
function wrapConst<const T>(value: T) {
  return { value };
}

const wrapped2 = wrapConst("hello");
// wrapped2.value: "hello" (literal!)

// ============================================================================
// Combining Const Type Parameters with Other Features
// ============================================================================

// Const type parameter + satisfies
interface Theme {
  primary: string;
  secondary: string;
}

function createThemeValidated<const T extends Theme>(theme: T): T {
  return theme;
}

const themeValidated = createThemeValidated({
  primary: "#3b82f6",
  secondary: "#64748b"
} satisfies Theme);
// Type: { readonly primary: "#3b82f6"; readonly secondary: "#64748b" }
// Literal types + type validation!

// ============================================================================
// When to Use Const Type Parameters
// ============================================================================

// Use const type parameters when:
// 1. You want to preserve literal types from function arguments
// 2. You're creating configuration objects
// 3. You want tuple types from array arguments
// 4. You want to avoid `as const` at call sites

// Don't use when:
// - You want types to widen (for flexibility)
// - You need mutable types
// - You're working with types that should be general

// ============================================================================
// Key Points
// ============================================================================

// 1. `const` type parameters preserve literal types
// 2. No need for `as const` at call site
// 3. Works with objects, arrays, and primitives
// 4. Can combine with constraints
// 5. Makes functions more type-preserving
// 6. TypeScript 5.0+ feature
// 7. Useful for configuration functions and builders

export {};
