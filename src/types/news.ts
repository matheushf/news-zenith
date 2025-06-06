export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author: string;
  category: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export type NewsCategory = 
  | 'all'
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology';

export type NewsSource = 
  | 'all'
  | 'abc-news'
  | 'bbc-news'
  | 'cnn'
  | 'bloomberg'
  | 'business-insider'
  | 'buzzfeed'
  | 'fox-news';

export type SortOption = 'newest' | 'oldest' | 'relevance';

export type DateRangeOption = 'today' | 'week' | 'month' | 'custom';

export interface NewsFilters {
  query: string;
  category: NewsCategory;
  source: NewsSource;
  dateRange: DateRangeOption;
  sortBy: SortOption;
  startDate?: string;
  endDate?: string;
}

export interface UserPreferences {
  preferredSources: string[];
  preferredCategories: string[];
  preferredAuthors?: string[];
}
