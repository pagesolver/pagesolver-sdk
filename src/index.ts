// Database schema types
export interface ComparisonImage {
  id: string;
  clientId: number;
  beforeUrl: string;
  afterUrl: string;
  description: string | null;
  createdAt: Date;
  title: string;
}

export interface ShowcaseImage {
  id: string;
  clientId: number;
  blobUrl: string[];
  createdAt: Date;
  description: string | null;
  title: string;
}

export interface QuickQuote {
  id: string;
  clientId: number;
  parentId: string | null;
  name: string;
  description: string | null;
  basePrice: string | null;
  enabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

interface ContactData {
  name: string;
  email: string;
  phone?: string;
  message?: string;
}

interface ContactResponse {
  success: boolean;
}

export class PageSolverClient {
  private baseUrl = "https://pagesolver.com/api/v1";
  private businessKey: string;

  constructor(businessKey: string) {
    this.businessKey = businessKey;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const url = `${this.baseUrl}${endpoint}`;

      const headers = {
        "Content-Type": "application/json",
        "x-business-key": this.businessKey,
        ...options.headers,
      };

      const response = await fetch(url, {
        ...options,
        headers,
      });

      let data: unknown;
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        const errorMessage =
          (data as { error?: string })?.error || "An unknown error occurred";
        throw new Error(`API Error (${response.status}): ${errorMessage}`);
      }

      return data as T;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Network error occurred");
    }
  }

  // Comparison Images
  async getComparisons(): Promise<ComparisonImage[]> {
    const response = await this.request<{ comparisons: ComparisonImage[] }>(
      "/business/comparisons"
    );
    return response.comparisons;
  }

  // Showcase Images
  async getShowcases(): Promise<ShowcaseImage[]> {
    const response = await this.request<{ showcases: ShowcaseImage[] }>(
      "/business/showcases"
    );
    return response.showcases;
  }

  // Quick Quotes
  async getQuickQuotes(): Promise<QuickQuote[]> {
    const response = await this.request<{ quotes: QuickQuote[] }>(
      "/business/quick-quotes"
    );
    return response.quotes;
  }

  // Contact
  async contact(data: ContactData): Promise<boolean> {
    const response = await this.request<ContactResponse>("/business/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return response.success;
  }
}

// Export types for consumers
export type { ContactData, ContactResponse };
