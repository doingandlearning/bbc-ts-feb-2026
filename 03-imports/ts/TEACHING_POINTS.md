# TypeScript Module System (03-imports/ts)

This directory demonstrates TypeScript's module system configuration and how it interacts with different JavaScript module targets (ESM/CJS).

---

## 🎯 Core Learning Objectives

1. Understand how TypeScript compiles modules for different targets
2. Learn the relationship between `tsconfig.json` settings and runtime module behavior
3. Master type-only imports and their compilation behavior
4. Understand file extension requirements in TypeScript imports
5. See how types are erased but module syntax is preserved

---

## 📋 Teaching Points

### 1. **Module System Configuration (`module: "nodenext"`)**

**Key Concept:** The `module` setting in `tsconfig.json` controls how TypeScript emits JavaScript module syntax.

**Current Configuration:**

```json
{
  "module": "nodenext",
  "moduleResolution": "nodenext" // implicit with nodenext
}
```

**Teaching Points:**

- `nodenext` = Node.js ESM-aware module system (TypeScript 4.7+)
- Requires `package.json` with `"type": "module"` for ESM behavior
- Emits ES modules that Node.js can run directly
- Requires `.js` extensions in import statements (even though source is `.ts`)

**Why `.js` extensions in TypeScript source?**

```typescript
// src/app.ts
import { location } from "./util.js"; // ✅ Note: .js extension!
```

- TypeScript understands `.js` refers to the compiled `.ts` file
- Node.js ESM requires explicit extensions at runtime
- TypeScript maps `.js` → `.ts` during compilation
- The emitted code keeps `.js` for Node.js to resolve

**Demonstration:**

```bash
# Show source (app.ts) has .js extension
# Show compiled output (dist/app.js) also has .js extension
# Explain: TypeScript preserves the extension for Node.js
```

---

### 2. **Type-Only Imports (`import type`)**

**Key Concept:** Type-only imports are erased at compile time and don't create runtime dependencies.

**Example from `src/app.ts`:**

```typescript
import type { VALID_URL_VALUE } from "./types.js";
```

**Teaching Points:**

- `import type` = compile-time only, no runtime code generated
- Used when you only need types, not runtime values
- Reduces bundle size and avoids circular dependency issues
- The compiled output shows: `types.js` is empty (`export {};`)

**Compiled Output (`dist/app.js`):**

```javascript
// Notice: NO import from types.js!
// The type import was completely erased
```

**Comparison:**

```typescript
// Runtime import (creates dependency)
import { location } from "./util.js";

// Type-only import (erased)
import type { VALID_URL_VALUE } from "./types.js";
```

**When to use:**

- Importing types/interfaces only
- Avoiding runtime dependencies
- Breaking circular dependencies
- Library type definitions

---

### 3. **JSON Imports with `with { type: "json" }`**

**Key Concept:** TypeScript 5.0+ supports JSON imports with explicit type annotation.

**Example from `src/app.ts`:**

```typescript
import data from "./user.json" with { type: "json" };
```

**Teaching Points:**

- Modern syntax for importing JSON files
- `with { type: "json" }` tells TypeScript this is JSON data
- TypeScript infers the JSON structure automatically
- Requires `module: "nodenext"` or `module: "node16"` (ESM)
- Compiles to: `import data from "./user.json" with { type: "json" };`

**Compiled Output:**

```javascript
import data from "./user.json" with { type: "json" };
// Preserved as-is for Node.js ESM
```

**Alternative (older):**

```typescript
// Older approach (requires resolveJsonModule: true)
import * as data from "./user.json";
```

**Why the new syntax?**

- Explicit about import type
- Better type inference
- Aligns with TC39 proposal
- Clearer intent

---

### 4. **Type Erasure vs Module Preservation**

**Key Concept:** TypeScript erases types but preserves module syntax.

**Source (`src/app.ts`):**

```typescript
import type { VALID_URL_VALUE } from "./types.js";

let field1: VALID_URL_VALUE = "12";
```

**Compiled Output (`dist/app.js`):**

```javascript
// Type import erased - no import statement
let field1 = "12"; // Type annotation removed
```

**Teaching Points:**

- Types are compile-time only
- Module syntax (`import`/`export`) is preserved
- Runtime code has no type information
- Module structure matches source (for ESM)

**Demonstration:**

1. Show `src/types.ts` - has type definitions
2. Show `dist/types.js` - empty file (`export {};`)
3. Explain: Type-only file = no runtime code needed

---

### 5. **File Extension Requirements**

**Key Concept:** Node.js ESM requires explicit file extensions in imports.

**TypeScript Source:**

