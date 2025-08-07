// Database schema types
export interface ComparisonImage {
  id: string;
  business_id: number;
  before_url: string;
  after_url: string;
  title: string;
  description: string | null;
  updated_at: Date;
  created_at: Date;
}

export interface ShowcaseImage {
  id: string;
  business_id: number;
  image_url: string;
  title: string;
  description: string | null;
  updated_at: Date;
  created_at: Date;
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
