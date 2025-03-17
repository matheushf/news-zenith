import { create } from 'zustand';
import { 
  NewsFilters, 
  UserPreferences,
  NewsSource
} from '@/types/news';
import { fetchSources } from '@/services/newsApi';
import { 
  getUserPreferences,
  toggleSourcePreference,
  toggleCategoryPreference,
  toggleAuthorPreference
} from '@/utils/storageUtils';

const defaultFilters: NewsFilters = {
  query: '',
  category: 'all',
  source: 'all',
  dateRange: 'month',
  sortBy: 'newest',
};

interface NewsState {
  filters: NewsFilters;
  userPreferences: UserPreferences & { preferredAuthors?: string[] };
  sources: NewsSource[];
  
  setFilters: (filters: Partial<NewsFilters>) => void;
  resetFilters: () => void;
  toggleSourcePref: (sourceId: string) => void;
  toggleCategoryPref: (category: string) => void;
  toggleAuthorPref: (author: string) => void;
  initializeStore: () => Promise<void>;
}

export const useNewsStore = create<NewsState>((set, get) => ({
  // Initial state
  filters: defaultFilters,
  userPreferences: {
    preferredSources: [],
    preferredCategories: [],
    preferredAuthors: []
  },
  sources: [],
  
  // Actions
  setFilters: (newFilters) => set(state => ({ 
    filters: { ...state.filters, ...newFilters }
  })),
  
  resetFilters: () => set({ filters: defaultFilters }),
  
  toggleSourcePref: (sourceId) => {
    const updatedPrefs = toggleSourcePreference(sourceId);
    set({ userPreferences: updatedPrefs });
  },
  
  toggleCategoryPref: (category) => {
    const updatedPrefs = toggleCategoryPreference(category);
    set({ userPreferences: updatedPrefs });
  },
  
  toggleAuthorPref: (author) => {
    const updatedPrefs = toggleAuthorPreference(author);
    set({ userPreferences: updatedPrefs });
  },
  
  // Initialize the store with user preferences and sources
  initializeStore: async () => {
    // Load user preferences
    const prefs = getUserPreferences();
    
    // Ensure preferredAuthors exists
    if (!prefs.preferredAuthors) {
      prefs.preferredAuthors = [];
    }
    
    // Fetch sources
    try {
      const sources = await fetchSources();
      set({ userPreferences: prefs, sources });
    } catch (error) {
      console.error('Failed to fetch sources:', error);
      set({ userPreferences: prefs });
    }
  }
})); 