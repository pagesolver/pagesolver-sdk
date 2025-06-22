import { describe, expect, it, mock } from "bun:test";
import { PageSolverClient } from "./index";

// Mock fetch globally
const mockFetch = mock(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    headers: new Headers({ "Content-Type": "application/json" }),
    json: () => Promise.resolve({ data: "test" }),
  } as Response)
);

globalThis.fetch = mockFetch as unknown as typeof fetch;

describe("PageSolverClient", () => {
  const client = new PageSolverClient("test-business-key");

  it("should create a client with business key", () => {
    expect(client).toBeInstanceOf(PageSolverClient);
  });

  it("should make a request to get comparisons", async () => {
    const result = await client.getComparisons();
    expect(result.status).toBe(200);
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

  it("should make a request to get showcases", async () => {
    const result = await client.getShowcases();
    expect(result.status).toBe(200);
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

  it("should make a request to get quick quotes", async () => {
    const result = await client.getQuickQuotes();
    expect(result.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/quick-quotes",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-business-key": "test-business-key",
        }),
      })
    );
  });

  it("should make a POST request for contact", async () => {
    const contactData = {
      name: "John Doe",
      email: "john@example.com",
      message: "Test message",
    };

    const result = await client.contact(contactData);
    expect(result.status).toBe(200);
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
});
