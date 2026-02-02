# Exercise: BBC News Article System

## Basic TypeScript Types and Interfaces

### Overview

You're working on a BBC news website and need to create basic type-safe data structures for news articles. This exercise covers the fundamentals of TypeScript types and interfaces.

### Learning Objectives

- Practice using basic TypeScript types (string, number, boolean)
- Create simple interfaces to define data structures
- Understand how TypeScript provides type safety

---

## Part 1: Basic Types

### Task 1.1: Article Information

Create variables to store basic article information with proper TypeScript types:

```typescript
// Add type annotations to these variables (though in real-life - if the initialising value works, leave it!)
const articleId = 12345;
const headline = "Breaking: Major News Story";
const isPublished = true;
const viewCount = 1250;
```

### Task 1.2: Author Information

Create an author object with type safety:

```typescript
// Create an author object with proper typing
const author = {
  name: "Jane Smith",
  email: "jane.smith@bbc.co.uk",
  department: "News",
};
```

---

## Part 2: Creating Interfaces

### Task 2.1: Article Interface

Create an interface or type for a news article that includes:

- `id` (number)
- `headline` (string)
- `content` (string)
- `author` (string)
- `isPublished` (boolean)
- `viewCount` (number)

### Task 2.2: Author Interface

Create an interface for an author that includes:

- `name` (string)
- `email` (string)
- `department` (string)

---

## Part 3: Using Your Interfaces

### Task 3.1: Create Sample Data

Create a sample article using your Article interface:

```typescript
const sampleArticle: Article = {
  // Fill in the properties with sample data
};
```

### Task 3.2: Create Sample Author

Create a sample author using your Author interface:

```typescript
const sampleAuthor: Author = {
  // Fill in the properties with sample data
};
```

---

## Part 4: Simple Functions

### Task 4.1: Article Summary

Create a function that returns a summary of an article:

```typescript
function getArticleSummary(article: Article): string {
  // Return a string like: "Article: [headline] by [author]"
}
```

### Task 4.2: Author Info

Create a function that returns author information:

```typescript
function getAuthorInfo(author: Author): string {
  // Return a string like: "[name] from [department]"
}
```

---

## Success Criteria

Your solution should:

- ✅ Use proper TypeScript types for all variables
- ✅ Have well-defined interfaces for Article and Author
- ✅ Create sample data using your interfaces
- ✅ Include simple functions that work with your interfaces
- ✅ Compile without TypeScript errors

---

## Tips

1. **Start simple** - Focus on the basic types first
2. **Use TypeScript's help** - Let the compiler guide you with error messages
3. **Test as you go** - Create sample data to test your functions
4. **Read error messages** - TypeScript errors are usually very helpful

---

## Next Steps

Once you've completed this exercise, you'll have:

- A basic understanding of TypeScript types
- Experience with simple interfaces
- Practice with type annotations
- A foundation for more advanced TypeScript concepts

This will prepare you for the more complex topics covered in later units of the course.
