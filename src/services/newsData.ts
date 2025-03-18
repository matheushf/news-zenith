import { Article } from '@/types/news';
import { NewsFilters } from '@/types/news';

const NEWSDATA_API_KEY = 'pub_75157b05a2055df57953b5e243ed0813e321f';
const NEWSDATA_API_BASE_URL = 'https://newsdata.io/api/1';

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage?: string;
}

interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string | null;
  source_id: string;
  source_priority: number;
  country: string[];
  category: string[];
  language: string;
  creator: string[] | null;
}

export const fetchNewsDataArticles = async (filters: NewsFilters): Promise<Article[]> => {
  try {
    const url = new URL(`${NEWSDATA_API_BASE_URL}/latest`);
    const params = new URLSearchParams({
      apikey: NEWSDATA_API_KEY,
      language: 'en',
      size: '3'
    });

    // Add sort parameter
    if (filters.sortBy) {
      // NewsData.io uses 'publishedAt' for date sorting
      const sortMapping = {
        'newest': 'publish_time',
        'oldest': 'publish_time',
        'relevance': 'rank'
      };
      params.append('sort_by', sortMapping[filters.sortBy]);
      
      // For oldest, we need to change the order
      if (filters.sortBy === 'oldest') {
        params.append('sort_direction', 'asc');
      }
    }

    // Add search query if available
    if (filters.query) {
      params.append('q', filters.query);
    }

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch NewsData articles');
    }

    const data: NewsDataResponse = await response.json();

    // Transform NewsData articles to match our Article type
    return data.results.map((article): Article => ({
      id: article.article_id,
      title: article.title,
      description: article.description || '',
      content: article.content || '',
      url: article.link,
      image: article.image_url || '',
      publishedAt: article.pubDate,
      source: {
        id: article.source_id,
        name: article.source_id // Using source_id as name since NewsData doesn't provide a separate name
      },
      author: article.creator ? article.creator.join(', ') : '',
      category: article.category[0]?.toLowerCase() || 'general'
    }));
  } catch (error) {
    console.error('Error fetching NewsData articles:', error);
    throw error;
  }
};
