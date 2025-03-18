import { Article, NewsFilters } from '@/types/news';
import { getDateRangeFromOption } from '@/utils/dateUtils';

const NEWS_API_KEY = '1a3a325944c74a708a7b2416a08aa3b2';
const NEWS_API_BASE_URL = 'https://newsapi.org/v2';

interface NewsApiOrgResponse {
  status: string;
  totalResults: number;
  articles: NewsApiOrgArticle[];
}

interface NewsApiOrgArticle {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export const fetchNewsApiArticles = async (filters: NewsFilters): Promise<Article[]> => {
  try {
    const { start, end } = getDateRangeFromOption(filters.dateRange);
    const fromDate = start?.toISOString().split('T')[0];
    const toDate = end?.toISOString().split('T')[0];

    const url = new URL(`${NEWS_API_BASE_URL}/everything`);
    const params = new URLSearchParams({
      apiKey: NEWS_API_KEY,
      sources: 'abc-news,bbc-news,cnn,bloomberg,business-insider,buzzfeed,fox-news',
      pageSize: '3',
      language: 'en',
    });

    // Add sort parameter
    if (filters.sortBy) {
      // NewsAPI uses 'publishedAt' for newest and relevancy for default
      const sortMapping = {
        'newest': 'publishedAt',
        'oldest': 'publishedAt',
        'relevance': 'relevancy'
      };
      params.append('sortBy', sortMapping[filters.sortBy]);
      
      // For oldest, we need to change the order direction
      if (filters.sortBy === 'oldest') {
        params.append('sortOrder', 'asc');
      }
    }

    // Add search query if available
    if (filters.query) {
      params.append('q', filters.query);
    } else {
      // NewsAPI requires either q or sources parameter
      params.append('q', '*');
    }

    // Add date filters if available
    if (fromDate) params.append('from', fromDate);
    if (toDate) params.append('to', toDate);

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch NewsAPI articles');
    }

    const data: NewsApiOrgResponse = await response.json();

    // Transform NewsAPI articles to match our Article type
    return data.articles.map((article): Article => ({
      id: article.url,
      title: article.title,
      description: article.description || '',
      content: article.content || '',
      url: article.url,
      image: article.urlToImage || '',
      publishedAt: article.publishedAt,
      source: {
        id: article.source.id || 'newsapi',
        name: article.source.name
      },
      author: article.author || '',
      category: 'general'
    }));
  } catch (error) {
    console.error('Error fetching NewsAPI articles:', error);
    throw error;
  }
};
