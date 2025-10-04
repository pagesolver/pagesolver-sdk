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

// Google Business Profile data
const reviews = await client.getGoogleReviews();
const hours = await client.getGoogleHours();

// Latest social posts
const instagram = await client.getInstagramPosts();
const facebook = await client.getFacebookPosts();

// Smart contact submissions (any flat JSON payload works)
const contact = await client.contact({
  name: "John Doe",
  email: "john@example.com",
  service: "Detailing",
  requested_date: "2025-03-10",
});

console.log(contact.success, contact.contactId);
```

## API Reference

### PageSolverClient

#### Constructor

```typescript
new PageSolverClient(businessKey: string)
```

- `businessKey`: Your PageSolver business API key

#### Methods

| Method | Description | Return Type |
| --- | --- | --- |
| `getComparisons()` | Fetch before/after comparison images | `ComparisonImage[]` |
| `getShowcases()` | Fetch showcase gallery images | `ShowcaseImage[]` |
| `getGoogleReviews()` | Fetch Google Business Profile reviews + metadata | `GoogleReviewsResponse` |
| `getGoogleHours()` | Fetch Google Business Profile opening hours | `GoogleHoursResponse` |
| `getInstagramPosts()` | Fetch recent Instagram posts (requires connected account) | `SocialMediaResponse` |
| `getFacebookPosts()` | Fetch recent Facebook posts (requires connected account) | `SocialMediaResponse` |
| `contact(data)` | Submit a contact form payload (flat JSON object) | `ContactResponse`

All methods throw an `Error` when the API responds with a non-2xx status, so wrap calls in `try/catch` if you want to handle failures gracefully.

```typescript
try {
  const comparisons = await client.getComparisons();
  console.log(`Found ${comparisons.length} comparisons`);
} catch (error) {
  console.error("Failed to load comparisons", error);
}

const contact = await client.contact({
  name: "Fresh & Clean",
  phone: "+1 555-0100",
  message: "Need a quote",
  source: "website-landing",
  budget: 250,
});

console.log(contact.message); // "Contact submission received successfully"
```

## Types

### Notable Types

```typescript
interface ComparisonImage {
  id: string;
  business_id: number;
  before_url: string;
  after_url: string;
  title: string;
  description: string | null;
  updated_at: string;
  created_at: string;
}

interface ShowcaseImage {
  id: string;
  business_id: number;
  image_url: string[];
  title: string;
  description: string | null;
  updated_at: string;
  created_at: string;
}

type ContactData = Record<string, unknown>; // any flat key/value payload

interface ContactResponse {
  success: boolean;
  message: string;
  contactId: string | null;
}

interface GoogleReviewsResponse {
  business: BusinessInfo; // includes id, name, optional website/phone
  rating: number | null;
  totalReviews: number;
  reviews: GoogleReview[];
}

interface SocialMediaResponse {
  business: BusinessInfo;
  posts: FacebookPost[] | InstagramPost[];
  platform: "facebook" | "instagram";
}
```

## License

MIT
