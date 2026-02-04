# Exercise Extensions: Advanced Type Composition 🚀

> **Optional Extensions** - Complete these if you finish the core exercise early

These extensions explore additional type composition concepts from Section 10. Each extension builds on what you learned in the core exercise and introduces new techniques.

**Time Estimates:**
- Extension 1: 5-10 minutes
- Extension 2: 5-10 minutes (Advanced)
- Extension 3: 5-10 minutes (Advanced)

**Note:** These are optional! Complete the core exercise first, then try these if you have time.

---

## Extension 1: Utility Types (Recommended)

**Objective:** Learn to use TypeScript's built-in utility types to create new types from existing ones.

**Prerequisites:** Complete the core exercise (you should have `Post` and `Comment` interfaces).

### Task 1: Create a Post Preview with `Pick`

**Goal:** Create a type that only includes `title` and `body` from `Post`.

**Steps:**
1. Use the `Pick` utility type to create a `PostPreview` type
2. `Pick` takes two arguments: the source type and a union of keys to select
3. Select only `"title"` and `"body"` from `Post`
4. Create a variable of type `PostPreview` and assign it a post object
5. Try accessing properties - which ones are available? Which ones cause errors?

**Hint:** The syntax is `Pick<SourceType, "key1" | "key2">`

**Why this is useful:** Creating preview types reduces the data you need to pass around, improving performance and clarity.

---

### Task 2: Create an Update Type with `Partial`

**Goal:** Create a type for updating posts where all properties are optional.

**Steps:**
1. Use the `Partial` utility type to create an `UpdatePost` type
2. `Partial` makes all properties of a type optional
3. Create a function `updatePost(id: number, updates: UpdatePost)` that accepts partial updates
4. Test it by calling `updatePost(1, { title: "New Title" })` - notice you don't need all properties
5. Try calling it with an empty object `{}` - does it work?

**Hint:** The syntax is `Partial<YourType>`

**Why this is useful:** Update operations rarely need all fields - `Partial` makes this type-safe.

---

### Task 3: Create a Public Post with `Omit`

**Goal:** Create a type that excludes sensitive fields like `userId`.

**Steps:**
1. Use the `Omit` utility type to create a `PublicPost` type
2. `Omit` takes two arguments: the source type and keys to remove
3. Remove `"userId"` from `Post` to create a public-facing type
4. Create a function `getPublicPost(post: Post): PublicPost` that returns a public version
5. Try accessing `userId` on a `PublicPost` - what happens?

**Hint:** The syntax is `Omit<SourceType, "key1" | "key2">`

**Why this is useful:** Removing sensitive fields before sending data to clients.

---

### Task 4: Combine Utility Types

**Goal:** Create a type that combines multiple utility types.

