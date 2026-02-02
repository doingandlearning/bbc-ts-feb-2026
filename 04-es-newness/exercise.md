# Exercise: BBC News Content Management System
## Modern JavaScript Features in Practice

### Overview
You're building a content management system for BBC News that handles articles, authors, and user interactions. This exercise combines multiple ES6+ features to create a practical, real-world application.

### Learning Objectives
- Apply ES6+ features in an integrated, practical context
- Use modern JavaScript patterns for data manipulation
- Combine multiple features to solve complex problems
- Practice with real-world scenarios

---

## Part 1: Content Creation with Modern Features

### Task 1.1: Article Factory Function
Create a function that generates article objects using modern JavaScript features:

```typescript
// Use default parameters, template literals, and object shorthand
function createArticle(title, author, content, category = "general", isPublished = false) {
  // Return an article object with all properties
  // Include: id, title, author, content, category, isPublished, createdAt, wordCount
}
```

### Task 1.2: Author Management
Create an author management system using destructuring and spread operators:

```typescript
// Create functions to:
// - Add new authors
// - Update author information
// - Get author statistics
```

---

## Part 2: Data Processing Pipeline

### Task 2.1: Article Processing
Build a pipeline that processes articles using array methods:

```typescript
// Create functions that:
// - Filter published articles
// - Sort articles by date
// - Transform articles for display
// - Calculate reading time estimates
```

### Task 2.2: Content Analysis
Analyze article content using modern array methods:

```typescript
// Create functions that:
// - Find articles by category
// - Get trending topics (most common words)
// - Calculate author productivity
// - Generate content reports
```

---

## Part 3: User Interaction Features

### Task 3.1: Search and Filter
Implement search functionality using modern JavaScript:

```typescript
// Create a search system that:
// - Searches article titles and content
// - Filters by multiple criteria
// - Uses optional chaining for safe property access
// - Handles null/undefined values with nullish coalescing
```

### Task 3.2: User Preferences
Manage user preferences using modern patterns:

```typescript
// Create a system that:
// - Stores user preferences
// - Applies user filters to content
// - Uses destructuring for configuration
// - Handles default values elegantly
```

---

## Part 4: Integration Challenge

### Task 4.1: Complete Content Workflow
Build a complete workflow that combines all features:

```typescript
// Create a function that:
// - Takes raw article data
// - Processes it through the pipeline
// - Applies user preferences
// - Returns formatted content for display
// - Uses multiple ES6+ features together
```

### Task 4.2: Error Handling and Edge Cases
Handle edge cases using modern JavaScript:

```typescript
// Create robust functions that:
// - Handle missing data gracefully
// - Use optional chaining throughout
// - Provide sensible defaults
// - Handle empty arrays and objects
```

---

## Success Criteria

Your solution should:
- ✅ Use default parameters and template literals effectively
- ✅ Apply destructuring and spread/rest operators
- ✅ Implement array methods (map, filter, reduce, etc.)
- ✅ Use optional chaining and nullish coalescing
- ✅ Combine multiple ES6+ features in practical ways
- ✅ Handle real-world scenarios and edge cases
- ✅ Demonstrate clean, modern JavaScript patterns

---

## Tips

1. **Start with basic features** - Build one feature at a time
2. **Combine features gradually** - Don't try to use everything at once
3. **Think about real usage** - How would this be used in a real BBC system?
4. **Handle edge cases** - What happens with missing or invalid data?
5. **Use modern patterns** - Prefer ES6+ features over older alternatives

---

## Next Steps

Once you've completed this exercise, you'll have:
- Practical experience with ES6+ features in real-world scenarios
- Understanding of how to combine multiple modern JavaScript features
- Experience building integrated systems using modern patterns
- A foundation for more advanced TypeScript concepts

This will prepare you for the more complex topics covered in later units of the course.