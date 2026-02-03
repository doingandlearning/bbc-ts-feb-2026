# TypeScript Migration Guide: From JavaScript to TypeScript

This guide demonstrates how to gradually migrate JavaScript code to TypeScript, using real examples from the course materials. The migration process is incremental and can be applied to existing JavaScript projects.

## Migration Strategy Overview

The migration follows a **gradual, incremental approach** that allows teams to:
- Migrate files one at a time
- Maintain working code throughout the process
- Add type safety progressively
- Learn TypeScript concepts incrementally

---

## Phase 1: Initial Setup & Type Checking

### Step 1: Add TypeScript Configuration

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "allowJs": true,        // Allow JavaScript files
    "checkJs": true,        // Type check JavaScript files
    "noEmit": true          // Don't emit files, just type check
  },
  "include": ["**/*.js", "**/*.ts"],
  "exclude": ["node_modules"]
}
```

### Step 2: Add Type Checking to JavaScript Files

```javascript
// @ts-check - Add this comment to enable type checking
var PI = 3.14;

function getCircleArea(radius) {
  return radius * radius * PI;
}
```

**Benefits:**
- Immediate type checking without changing file extensions
- Gradual introduction to TypeScript concepts
- No breaking changes to existing code

---

## Phase 2: Basic Type Annotations

### Step 3: Add Explicit Type Annotations

```javascript
// Before: Implicit types
function getCircleArea(radius) {
  return radius * radius * PI;
}

// After: Explicit types
function getCircleArea(radius: number): number {
  return radius * radius * PI;
}
```

### Step 4: Define Basic Interfaces

```typescript
// shape.types.d.ts
export interface Shape {
  area?: number;
  type: "circle" | "rectangle" | "rightTriangle" | "square";
}

export interface Circle extends Shape {
  type: "circle";
  radius: number;
}
```

**Key Principles:**
- Start with function parameters and return types
- Define interfaces for complex objects
- Use union types for string literals
- Make optional properties explicit with `?`

---

## Phase 3: Advanced Type Safety

### Step 5: Implement Discriminated Unions

```typescript
// Before: Loose object shapes
function getArea(shape) {
  switch (shape.type) {
    case "circle":
      return getCircleArea(shape.radius);
    // No type safety - could access wrong properties
  }
}

// After: Discriminated unions
type ValidShape = Circle | Rectangle | Square | RightTriangle;

function getArea(shape: ValidShape): number {
  switch (shape.type) {
    case "circle":
      // TypeScript knows this is Circle
      return getCircleArea(shape);
    case "rectangle":
      // TypeScript knows this is Rectangle
      return getRectangleArea(shape);
  }
}
```

### Step 6: Add Type Guards

```typescript
function isCircle(shape: Shape): shape is Circle {
  return shape.type === "circle";
}

function isShape(shape: any): shape is Shape {
  return ["circle", "rectangle", "rightTriangle", "square"].includes(shape.type);
}
```

---

## Phase 4: Modern JavaScript Features

### Step 7: Replace `var` with `const`/`let`

```javascript
// Before: var declarations
var database = [];
var user = { id: 1, name: "John" };

// After: const/let
const database: User[] = [];
const user: User = { id: 1, name: "John" };
```

### Step 8: Use Modern Array Methods

```javascript
// Before: Manual loops
function findUser(username) {
  for (var i = 0; i < database.length; i++) {
    if (database[i].username === username) {
      return database[i];
    }
  }
  return null;
}

// After: Modern methods
function findUser(username: string): User | null {
  return database.find(user => user.username === username) || null;
}
```

### Step 9: Use Destructuring

```typescript
// Before: Manual property access
function getRectangleArea(rectangle: Rectangle): number {
  const length = rectangle.length;
  const width = rectangle.width;
  return length * width;
}

// After: Destructuring
function getRectangleArea(rectangle: Rectangle): number {
  const { length, width } = rectangle;
  return length * width;
}
```

---

## Phase 5: File Organization & Modules

### Step 10: Separate Types from Implementation

```typescript
// shape.types.d.ts - Type definitions only
export interface User {
  id: number;
  username: string;
  age: number;
  email: string;
  created: Date;
}

// userModel.ts - Data models
export const database: UserDatabase = [];
export type UserDatabase = User[];

// userOperations.ts - Business logic
export function addUser(username: string, age: number, email: string): User {
  const user: User = {
    id: database.length + 1,
    username,
    age,
    email,
    created: new Date(),
  };
  database.push(user);
  return user;
}
```

### Step 11: Use ES6 Modules

```typescript
// Before: Global variables
var database = [];

// After: Module exports
export const database: UserDatabase = [];
export function addUser(username: string, age: number, email: string): User {
  // Implementation
}
```

---

## Phase 6: Advanced TypeScript Features

### Step 12: Use Generic Types

```typescript
// Before: Any type
function processData(data: any): any {
  return data;
}

