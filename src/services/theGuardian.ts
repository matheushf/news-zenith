import { Article, NewsFilters } from '@/types/news';
import { getDateRangeFromOption } from '@/utils/dateUtils';

const GUARDIAN_API_KEY = 'a215c503-45ea-48e2-8f50-b484989d0182';
const GUARDIAN_API_BASE_URL = 'https://content.guardianapis.com';

interface GuardianResponse {
  response: {
    status: string;
    total: number;
    results: GuardianArticle[];
  };
}

interface GuardianArticle {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  pillarName?: string;
  fields: {
    thumbnail: string;
  }
}

export const fetchGuardianArticles = async (filters: NewsFilters): Promise<Article[]> => {
  try {
    const { start, end } = getDateRangeFromOption(filters.dateRange);
    const fromDate = start?.toISOString().split('T')[0];
    const toDate = end?.toISOString().split('T')[0];

    const url = new URL(`${GUARDIAN_API_BASE_URL}/search`);
    const params = new URLSearchParams({
      'api-key': GUARDIAN_API_KEY,
      'show-fields': 'thumbnail,trailText',
      'page-size': '3',
    });

    // Add sort parameter
    if (filters.sortBy) {
      // Guardian API uses 'newest' and 'oldest' directly
      params.append('order-by', filters.sortBy);
    }

    // Add search query if available
    if (filters.query) {
      params.append('q', filters.query);
    }

    // Add date filters if available
    if (fromDate) params.append('from-date', fromDate);
    if (toDate) params.append('to-date', toDate);

    const response = await fetch(`${url}?${params}`);

    if (!response.ok) {
      throw new Error('Failed to fetch Guardian articles');
    }

    const data: GuardianResponse = await response.json();

    // Transform Guardian articles to match our Article type
    return data.response.results.map((article): Article => ({
      id: article.id,
      title: article.webTitle,
      description: '', // The Guardian API requires additional fields for description
      content: '', // Content requires a separate API call
      url: article.webUrl,
      image: article.fields.thumbnail,
      publishedAt: article.webPublicationDate,
      source: {
        id: 'the-guardian',
        name: 'The Guardian'
      },
      author: '', // Requires additional API call
      category: article.sectionName.toLowerCase()
    }));
  } catch (error) {
    console.error('Error fetching Guardian articles:', error);
    throw error;
  }
};
