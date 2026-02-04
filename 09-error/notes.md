# Section 9 — Error Handling in TypeScript

Error handling is about **making failure explicit**. JavaScript lets errors slip through at runtime; TypeScript helps you *design how failure is represented* and *force callers to deal with it*.

This section walks through common approaches, from weakest to strongest.

---

## 1. No error handling (what we’re fixing)

```ts
function findUser(id: number) {
  return users[id];
}
```

Problems:

* what if the user doesn’t exist?
* callers assume success
* failures show up later as `undefined` bugs

TypeScript can’t help if failure isn’t modelled.

---

## 2. Returning `null` (better, but leaky)

```ts
function findUser(id: number): User | null {
  return users[id] ?? null;
}
```

This improves things:

* return type signals failure
* callers are forced to check

But it relies on discipline:

```ts
const user = findUser(1);
user.name; // ❌ possibly null
```

You must narrow every time.

---

## 3. Throwing exceptions

```ts
function findUser(id: number): User {
  const user = users[id];
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}
```

Pros:

* clean happy path
* failure is impossible to ignore

Cons:

* control flow jumps
* TypeScript does *not* encode thrown errors in the type system
* async errors require `try/catch`

```ts
try {
  const user = findUser(1);
} catch (err) {
  console.error(err);
}
```

Use exceptions for **truly exceptional** cases, not normal flow.

---

## 4. Custom error types

If you throw, throw **meaningful errors**.

```ts
class UserNotFoundError extends Error {
  constructor(id: number) {
    super(`User ${id} not found`);
    this.name = "UserNotFoundError";
  }
}
```

```ts
throw new UserNotFoundError(id);
```

This enables:

```ts
catch (err) {
  if (err instanceof UserNotFoundError) {
    // recover
  }
}
```

TypeScript narrows with `instanceof`, but note:

* this is still runtime-only
* the function signature doesn’t reflect failure

---

## 5. Returning error objects (explicit failure)

```ts
type Result<T> =
  | { ok: true; value: T }
  | { ok: false; error: string };
```

```ts
function findUser(id: number): Result<User> {
  const user = users[id];
  if (!user) {
    return { ok: false, error: "User not found" };
  }
  return { ok: true, value: user };
}
```

Usage:

```ts
const result = findUser(1);

if (!result.ok) {
  console.error(result.error);
} else {
  result.value.name;
}
```

Benefits:

* failure is encoded in the type
* impossible to forget handling
* works well in async code

This is one of the most **TypeScript-friendly** approaches.

---

## 6. Option types (absence, not failure)

Sometimes absence is expected, not an error.

```ts
type Option<T> =
  | { kind: "some"; value: T }
  | { kind: "none" };
```

```ts
function findUser(id: number): Option<User> {
  const user = users[id];
  return user
    ? { kind: "some", value: user }
    : { kind: "none" };
}
```

This communicates intent clearly:

* no exceptions
* no error message
* caller must branch

Good for:

* caches
* lookups
* optional relationships

---

## Choosing the right approach

| Situation           | Prefer               |
| ------------------- | -------------------- |
| Programmer error    | throw                |
| Expected absence    | Option               |
| Recoverable failure | Result               |
| Legacy JS           | `null` (temporarily) |

---

## Common pitfalls & quick fixes

* **Throwing for normal control flow**
  → Use `Result` or `Option` instead.

* **Returning `null` without typing it**
  → Always include `| null` (or don’t return it).

* **Catching `any` errors**
  → Narrow with `instanceof` or discriminants.

* **Inconsistent patterns**
  → Pick one approach per layer.

---

## What to remember

* TypeScript can only help if failure is in the type
* Exceptions skip the type system
* Discriminated unions scale best
* Absence ≠ error
* Make failure impossible to ignore

---

### Final checklist

* [ ] Is failure represented in the return type?
* [ ] Is this absence or an actual error?
* [ ] Are callers forced to handle failure?
* [ ] Is the error strategy consistent at this layer?
* [ ] Could TypeScript help more here?

