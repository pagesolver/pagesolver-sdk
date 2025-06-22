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

// Get comparisons
const comparisons = await client.getComparisons();
if (comparisons.data) {
  console.log(comparisons.data.comparisons);
}

// Get showcases
const showcases = await client.getShowcases();
if (showcases.data) {
  console.log(showcases.data.showcases);
}

// Get quick quotes
const quickQuotes = await client.getQuickQuotes();
if (quickQuotes.data) {
  console.log(quickQuotes.data.quotes);
}

// Send contact form
const contactResult = await client.contact({
  name: "John Doe",
  email: "john@example.com",
  message: "Hello from the SDK!",
});

if (contactResult.data?.success) {
  console.log("Contact form sent successfully!");
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
const result = await client.getComparisons();
// Returns: ApiResponse<{ comparisons: ComparisonImage[] }>
```

##### `getShowcases()`

Retrieves all showcase images for your business.

```typescript
const result = await client.getShowcases();
// Returns: ApiResponse<{ showcases: ShowcaseImage[] }>
```

##### `getQuickQuotes()`

Retrieves all quick quotes for your business.

```typescript
const result = await client.getQuickQuotes();
// Returns: ApiResponse<{ quotes: QuickQuote[] }>
```

##### `contact(data: ContactData)`

Sends a contact form submission.

```typescript
const result = await client.contact({
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890", // optional
  message: "Hello!", // optional
});
// Returns: ApiResponse<ContactResponse>
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