```typescript
// ✅ Correct - .js extension (refers to compiled output)
import { location } from "./util.js";

// ❌ Wrong - no extension
import { location } from "./util";

// ❌ Wrong - .ts extension (doesn't exist at runtime)
import { location } from "./util.ts";
```

**Teaching Points:**

- Write `.js` in TypeScript source even though file is `.ts`
- TypeScript maps `.js` → `.ts` during type checking
- Node.js needs `.js` at runtime to resolve modules
- This is ESM requirement, not TypeScript requirement

**Comparison with CommonJS:**

```javascript
// CJS - no extensions needed
const { location } = require("./utils");

// ESM - extensions required
import { location } from "./utils.js";
```

---

### 6. **Module Resolution: `nodenext` vs `node` vs `commonjs`**

**Key Concept:** Different `module` settings produce different output.

**Current Setup:**

```json
{
  "module": "nodenext",
  "moduleResolution": "nodenext" // implicit
}
```

**Teaching Points:**

| Setting      | Output Format                         | Extensions Required | Use Case                   |
| ------------ | ------------------------------------- | ------------------- | -------------------------- |
| `"commonjs"` | CommonJS (`require`/`module.exports`) | No                  | Old Node.js, CJS libraries |
| `"node16"`   | ESM (with Node.js 16+ rules)          | Yes (`.js`)         | Node.js 16+ ESM            |
| `"nodenext"` | ESM (latest Node.js rules)            | Yes (`.js`)         | **Current Node.js ESM** ✅ |
| `"esnext"`   | ESM (browser-style)                   | No                  | Bundlers (webpack, vite)   |

**Why `nodenext`?**

- Latest Node.js ESM support
- Best for new projects
- Handles `.mts`/`.cts` files
- Supports `package.json` `exports` field

---

### 7. **`verbatimModuleSyntax: true`**

**Key Concept:** Preserves import/export syntax exactly as written.

**Current Configuration:**

```json
{
  "verbatimModuleSyntax": true
}
```

**Teaching Points:**

- TypeScript doesn't rewrite `import`/`export` statements
- Preserves `import type` vs regular `import`
- Useful for ESM workflows
- Ensures output matches source intent

**Without `verbatimModuleSyntax`:**

- TypeScript might inline or rewrite imports
- Can cause issues with ESM bundlers
- Less predictable output

**With `verbatimModuleSyntax`:**

- Predictable output
- Better for ESM
- Clear separation of type vs value imports

---

### 8. **`isolatedModules: true`**

**Key Concept:** Ensures each file can be compiled independently.

**Current Configuration:**

```json
{
  "isolatedModules": true
}
```

**Teaching Points:**

- Each file must be valid on its own
- Can't rely on type-only imports being merged
- Required for tools like `tsx`, Babel, `esbuild`
- Catches potential issues early

**Why it matters:**

- Tools compile files individually
- Type-only imports must be explicit
- Prevents build tool issues

---

### 9. **Comparison: CJS vs ESM vs TypeScript**

**Demonstration Structure:**

**CommonJS (`03-imports/cjs/`):**

```javascript
// utils.js
module.exports = { location, company };

// app.js
const { location } = require("./utils");
```

**ESM (`03-imports/esm/`):**

```javascript
// utils.js
export { location, company };

// app.js
import { location } from "./utils.js"; // Extension required
```

**TypeScript (`03-imports/ts/`):**

```typescript
// util.ts
export { location, company };

// app.ts
import { location } from "./util.js"; // .js extension, but .ts file!
```

**Teaching Points:**

- Show the progression: CJS → ESM → TypeScript
- Explain how TypeScript bridges the gap
- Demonstrate that TypeScript compiles to ESM in this setup
- Show compiled output matches ESM pattern

---

### 10. **Type Import from External Package**

**Example from `src/types.ts`:**

```typescript
import type { Url } from "url";
```

**Teaching Points:**

- Can import types from Node.js built-ins
- `import type` works with any package
- No runtime dependency created
- Useful for type-only dependencies

**Compiled Output:**

```javascript
// Empty - type import erased
export {};
```

---

### 11. **Package.json `"type": "module"` Requirement**

**Current Configuration:**

```json
{
  "type": "module"
}
```

**Teaching Points:**

- Tells Node.js to treat `.js` files as ESM
- Required for `module: "nodenext"` to work correctly
- Without it, Node.js treats files as CommonJS
- Must match `tsconfig.json` `module` setting

**Mismatch Example:**

```json
// package.json
{ "type": "module" }

// tsconfig.json
{ "module": "commonjs" } // ❌ Mismatch!
```

**Result:** Runtime errors, module resolution issues

---

### 12. **Source Maps**

**Current Configuration:**

