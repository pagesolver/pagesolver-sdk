// Shared types
export interface BusinessInfo {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  website?: string;
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
export interface ContactData {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  [key: string]: unknown;
}

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

// Google Hours API (/api/v1/business/google/hours)
export interface BusinessHours {
  day: string;
  hours: string;
}

export interface CurrentTime {
  day: string;
  time: string;
}

export interface GoogleHoursResponse {
  business: BusinessInfo;
  status: string;
  isOpenNow: boolean;
  hours: BusinessHours[];
  currentTime: CurrentTime;
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
