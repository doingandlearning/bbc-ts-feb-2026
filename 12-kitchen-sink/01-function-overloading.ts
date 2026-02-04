// Function Overloading
// Allows you to define multiple function signatures for the same function name

// ============================================================================
// Basic Function Overloading
// ============================================================================

// Step 1: Define overload signatures (what callers see)
function getValue(value: string): string;
function getValue(value: number): number;
function getValue(value: boolean): boolean;

// Step 2: Implementation signature (must be compatible with all overloads)
function getValue(value: string | number | boolean): string | number | boolean {
  return value;
}

// Usage - TypeScript picks the correct overload
const strVal = getValue("hello"); // Type: string
const numVal = getValue(42); // Type: number
const boolVal = getValue(true); // Type: boolean

// ============================================================================
// Overloading with Different Return Types Based on Input
// ============================================================================

// Overload signatures
function process(input: string): string[];
function process(input: number): number[];
function process(input: boolean): boolean;

// Implementation
function process(input: string | number | boolean): string[] | number[] | boolean {
  if (typeof input === "string") {
    return input.split("");
  } else if (typeof input === "number") {
    return [input];
  } else {
    return input;
  }
}

const chars = process("hello"); // Type: string[]
const nums = process(42); // Type: number[]
const bool = process(true); // Type: boolean

// ============================================================================
// Overloading with Different Parameter Counts
// ============================================================================

// Overload signatures
function createUser(name: string): { name: string };
function createUser(name: string, email: string): { name: string; email: string };
function createUser(name: string, email: string, age: number): { name: string; email: string; age: number };

// Implementation
function createUser(name: string, email?: string, age?: number) {
  if (age !== undefined) {
    return { name, email: email!, age };
  } else if (email !== undefined) {
    return { name, email };
  } else {
    return { name };
  }
}

const user1 = createUser("Alice"); // Type: { name: string }
const user2 = createUser("Bob", "bob@example.com"); // Type: { name: string; email: string }
const user3 = createUser("Charlie", "charlie@example.com", 30); // Type: { name: string; email: string; age: number }

// ============================================================================
// Overloading with Array vs Single Item
// ============================================================================

// Overload signatures
function formatItems(item: string): string;
function formatItems(items: string[]): string[];

// Implementation
function formatItems(itemOrItems: string | string[]): string | string[] {
  if (Array.isArray(itemOrItems)) {
    return itemOrItems.map(item => item.toUpperCase());
  } else {
    return itemOrItems.toUpperCase();
  }
}

const single = formatItems("hello"); // Type: string
const multiple = formatItems(["hello", "world"]); // Type: string[]

// ============================================================================
// Real-World Example: API Request Handler
// ============================================================================

// Overload signatures
function fetchData(endpoint: "users"): Promise<User[]>;
function fetchData(endpoint: "posts"): Promise<Post[]>;
function fetchData(endpoint: "comments"): Promise<Comment[]>;
function fetchData(endpoint: string): Promise<unknown>;

// Implementation
async function fetchData(endpoint: string): Promise<unknown> {
  const response = await fetch(`/api/${endpoint}`);
  return response.json();
}

interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
}

interface Comment {
  id: number;
  text: string;
}

// Usage - TypeScript knows the return type based on endpoint
const users = await fetchData("users"); // Type: Promise<User[]>
const posts = await fetchData("posts"); // Type: Promise<Post[]>
const comments = await fetchData("comments"); // Type: Promise<Comment[]>

// ============================================================================
// Common Patterns
// ============================================================================

// Pattern 1: String vs Number handling
function parse(input: string): number;
function parse(input: number): string;
function parse(input: string | number): number | string {
  if (typeof input === "string") {
    return parseInt(input, 10);
  } else {
    return input.toString();
  }
}

// Pattern 2: Optional vs Required parameters
function configure(options: { required: true }): RequiredConfig;
function configure(options: { required?: false }): OptionalConfig;
function configure(options: { required?: boolean }): RequiredConfig | OptionalConfig {
  // Implementation
  return {} as any;
}

interface RequiredConfig {
  value: string;
}

interface OptionalConfig {
  value?: string;
}

// ============================================================================
// Key Points
// ============================================================================

// 1. Overload signatures come first (what callers see)
// 2. Implementation signature comes last (must be compatible)
// 3. TypeScript picks the correct overload based on arguments
// 4. More specific overloads should come before general ones
// 5. Return types can differ based on input types
// 6. Useful for APIs, DOM methods, and library functions

export {};
