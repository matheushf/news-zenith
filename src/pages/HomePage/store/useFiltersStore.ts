import { create } from 'zustand';
import { 
  NewsFilters, 
  NewsSource
} from '@/types/news';

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

export const useFiltersStore = create<NewsState>((set, get) => ({
  // Initial state
  filters: defaultFilters,
  sources: [],
  
  // Actions
  setFilters: (newFilters) => set(state => ({ 
    filters: { ...state.filters, ...newFilters }
  })),
  
  resetFilters: () => set({ filters: defaultFilters }),
})); 