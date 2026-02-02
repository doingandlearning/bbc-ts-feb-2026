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
