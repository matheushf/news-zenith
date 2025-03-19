import { create } from 'zustand';
import { 
  NewsFilters, 
  NewsSource
} from '@/types/news';
import useStorage from '@/hooks/use-storage';

const defaultFilters: NewsFilters = {
  query: '',
  category: 'all',
  source: 'all',
  dateRange: 'month',
  sortBy: 'newest',
};

interface NewsState {
  filters: NewsFilters;
  sources: NewsSource[];
  setFilters: (filters: Partial<NewsFilters>) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<NewsState>((set, get) => {
  return {
    filters: {
      ...defaultFilters,
      category: defaultFilters.category,
      source: defaultFilters.source,
    },
    sources: [],
    
    // Actions
    setFilters: (newFilters) => set(state => ({ 
      filters: { ...state.filters, ...newFilters }
    })),
    
    resetFilters: () => set({ filters: defaultFilters }),
  };
}); 