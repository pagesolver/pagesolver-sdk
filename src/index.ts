// Database schema types
export interface ComparisonImage {
  id: string;
  businessId: string;
  beforeUrl: string;
  afterUrl: string;
  description: string | null;
  createdAt: Date;
  title: string;
}

export interface ShowcaseImage {
  id: string;
  businessId: string;
  blobUrl: string[];
  createdAt: Date;
  description: string | null;
  title: string;
}

export interface QuickQuote {
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
  ): Promise<ApiResponse<T>> {
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
        return {
          error:
            (data as { error?: string })?.error || "An unknown error occurred",
          status: response.status,
        };
      }

      return {
        data: data as T,
        status: response.status,
      };
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Network error",
        status: 500,
      };
    }
  }

  // Comparison Images
  async getComparisons(): Promise<
    ApiResponse<{ comparisons: ComparisonImage[] }>
  > {
    return this.request<{ comparisons: ComparisonImage[] }>(
      "/business/comparisons"
    );
  }

  // Showcase Images
  async getShowcases(): Promise<ApiResponse<{ showcases: ShowcaseImage[] }>> {
    return this.request<{ showcases: ShowcaseImage[] }>("/business/showcases");
  }

  // Quick Quotes
  async getQuickQuotes(): Promise<ApiResponse<{ quotes: QuickQuote[] }>> {
    return this.request<{ quotes: QuickQuote[] }>("/business/quick-quotes");
  }

  // Contact
  async contact(data: ContactData): Promise<ApiResponse<ContactResponse>> {
    return this.request<ContactResponse>("/business/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Export types for consumers
export type { ApiResponse, ContactData, ContactResponse };
