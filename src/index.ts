// Import all types from the types file
import type {
  ComparisonImage,
  ComparisonsResponse,
  ContactData,
  ContactResponse,
  FacebookPost,
  GoogleReview,
  GoogleReviewsResponse,
  InstagramPost,
  Module,
  ModulesResponse,
  ShowcaseImage,
  ShowcasesResponse,
  SocialMediaResponse,
} from "./types";

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
    const response = await this.request<ComparisonsResponse>(
      "/business/comparisons"
    );
    return response.comparisons;
  }

  // Showcase Images
  async getShowcases(): Promise<ShowcaseImage[]> {
    const response = await this.request<ShowcasesResponse>(
      "/business/showcases"
    );
    return response.showcases;
  }

  // Google Reviews
  async getGoogleReviews(): Promise<GoogleReviewsResponse> {
    return await this.request<GoogleReviewsResponse>(
      "/business/google/reviews"
    );
  }

  // Modules - Get all activated modules for the business
  async getModules(): Promise<Module[]> {
    const response = await this.request<ModulesResponse>("/business/modules");
    return response.modules;
  }

  // Social Media - Instagram
  async getInstagramPosts(): Promise<SocialMediaResponse> {
    return await this.request<SocialMediaResponse>(
      "/business/social/instagram"
    );
  }

  // Social Media - Facebook
  async getFacebookPosts(): Promise<SocialMediaResponse> {
    return await this.request<SocialMediaResponse>("/business/social/facebook");
  }

  // Contact
  async contact(data: ContactData): Promise<ContactResponse> {
    return await this.request<ContactResponse>("/business/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Re-export all types for consumers
export type {
  ComparisonImage,
  ComparisonsResponse,
  ShowcaseImage,
  ShowcasesResponse,
  ContactData,
  ContactResponse,
  GoogleReview,
  GoogleReviewsResponse,
  FacebookPost,
  InstagramPost,
  SocialMediaResponse,
  BusinessInfo,
  Module,
  ModulesResponse,
} from "./types";
