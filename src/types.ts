// Shared types
export interface BusinessInfo {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
}

// Module types
export type Module =
  | "comparison_gallery"
  | "showcase_gallery"
  | "smart_contact"
  | "google_review_display"
  | "google_review_requests"
  | "facebook_feed_sync"
  | "instagram_feed_sync"
  | "xero_payment_notifications";

// Modules API (/api/v1/business/modules)
export interface ModulesResponse {
  modules: Module[];
}

// Comparisons API (/api/v1/business/comparisons)
export interface ComparisonImage {
  id: string;
  business_id: number;
  before_url: string;
  after_url: string;
  title: string;
  description: string | null;
  updated_at: string; // ISO string from database
  created_at: string; // ISO string from database
}

export interface ComparisonsResponse {
  comparisons: ComparisonImage[];
}

// Showcases API (/api/v1/business/showcases)
export interface ShowcaseImage {
  id: string;
  business_id: number;
  image_url: string[]; // Array of image URLs (not single string)
  title: string;
  description: string | null;
  updated_at: string; // ISO string from database
  created_at: string; // ISO string from database
}

export interface ShowcasesResponse {
  showcases: ShowcaseImage[];
}

// Contact API (/api/v1/business/contact)
export type ContactData = Record<string, unknown>;

export interface ContactResponse {
  success: boolean;
  message: string;
  contactId: string | null;
}

// Google Reviews API (/api/v1/business/google/reviews)
export interface GoogleReview {
  rating: number;
  text: string;
  author: string;
  publishTime: string;
}

export interface GoogleReviewsResponse {
  business: BusinessInfo;
  rating: number | null;
  totalReviews: number;
  reviews: GoogleReview[];
}

// Social Media API Types (/api/v1/business/social/*)
export interface FacebookPost {
  id: string;
  message?: string;
  created_time: string;
  permalink_url?: string;
  full_picture?: string;
}

export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  permalink: string;
  timestamp: string;
}

export interface SocialMediaResponse {
  business: BusinessInfo;
  posts: FacebookPost[] | InstagramPost[];
  platform: "facebook" | "instagram";
}
