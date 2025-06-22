# PageSolver SDK

Official TypeScript/JavaScript SDK for the PageSolver API.

## Installation

```bash
npm install @pagesolver/sdk
# or
bun add @pagesolver/sdk
# or
yarn add @pagesolver/sdk
```

## Quick Start

```typescript
import { PageSolverClient } from "@pagesolver/sdk";

const client = new PageSolverClient("your-business-key");

// Get comparisons - returns array directly
const comparisons = await client.getComparisons();
console.log(comparisons); // ComparisonImage[]

// Get showcases - returns array directly
const showcases = await client.getShowcases();
console.log(showcases); // ShowcaseImage[]

// Get quick quotes - returns array directly
const quickQuotes = await client.getQuickQuotes();
console.log(quickQuotes); // QuickQuote[]

// Send contact form - returns boolean
const success = await client.contact({
  name: "John Doe",
  email: "john@example.com",
  message: "Hello from the SDK!",
});

if (success) {
  console.log("Contact form sent successfully!");
}

// Error handling with try/catch
try {
  const comparisons = await client.getComparisons();
  console.log(`Found ${comparisons.length} comparisons`);
} catch (error) {
  console.error("Failed to get comparisons:", error.message);
}
```

## API Reference

### PageSolverClient

#### Constructor

```typescript
new PageSolverClient(businessKey: string)
```

- `businessKey`: Your PageSolver business API key

#### Methods

##### `getComparisons()`

Retrieves all comparison images for your business.

```typescript
const comparisons = await client.getComparisons();
// Returns: ComparisonImage[]
```

##### `getShowcases()`

Retrieves all showcase images for your business.

```typescript
const showcases = await client.getShowcases();
// Returns: ShowcaseImage[]
```

##### `getQuickQuotes()`

Retrieves all quick quotes for your business.

```typescript
const quotes = await client.getQuickQuotes();
// Returns: QuickQuote[]
```

##### `contact(data: ContactData)`

Sends a contact form submission.

```typescript
const success = await client.contact({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890", // optional
  message: "Hello!", // optional
});
// Returns: boolean
```

## Types

### ComparisonImage

```typescript
interface ComparisonImage {
  id: string;
  businessId: string;
  beforeUrl: string;
  afterUrl: string;
  description: string | null;
  createdAt: Date;
  title: string;
}
```

### ShowcaseImage

```typescript
interface ShowcaseImage {
  id: string;
  businessId: string;
  blobUrl: string[];
  createdAt: Date;
  description: string | null;
  title: string;
}
```

### QuickQuote

```typescript
interface QuickQuote {
  id: string;
  businessId: string;
  parentId: string | null;
  name: string;
  description: string | null;
  basePrice: string | null;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### ContactData

```typescript
interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}
```

### ApiResponse

```typescript
interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}
```

## Error Handling

All methods return an `ApiResponse<T>` object that contains either:

- `data`: The successful response data
- `error`: An error message if the request failed
- `status`: HTTP status code

```typescript
const result = await client.getComparisons();

if (result.error) {
  console.error("Error:", result.error);
  console.error("Status:", result.status);
} else {
  console.log("Success:", result.data);
}
```

## License

MIT
