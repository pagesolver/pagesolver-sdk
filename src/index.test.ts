import { describe, expect, it, mock } from "bun:test";
import { PageSolverClient } from "./index";

// Mock fetch globally
const mockFetch = mock(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    headers: new Headers({ "Content-Type": "application/json" }),
    json: () =>
      Promise.resolve({
        comparisons: [
          {
            id: "1",
            business_id: 123,
            before_url: "before.jpg",
            after_url: "after.jpg",
            title: "test",
            description: "test description",
            updated_at: "2024-01-01T00:00:00Z",
            created_at: "2024-01-01T00:00:00Z",
          },
        ],
        showcases: [
          {
            id: "2",
            business_id: 123,
            image_url: ["showcase1.jpg", "showcase2.jpg"],
            title: "test",
            description: "test description",
            updated_at: "2024-01-01T00:00:00Z",
            created_at: "2024-01-01T00:00:00Z",
          },
        ],
        success: true,
        message: "Success",
        contactId: "contact-123",
        business: {
          id: "123",
          name: "Test Business",
        },
        rating: 4.5,
        totalReviews: 100,
        reviews: [
          {
            rating: 5,
            text: "Great service!",
            author: "John Doe",
            publishTime: "2024-01-01T00:00:00Z",
          },
        ],
        status: "open",
        isOpenNow: true,
        hours: [
          {
            day: "Monday",
            hours: "9:00 AM - 5:00 PM",
          },
        ],
        currentTime: {
          day: "Monday",
          time: "10:00 AM",
        },
        posts: [
          {
            id: "post1",
            message: "Test post",
            created_time: "2024-01-01T00:00:00Z",
          },
        ],
        platform: "facebook",
      }),
  } as Response)
);

globalThis.fetch = mockFetch as unknown as typeof fetch;

describe("PageSolverClient", () => {
  const client = new PageSolverClient("test-business-key");

  it("should create a client with business key", () => {
    expect(client).toBeInstanceOf(PageSolverClient);
  });

  it("should return comparisons array directly", async () => {
    const result = await client.getComparisons();
    expect(Array.isArray(result)).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/comparisons",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should return showcases array directly", async () => {
    const result = await client.getShowcases();
    expect(Array.isArray(result)).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/showcases",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should return contact response object", async () => {
    const contactData = {
      name: "John Doe",
      email: "john@example.com",
      message: "Test message",
      budget: 250,
    };

    const result = await client.contact(contactData);
    expect(result).toHaveProperty("success");
    expect(result).toHaveProperty("message");
    expect(result).toHaveProperty("contactId");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/contact",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
        body: JSON.stringify(contactData),
      })
    );
  });

  it("should return Google reviews", async () => {
    const result = await client.getGoogleReviews();
    expect(result).toHaveProperty("business");
    expect(result).toHaveProperty("rating");
    expect(result).toHaveProperty("reviews");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/google/reviews",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should return Google hours", async () => {
    const result = await client.getGoogleHours();
    expect(result).toHaveProperty("business");
    expect(result).toHaveProperty("status");
    expect(result).toHaveProperty("isOpenNow");
    expect(result).toHaveProperty("hours");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/google/hours",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should return Instagram posts", async () => {
    const result = await client.getInstagramPosts();
    expect(result).toHaveProperty("business");
    expect(result).toHaveProperty("posts");
    expect(result).toHaveProperty("platform");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/social/instagram",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should return Facebook posts", async () => {
    const result = await client.getFacebookPosts();
    expect(result).toHaveProperty("business");
    expect(result).toHaveProperty("posts");
    expect(result).toHaveProperty("platform");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/social/facebook",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should throw error on API failure", async () => {
    const errorFetch = mock(() =>
      Promise.resolve({
        ok: false,
        status: 400,
        headers: new Headers({ "Content-Type": "application/json" }),
        json: () => Promise.resolve({ error: "Bad request" }),
      } as Response)
    );

    globalThis.fetch = errorFetch as unknown as typeof fetch;

    await expect(client.getComparisons()).rejects.toThrow(
      "API Error (400): Bad request"
    );
  });
});