// After: Generic types
function processData<T>(data: T): T {
  return data;
}
```

### Step 13: Implement Error Handling

```typescript
// Before: No error handling
function deleteUser(id: number) {
  const index = database.findIndex(user => user.id === id);
  return database.splice(index, 1);
}

// After: Proper error handling
function deleteUser(id: number): User | null {
  const index = database.findIndex(user => user.id === id);
  if (index > -1) {
    const [deletedUser] = database.splice(index, 1);
    return deletedUser;
  }
  return null;
}
```

---

## Migration Best Practices

### 1. **Start Small**
- Begin with one file or one function
- Add `@ts-check` to JavaScript files first
- Gradually add type annotations

### 2. **Use Strict Mode Gradually**
```json
{
  "compilerOptions": {
    "strict": false,           // Start with false
    "noImplicitAny": true,     // Enable one by one
    "strictNullChecks": true,  // Then this
    "strictFunctionTypes": true // Finally this
  }
}
```

### 3. **Leverage Type Inference**
```typescript
// Let TypeScript infer when possible
const users = []; // TypeScript infers any[]
const users: User[] = []; // Explicit when needed
```

### 4. **Use Type Assertions Sparingly**
```typescript
// Prefer type guards
function isUser(obj: any): obj is User {
  return obj && typeof obj.id === 'number';
}

// Over type assertions
const user = obj as User; // Less safe
```

### 5. **Handle External Libraries**
```typescript
// Create declaration files for untyped libraries
declare module 'untyped-library' {
  export function someFunction(param: string): number;
}
```

---

## Common Migration Challenges & Solutions

### Challenge 1: Dynamic Object Properties
```javascript
// Before: Dynamic properties
obj[propertyName] = value;

// After: Index signatures
interface DynamicObject {
  [key: string]: any;
}
```

### Challenge 2: Function Overloading
```typescript
// Before: Multiple function signatures
function process(data) {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return data.toString();
}

// After: Function overloads
function process(data: string): string;
function process(data: number): string;
function process(data: string | number): string {
  if (typeof data === 'string') {
    return data.toUpperCase();
  }
  return data.toString();
}
```

### Challenge 3: Legacy Callbacks
```typescript
// Before: Callback patterns
function fetchData(callback) {
  // Implementation
}

// After: Promises/Async
async function fetchData(): Promise<Data> {
  // Implementation
}
```

---

## Migration Checklist

### Phase 1: Setup
- [ ] Add `tsconfig.json`
- [ ] Install TypeScript dependencies
- [ ] Add `@ts-check` to JavaScript files
- [ ] Fix immediate type errors

### Phase 2: Basic Types
- [ ] Add function parameter types
- [ ] Add return type annotations
- [ ] Define basic interfaces
- [ ] Replace `any` with specific types

### Phase 3: Advanced Types
- [ ] Implement discriminated unions
- [ ] Add type guards
- [ ] Use union types for string literals
- [ ] Implement exhaustive checking

### Phase 4: Modern JavaScript
- [ ] Replace `var` with `const`/`let`
- [ ] Use modern array methods
- [ ] Implement destructuring
- [ ] Use template literals

### Phase 5: Organization
- [ ] Separate types from implementation
- [ ] Use ES6 modules
- [ ] Organize files by feature
- [ ] Create declaration files

### Phase 6: Advanced Features
- [ ] Implement generic types
- [ ] Add proper error handling
- [ ] Use utility types
- [ ] Implement advanced patterns

---

## Tools & Resources

### Essential Tools
- **TypeScript Compiler**: `tsc --noEmit` for type checking
- **ESLint**: `@typescript-eslint/parser` for linting
- **Prettier**: Code formatting
- **VS Code**: Excellent TypeScript support

### Useful Commands
```bash
# Type check without emitting files
tsc --noEmit

# Watch mode for development
tsc --watch --noEmit

# Generate declaration files
tsc --declaration --emitDeclarationOnly
```

### Migration Scripts
```json
{
  "scripts": {
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --watch --noEmit",
    "migrate": "tsc --allowJs --checkJs --noEmit"
  }
}
```

---

## Conclusion

This migration guide provides a structured approach to converting JavaScript codebases to TypeScript. The key is to:

1. **Start gradually** - Don't try to migrate everything at once
2. **Maintain functionality** - Keep code working throughout the process
3. **Learn incrementally** - Add TypeScript features progressively
4. **Use tooling** - Leverage TypeScript's excellent tooling support
5. **Focus on benefits** - Emphasize type safety, better IDE support, and maintainability

The migration process should be viewed as an investment in code quality, developer experience, and long-term maintainability.