```json
{
  "sourceMap": true
}
```

**Teaching Points:**

- Generates `.js.map` files
- Maps compiled code back to TypeScript source
- Essential for debugging
- Shows original TypeScript in stack traces

**Files Generated:**

- `app.js.map`
- `util.js.map`
- `types.js.map`

---

## 🔄 Module Target Comparison Table

| Feature              | CommonJS                 | ESM (Pure JS)                    | TypeScript (nodenext)                                  |
| -------------------- | ------------------------ | -------------------------------- | ------------------------------------------------------ |
| **Import Syntax**    | `require()`              | `import`                         | `import`                                               |
| **Export Syntax**    | `module.exports`         | `export`                         | `export`                                               |
| **File Extensions**  | Not required             | Required (`.js`)                 | Required (`.js` in source)                             |
| **Type Imports**     | N/A                      | N/A                              | `import type`                                          |
| **JSON Imports**     | `require('./data.json')` | `import data from './data.json'` | `import data from './data.json' with { type: "json" }` |
| **Runtime Behavior** | Synchronous              | Static analysis                  | Compiles to ESM                                        |
| **Type Erasure**     | N/A                      | N/A                              | Types removed at compile time                          |

---

## 🎓 Practical Exercises

### Exercise 1: Extension Requirements

**Task:** Show what happens if you remove `.js` extension

```typescript
// Try this (will error)
import { location } from "./util";
```

**Expected:** TypeScript error about missing extension

### Exercise 2: Type Import Erasure

**Task:** Compare compiled output with/without `import type`

```typescript
// Regular import
import { VALID_URL_VALUE } from "./types.js";

// Type-only import
import type { VALID_URL_VALUE } from "./types.js";
```

**Expected:** First creates runtime import, second is erased

### Exercise 3: Module Target Comparison

**Task:** Change `module` to `"commonjs"` and rebuild
**Expected:** Output uses `require()` instead of `import`

### Exercise 4: JSON Import

**Task:** Try importing JSON without `with { type: "json" }`
**Expected:** May need `resolveJsonModule: true` or different syntax

---

## 🚨 Common Pitfalls & Solutions

### Pitfall 1: Missing `.js` Extension

**Error:** `Cannot find module './util'`
**Solution:** Add `.js` extension: `import { x } from "./util.js"`

### Pitfall 2: Using `.ts` Extension

**Error:** Module not found at runtime
**Solution:** Use `.js` extension (TypeScript maps it)

### Pitfall 3: Type Import Creating Runtime Dependency

**Problem:** Unnecessary runtime import
**Solution:** Use `import type` for type-only imports

### Pitfall 4: Module/package.json Mismatch

**Error:** `ERR_REQUIRE_ESM` or module resolution issues
**Solution:** Align `tsconfig.module` with `package.json.type`

### Pitfall 5: JSON Import Without Type Annotation

**Error:** Type errors or runtime issues
**Solution:** Use `with { type: "json" }` syntax

---

## 📚 Key Takeaways

1. **TypeScript compiles modules, not just types** - Module syntax matters
2. **File extensions are required for ESM** - Write `.js` in TypeScript source
3. **Type imports are erased** - `import type` creates no runtime code
4. **Module settings must match runtime** - `tsconfig.module` ↔ `package.json.type`
5. **`nodenext` is modern standard** - Use for new Node.js ESM projects
6. **Types are compile-time only** - No type information at runtime
7. **JSON imports need explicit type** - `with { type: "json" }` syntax

---

## 🔗 Related Concepts

- **Section 2 (Init):** How `tsconfig.json` is configured
- **Section 3 (Imports):** CJS vs ESM comparison
- **Section 6 (Migration):** Mixing JS and TS modules
- **Section 10 (Type Composition):** Type-only imports in practice

---

## 📝 Notes for Instructors

- **Demo Order:**
  1. Show CJS example (`03-imports/cjs/`)
  2. Show ESM example (`03-imports/esm/`)
  3. Show TypeScript example (`03-imports/ts/`)
  4. Compare compiled outputs
  5. Explain type erasure
  6. Demonstrate `import type`

- **Key Files to Show:**
  - `src/app.ts` - Source with `.js` extensions
  - `dist/app.js` - Compiled output
  - `dist/types.js` - Empty (type-only file)
  - `tsconfig.json` - Module configuration
  - `package.json` - `"type": "module"`

- **Common Questions:**
  - "Why `.js` if file is `.ts`?" → Node.js needs it at runtime
  - "Where do types go?" → Erased at compile time
  - "What's the difference from ESM?" → TypeScript adds types, compiles to ESM
  - "Can I use CommonJS?" → Yes, change `module` setting