**Steps:**
1. Create a `PostSummary` type that:
   - Uses `Pick` to select `id`, `title`, and `body`
   - Uses `Omit` to remove `userId` (if it's still there)
   - Uses `Readonly` to make it immutable
2. Try modifying a `PostSummary` object - what happens?

**Hint:** You can chain utility types: `Readonly<Pick<Post, "id" | "title">>`

**Further Learning:** Check out `src/03-utility.ts` for more utility type examples including `Required`, `Awaited`, and combinations.

---

## Extension 2: Conditional Types (Advanced)

**Objective:** Learn to create types with conditional logic that change based on input types.

**Prerequisites:** Complete Extension 1 (understanding utility types helps).

### Task 1: Handle Single vs Array Responses

**Goal:** Create a type that adds different properties based on whether the data is an array.

**Steps:**
1. Create a conditional type `ApiResponse<T>` that:
   - If `T` extends an array (`T extends any[]`), return `{ data: T; count: number }`
   - Otherwise, return `{ data: T }`
2. Test it with:
   - `ApiResponse<Post>` - should give you `{ data: Post }`
   - `ApiResponse<Comment[]>` - should give you `{ data: Comment[]; count: number }`
3. Create variables of these types and see what properties are available

**Hint:** The syntax is `T extends Condition ? TypeIfTrue : TypeIfFalse`

**Why this is useful:** APIs often return different shapes for single items vs arrays.

---

### Task 2: Create a Flexible Update Type

**Goal:** Create a type that makes some fields required and others optional.

**Steps:**
1. Look at the `PartialWithRequired` example in `src/04-conditional.ts`
2. Create your own version: `UpdatePostWithRequired<T, K>`
   - Makes all properties optional (`Partial<T>`)
   - But makes specific keys required (`Required<Pick<T, K>>`)
3. Use it to create `UpdatePostTitleRequired` where `title` is required but other fields are optional
4. Test it - can you create an update object without `title`? What about without `body`?

**Hint:** Combine `Partial`, `Pick`, and `Required` with intersection types (`&`)

**Further Learning:** Check out `src/04-conditional.ts` for more conditional type patterns.

---

## Extension 3: Mapped Types & `keyof` (Advanced)

**Objective:** Understand how utility types work under the hood and create your own type transformations.

**Prerequisites:** Complete Extensions 1 and 2 (understanding utility types and conditionals).

### Task 1: Explore `keyof` Operator

**Goal:** Understand how to get all keys of a type as a union.

**Steps:**
1. Create a type `PostKeys` using `keyof Post`
2. Hover over it - what type do you see? (Should be `"id" | "title" | "body" | "userId"`)
3. Create a function `getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`
   - This function safely gets a property from an object
   - The return type `T[K]` is an indexed access type
4. Test it: `getProperty(post, "title")` - what type is returned?
5. Try `getProperty(post, "invalid")` - what error do you get?

**Hint:** `keyof T` gives you all keys as a union type, `T[K]` gets the type of property `K`

**Why this is useful:** `keyof` is the foundation for many utility types and type-safe property access.

---

### Task 2: Create a Mapped Type

**Goal:** Create your own utility type using mapped types.

**Steps:**
1. Create a type `OptionalPost` using mapped types:
   ```typescript
   type OptionalPost = {
     [K in keyof Post]?: Post[K];
   };
   ```
2. Compare this to `Partial<Post>` - are they the same?
3. Create a type `ReadonlyPost` using mapped types:
   ```typescript
   type ReadonlyPost = {
     readonly [K in keyof Post]: Post[K];
   };
   ```
4. Compare this to `Readonly<Post>` - are they the same?

**Hint:** `[K in keyof T]` iterates over all keys, `T[K]` gets the property type

**Why this is useful:** Understanding mapped types helps you create custom utility types.

---

### Task 3: Transform Properties with Mapped Types

**Goal:** Create a type that transforms all properties to a different type.

**Steps:**
1. Create a `PostFlags` type that makes all properties boolean:
   ```typescript
   type PostFlags = {
     [K in keyof Post]: boolean;
   };
   ```
2. What would this be useful for? (Feature flags, validation states, etc.)
3. Create a `PostMetadata` type that wraps all property types:
   ```typescript
   type PostMetadata = {
     [K in keyof Post]: { value: Post[K]; lastModified: Date };
   };
   ```
4. Think about when you might need this pattern

**Hint:** You can transform the property type in the mapped type: `[K in keyof T]: NewType`

**Further Learning:** Check out `src/05-in.ts` for complex mapped type examples including conditional logic within mapped types.

---

### Task 4: Combine Mapped Types with Conditionals

**Goal:** Create a mapped type with conditional logic.

**Steps:**
1. Look at `InCompleteResponseTwo` in `src/05-in.ts`
2. Create your own version: `PostWithStringIds` that:
   - Keeps most properties as-is
   - But converts `id` and `userId` to strings
3. Use a conditional within the mapped type: `K extends "id" | "userId" ? string : Post[K]`

**Hint:** You can combine mapped types with conditionals: `[K in keyof T]: K extends Key ? Type1 : Type2`

**Why this is useful:** Real-world APIs often need type transformations (e.g., IDs as strings in JSON).

---

## Integration Challenge (Optional)

**Goal:** Combine all concepts in a practical scenario.

**Steps:**
1. Create a comprehensive API client system:
   - Generic request function with constraints (from core exercise)
   - Utility types for different views (`Pick`, `Partial`, `Omit`)
   - Conditional types for single vs array responses
   - Mapped types for transformations
2. Create types for:
   - Post previews (public-facing)
   - Post updates (partial)
   - API responses (with conditional count)
   - Post metadata (with timestamps)
3. Build functions that use all these types together
4. Show how type composition makes your code safer and more maintainable

**Further Learning:** Explore how these concepts are used together in real codebases. Check the source files for inspiration.

---

## Reference: Source Files & Solutions

For more examples and deeper understanding, check out:

- **`src/03-utility.ts`** - Utility types (`Required`, `Partial`, `Omit`, `Pick`, `Awaited`)
- **`src/04-conditional.ts`** - Conditional types (`IsString`, `PartialWithRequired`)
- **`src/05-in.ts`** - Mapped types (`keyof`, `[K in keyof T]`, complex transformations)

**Solutions:** See `completed/src/extensions.ts` for complete solutions to all extension exercises.

---

## Tips for Success

1. **Start with Extension 1** - Utility types are the most practical and easiest to understand
2. **Use your IDE** - Hover over types to see what TypeScript infers
3. **Experiment** - Try breaking things to understand how types work
4. **Reference source files** - They have working examples you can learn from
5. **Don't worry if you don't finish** - These are extensions for deeper learning

---

## Quick Reference

### Utility Types
- `Pick<T, K>` - Select specific properties
- `Omit<T, K>` - Remove specific properties
- `Partial<T>` - Make all properties optional
- `Required<T>` - Make all properties required
- `Readonly<T>` - Make all properties readonly

### Conditional Types
- `T extends U ? A : B` - If T extends U, return A, else B
- Useful for handling different input types

### Mapped Types
- `keyof T` - Get all keys as union type
- `[K in keyof T]: Type` - Transform all properties
- `T[K]` - Get type of property K

---

**Remember:** These extensions are optional! Focus on understanding the core concepts first, then explore these when you're ready. 🎯
