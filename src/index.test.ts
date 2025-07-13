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
        comparisons: [{ id: "1", clientId: 123, title: "test" }],
        showcases: [{ id: "2", clientId: 123, title: "test" }],
        quotes: [{ id: "3", clientId: 123, name: "test" }],
        success: true,
      }),
  } as Response)
);

globalThis.fetch = mockFetch as unknown as typeof fetch;

describe("PageSolverClient", () => {
  const client = new PageSolverClient("test-client-key");

  it("should create a client with client key", () => {
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
          "x-client-key": "test-client-key",
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
          "x-client-key": "test-client-key",
        }),
      })
    );
  });

  it("should return quick quotes array directly", async () => {
    const result = await client.getQuickQuotes();
    expect(Array.isArray(result)).toBe(true);
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/quick-quotes",
      expect.objectContaining({
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-client-key": "test-client-key",
        }),
      })
    );
  });

  it("should return boolean for contact success", async () => {
    const contactData = {
      name: "John Doe",
      email: "john@example.com",
      message: "Test message",
    };

    const result = await client.contact(contactData);
    expect(typeof result).toBe("boolean");
    expect(mockFetch).toHaveBeenCalledWith(
      "https://pagesolver.com/api/v1/business/contact",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
          "x-client-key": "test-client-key",
        }),
        body: JSON.stringify(contactData),
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
