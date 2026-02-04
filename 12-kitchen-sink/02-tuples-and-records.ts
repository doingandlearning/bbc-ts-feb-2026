// Tuples and Records
// Tuples: fixed-length arrays with specific types at each position
// Records: object types with specific keys

// ============================================================================
// Basic Tuples
// ============================================================================

// Basic tuple - fixed length, specific types
type Point = [number, number];
const point: Point = [10, 20];

// Access by index
const x = point[0]; // Type: number
const y = point[1]; // Type: number

// ============================================================================
// Named Tuples (TypeScript 4.0+)
// ============================================================================

// Named tuple - more readable
type UserInfo = [name: string, age: number, email: string];
const user: UserInfo = ["Alice", 30, "alice@example.com"];

// Access by index (same as regular tuple)
const userName = user[0]; // Type: string
const userAge = user[1]; // Type: number

// ============================================================================
// Readonly Tuples
// ============================================================================

// Readonly tuple - cannot modify
type ReadonlyPoint = readonly [number, number];
const readonlyPoint: ReadonlyPoint = [10, 20];
// readonlyPoint[0] = 5; // ❌ Error - readonly

// ============================================================================
// Optional Tuple Elements
// ============================================================================

// Tuple with optional elements
type OptionalTuple = [string, number?];
const opt1: OptionalTuple = ["hello"]; // ✅ OK
const opt2: OptionalTuple = ["hello", 42]; // ✅ OK

// ============================================================================
// Rest Elements in Tuples
// ============================================================================

// Tuple with rest elements
type StringNumberBooleans = [string, number, ...boolean[]];
const tuple1: StringNumberBooleans = ["hello", 42]; // ✅ OK
const tuple2: StringNumberBooleans = ["hello", 42, true]; // ✅ OK
const tuple3: StringNumberBooleans = ["hello", 42, true, false, true]; // ✅ OK

// ============================================================================
// Variadic Tuples (TypeScript 4.0+)
// ============================================================================

// Variadic tuple - spread one tuple into another
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [...T, ...U];

type First = [string, number];
type Second = [boolean];
type Combined = Concat<First, Second>; // [string, number, boolean]

// ============================================================================
// Tuple Inference with Functions
// ============================================================================

// Function that returns a tuple
function getCoordinates(): [number, number] {
  return [10, 20];
}

const [xCoord, yCoord] = getCoordinates(); // Destructuring works!

// Function that returns multiple values as tuple
function divideWithRemainder(a: number, b: number): [number, number] {
  return [Math.floor(a / b), a % b];
}

const [quotient, remainder] = divideWithRemainder(10, 3);
// quotient: 3, remainder: 1

// ============================================================================
// Records: Object Types with Specific Keys
// ============================================================================

// Record<K, T> - object with keys of type K and values of type T
type UserRecord = Record<string, string>;
const users: UserRecord = {
  alice: "Alice Smith",
  bob: "Bob Jones",
  charlie: "Charlie Brown"
};

// Record with union keys
type Status = "pending" | "approved" | "rejected";
type StatusConfig = Record<Status, { color: string; icon: string }>;

const config: StatusConfig = {
  pending: { color: "yellow", icon: "⏳" },
  approved: { color: "green", icon: "✅" },
  rejected: { color: "red", icon: "❌" }
};

// ============================================================================
// Record vs Index Signature
// ============================================================================

// Record syntax
type StringMap = Record<string, string>;

// Equivalent index signature
type StringMapAlt = {
  [key: string]: string;
};

// Both are equivalent, but Record is more concise

// ============================================================================
// Record with Literal Keys
// ============================================================================

// Record with specific literal keys
type BBCRegions = "Belfast" | "Salford" | "Glasgow" | "London" | "Newcastle";
type RegionInfo = Record<BBCRegions, { officeCount: number; timezone: string }>;

const regions: RegionInfo = {
  Belfast: { officeCount: 1, timezone: "GMT" },
  Salford: { officeCount: 2, timezone: "GMT" },
  Glasgow: { officeCount: 1, timezone: "GMT" },
  London: { officeCount: 5, timezone: "GMT" },
  Newcastle: { officeCount: 1, timezone: "GMT" }
};

// ============================================================================
// Practical Examples
// ============================================================================

// Example 1: API Response with Tuple
type ApiResponse<T> = [data: T, status: number, headers: Record<string, string>];

async function fetchWithMetadata<T>(url: string): Promise<ApiResponse<T>> {
  const response = await fetch(url);
  const data = await response.json();
  const headers: Record<string, string> = {};
  response.headers.forEach((value, key) => {
    headers[key] = value;
  });
  return [data, response.status, headers];
}

const [postData, status, headers] = await fetchWithMetadata<Post>("https://api.example.com/post");

// Example 2: Configuration with Record
type FeatureFlags = Record<string, boolean>;

const features: FeatureFlags = {
  darkMode: true,
  notifications: false,
  analytics: true
};

function isFeatureEnabled(feature: string): boolean {
  return features[feature] ?? false;
}

// Example 3: React-style useState Tuple
type UseStateReturn<T> = [T, (value: T) => void];

function useState<T>(initial: T): UseStateReturn<T> {
  let state = initial;
  const setState = (value: T) => {
    state = value;
  };
  return [state, setState];
}

const [count, setCount] = useState(0);
// count: number
// setCount: (value: number) => void

// ============================================================================
// Tuple vs Array
// ============================================================================

// Tuple: fixed length, specific types
type Tuple = [string, number];
const tuple: Tuple = ["hello", 42];

// Array: variable length, same type
type Array = string[];
const array: Array = ["hello", "world", "foo"];

// When to use tuples:
// - Fixed-length data (coordinates, RGB colors)
// - Multiple return values
// - Function parameters with specific positions

// When to use arrays:
// - Variable-length data
// - All elements same type
// - Iteration over items

// ============================================================================
// Key Points
// ============================================================================

// Tuples:
// - Fixed-length arrays with specific types
// - Useful for coordinates, multiple return values
// - Named tuples improve readability
// - Readonly tuples prevent mutation
// - Rest elements allow variable-length tuples

// Records:
// - Object types with specific key/value types
// - More concise than index signatures
// - Useful for configuration objects
// - Can use union types for keys
// - Type-safe object creation

interface Post {
  id: number;
  title: string;
}

export {};
