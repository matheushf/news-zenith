import { Article, NewsApiResponse, NewsCategory, NewsFilters, NewsSource } from '@/types/news';
import { getDateRangeFromOption } from '@/utils/dateUtils';

// Mock data for news sources
export const newsSources: NewsSource[] = [
  { id: 'bbc-news', name: 'BBC News', category: 'general', language: 'en', country: 'gb' },
  { id: 'cnn', name: 'CNN', category: 'general', language: 'en', country: 'us' },
  { id: 'the-verge', name: 'The Verge', category: 'technology', language: 'en', country: 'us' },
  { id: 'wired', name: 'Wired', category: 'technology', language: 'en', country: 'us' },
  { id: 'bloomberg', name: 'Bloomberg', category: 'business', language: 'en', country: 'us' },
  { id: 'espn', name: 'ESPN', category: 'sports', language: 'en', country: 'us' },
  { id: 'national-geographic', name: 'National Geographic', category: 'science', language: 'en', country: 'us' },
];

// Categories with display names
export const newsCategories: { id: NewsCategory; name: string }[] = [
  { id: 'business', name: 'Business' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'general', name: 'General' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'technology', name: 'Technology' },
];

// Mock data for articles
const generateMockArticles = (): Article[] => {
  const articles: Article[] = [];
  
  const titles = [
    'Apple Announces Revolutionary New Product Line',
    'Global Markets React to Economic Policy Changes',
    'Scientists Discover Breakthrough in Renewable Energy',
    'Tech Giants Face New Regulatory Challenges',
    'Health Experts Share Tips for Maintaining Wellness',
    'Sports Team Secures Historic Championship Win',
    'Entertainment Industry Transformed by Streaming Platforms',
    'Advances in AI Raise Ethical Questions',
    'Climate Change Effects Accelerating, Study Finds',
    'New Space Mission Planned for Next Decade',
    'Education System Faces Post-Pandemic Challenges',
    'Cybersecurity Concerns Grow with New Threats',
  ];
  
  for (let i = 0; i < 50; i++) {
    const randomSourceIndex = Math.floor(Math.random() * newsSources.length);
    const source = newsSources[randomSourceIndex];
    
    const randomTitleIndex = Math.floor(Math.random() * titles.length);
    const title = titles[randomTitleIndex];
    
    const daysAgo = Math.floor(Math.random() * 30);
    const publishedDate = new Date();
    publishedDate.setDate(publishedDate.getDate() - daysAgo);
    
    articles.push({
      id: `article-${i}`,
      title,
      description: `This is a description for the article about "${title}". It provides a brief overview of what the article contains.`,
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisi eu ultricies lacinia, nisl nunc aliquam nisl, nec aliquam nisl nunc vel nisl. Nullam auctor, nisi eu ultricies lacinia, nisl nunc aliquam nisl, nec aliquam nisl nunc vel nisl.`,
      url: 'https://example.com/article',
      image: `https://source.unsplash.com/random/800x600?sig=${i}`,
      publishedAt: publishedDate.toISOString(),
      source: {
        id: source.id,
        name: source.name
      },
      author: 'John Doe',
      category: source.category
    });
  }
  
  return articles;
};

// Create a cached mock dataset
const mockArticles = generateMockArticles();

// Mock implementation of fetching articles
export const fetchArticles = async (filters: NewsFilters): Promise<NewsApiResponse> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      let filteredArticles = [...mockArticles];
      
      // Apply filters
      if (filters.query) {
        const query = filters.query.toLowerCase();
        filteredArticles = filteredArticles.filter(
          article => article.title.toLowerCase().includes(query) || 
                    article.description.toLowerCase().includes(query)
        );
      }
      
      if (filters.category && filters.category !== 'all') {
        filteredArticles = filteredArticles.filter(
          article => article.category === filters.category
        );
      }
      
      if (filters.source && filters.source !== 'all') {
        filteredArticles = filteredArticles.filter(
          article => article.source.id === filters.source
        );
      }
      
      if (filters.dateRange) {
        const { start, end } = getDateRangeFromOption(filters.dateRange);
        
        if (start) {
          filteredArticles = filteredArticles.filter(article => {
            const publishedDate = new Date(article.publishedAt);
            return publishedDate >= start && publishedDate <= end;
          });
        }
      }
      
      // Apply sorting
      filteredArticles.sort((a, b) => {
        const dateA = new Date(a.publishedAt);
        const dateB = new Date(b.publishedAt);
        
        if (filters.sortBy === 'newest') {
          return dateB.getTime() - dateA.getTime();
        } else if (filters.sortBy === 'oldest') {
          return dateA.getTime() - dateB.getTime();
        }
        
        // Default to relevance, which we'll simulate by just using the original order
        return 0;
      });
      
      resolve({
        status: 'ok',
        totalResults: filteredArticles.length,
        articles: filteredArticles
      });
    }, 800); // Simulate network delay
  });
};

export const fetchArticleById = async (id: string): Promise<Article | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const article = mockArticles.find(article => article.id === id);
      resolve(article || null);
    }, 500);
  });
};

export const fetchSources = async (): Promise<NewsSource[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newsSources);
    }, 500);
  });
};
