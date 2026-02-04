// Branded Types (Nominal Typing)
// Create distinct types from primitives to prevent mixing similar types

// ============================================================================
// Basic Branded Types
// ============================================================================

// Branded type pattern
type UserId = string & { __brand: "UserId" };
type ProductId = string & { __brand: "ProductId" };

// Type guard function to create branded types
function createUserId(id: string): UserId {
  return id as UserId;
}

function createProductId(id: string): ProductId {
  return id as ProductId;
}

// Usage
const userId = createUserId("123");
const productId = createProductId("456");

// ============================================================================
// Preventing Type Mixing
// ============================================================================

function getUser(id: UserId): User {
  // Implementation
  return {} as User;
}

function getProduct(id: ProductId): Product {
  // Implementation
  return {} as Product;
}

interface User {
  id: UserId;
  name: string;
}

interface Product {
  id: ProductId;
  name: string;
}

// This works ✅
getUser(userId);

// This doesn't work ❌
// getUser(productId); // Error: Argument of type 'ProductId' is not assignable to parameter of type 'UserId'

// ============================================================================
// Branded Types for Different Units
// ============================================================================

// Prevent mixing different units
type Meters = number & { __brand: "Meters" };
type Seconds = number & { __brand: "Seconds" };

function createMeters(value: number): Meters {
  return value as Meters;
}

function createSeconds(value: number): Seconds {
  return value as Seconds;
}

function calculateSpeed(distance: Meters, time: Seconds): number {
  return distance / time;
}

const distance = createMeters(100);
const time = createSeconds(10);

const speed = calculateSpeed(distance, time); // ✅ Works

// This doesn't work ❌
// const wrongSpeed = calculateSpeed(time, distance); // Error: types don't match

// ============================================================================
// Branded Types for Currency
// ============================================================================

type USD = number & { __brand: "USD" };
type EUR = number & { __brand: "EUR" };
type GBP = number & { __brand: "GBP" };

function createUSD(amount: number): USD {
  return amount as USD;
}

function createEUR(amount: number): EUR {
  return amount as EUR;
}

function createGBP(amount: number): GBP {
  return amount as GBP;
}

function addUSD(a: USD, b: USD): USD {
  return (a + b) as USD;
}

const usd1 = createUSD(100);
const usd2 = createUSD(50);
const total = addUSD(usd1, usd2); // ✅ Works

// This doesn't work ❌
// const eur = createEUR(100);
// const wrong = addUSD(usd1, eur); // Error: can't mix currencies

// ============================================================================
// Branded Types for Email Addresses
// ============================================================================

type EmailAddress = string & { __brand: "EmailAddress" };

function createEmail(email: string): EmailAddress {
  // Could add validation here
  if (!email.includes("@")) {
    throw new Error("Invalid email");
  }
  return email as EmailAddress;
}

function sendEmail(to: EmailAddress, subject: string, body: string): void {
  console.log(`Sending email to ${to}`);
}

const email = createEmail("user@example.com");
sendEmail(email, "Hello", "World"); // ✅ Works

// This doesn't work ❌
// sendEmail("user@example.com", "Hello", "World"); // Error: string is not EmailAddress

// ============================================================================
// Branded Types with Generic Helper
// ============================================================================

// Generic helper to create branded types
type Brand<T, B> = T & { __brand: B };

type UserIdGeneric = Brand<string, "UserId">;
type ProductIdGeneric = Brand<string, "ProductId">;
type PriceUSD = Brand<number, "USD">;

function createBranded<T, B>(value: T, brand: B): Brand<T, B> {
  return value as Brand<T, B>;
}

const userId2 = createBranded("123", "UserId" as const);
const price = createBranded(99.99, "USD" as const);

// ============================================================================
// Real-World Example: API IDs
// ============================================================================

type ArticleId = Brand<string, "ArticleId">;
type AuthorId = Brand<string, "AuthorId">;
type CategoryId = Brand<string, "CategoryId">;

function createArticleId(id: string): ArticleId {
  return id as ArticleId;
}

function createAuthorId(id: string): AuthorId {
  return id as AuthorId;
}

interface Article {
  id: ArticleId;
  title: string;
  authorId: AuthorId;
  categoryId: CategoryId;
}

function getArticle(id: ArticleId): Article {
  return {} as Article;
}

const articleId = createArticleId("article-123");
const authorId = createAuthorId("author-456");

const article = getArticle(articleId); // ✅ Works

// This doesn't work ❌
// const wrong = getArticle(authorId); // Error: AuthorId is not ArticleId

// ============================================================================
// Branded Types vs Type Aliases
// ============================================================================

// Type alias - structural typing (can mix)
type UserIdAlias = string;
type ProductIdAlias = string;

function processUserId(id: UserIdAlias): void {}
function processProductId(id: ProductIdAlias): void {}

const userIdAlias: UserIdAlias = "123";
processProductId(userIdAlias); // ✅ Works! (but shouldn't)

// Branded type - nominal typing (can't mix)
type UserIdBranded = string & { __brand: "UserId" };
type ProductIdBranded = string & { __brand: "ProductId" };

function processUserIdBranded(id: UserIdBranded): void {}
function processProductIdBranded(id: ProductIdBranded): void {}

const userIdBranded = "123" as UserIdBranded;
// processProductIdBranded(userIdBranded); // ❌ Error! (correct behavior)

// ============================================================================
// Key Points
// ============================================================================

// 1. Branded types prevent mixing similar types (IDs, currencies, units)
// 2. Use type guards to create branded values safely
// 3. Brand property is erased at runtime (compile-time only)
// 4. More type-safe than type aliases for primitives
// 5. Useful for domain modeling (preventing invalid operations)
// 6. Can use generic helper `Brand<T, B>` for reusability

export {};
