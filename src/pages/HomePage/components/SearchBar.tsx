import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useFiltersStore } from '@/pages/HomePage/store/useFiltersStore';

const SearchBar = () => {
  const setFilters = useFiltersStore(state => state.setFilters);
  const currentQuery = useFiltersStore(state => state.filters.query);
  
  const [query, setQuery] = useState(currentQuery);
  
  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters({ query });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  
  const handleClear = () => {
    setQuery('');
    setFilters({ query: '' });
  };
  
  return (
    <form onSubmit={handleSearch} className="w-full max-w-xl">
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
        
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for news..."
          className="h-12 w-full rounded-full border bg-card px-10 py-2 text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
          
          <button
            type="submit"
            className="rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
