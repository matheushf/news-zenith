import { Calendar, Filter, SlidersHorizontal } from 'lucide-react';
import { useFiltersStore } from '@/pages/HomePage/store/useFiltersStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from '@/utils/utils';
import { NewsCategory, DateRangeOption, SortOption, NewsSource } from '@/types/news';

const newsCategories = [
  { id: 'business', name: 'Business' },
  { id: 'crime', name: 'Crime' },
  { id: 'domestic', name: 'Domestic' },
  { id: 'education', name: 'Education' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'environment', name: 'Environment' },
  { id: 'food', name: 'Food' },
  { id: 'health', name: 'Health' },
  { id: 'lifestyle', name: 'Lifestyle' },
  { id: 'politics', name: 'Politics' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'technology', name: 'Technology' },
  { id: 'top', name: 'Top Stories' },
  { id: 'tourism', name: 'Tourism' },
  { id: 'world', name: 'World' },
  { id: 'other', name: 'Other' }
];

const newsSources = [
  { id: 'abc-news', name: 'ABC News' },
  { id: 'bbc-news', name: 'BBC News' },
  { id: 'cnn', name: 'CNN' },
  { id: 'bloomberg', name: 'Bloomberg' },
  { id: 'business-insider', name: 'Business Insider' },
  { id: 'buzzfeed', name: 'BuzzFeed' },
  { id: 'fox-news', name: 'Fox News' }
];

const FiltersBar = () => {
  const filters = useFiltersStore(state => state.filters);
  const sources = useFiltersStore(state => state.sources);
  const setFilters = useFiltersStore(state => state.setFilters);
  const resetFilters = useFiltersStore(state => state.resetFilters);
  
  const handleCategoryChange = (value: string) => {
    setFilters({ category: value as NewsCategory });
  };
  
  const handleSourceChange = (value: string) => {
    setFilters({ source: value as NewsSource });
  };
  
  const handleDateRangeChange = (value: string) => {
    setFilters({ dateRange: value as DateRangeOption });
  };
  
  const handleSortChange = (value: string) => {
    setFilters({ sortBy: value as SortOption });
  };
  
  const hasActiveFilters = filters.category !== 'all' || filters.source !== 'all' || filters.dateRange !== 'month' || filters.sortBy !== 'newest';
  
  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 animate-slide-down">
      <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
        <SelectTrigger className="w-[160px] border-none bg-secondary">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {newsCategories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Sources */}
      <Select value={filters.source || 'all'} onValueChange={handleSourceChange}>
        <SelectTrigger className="w-[160px] border-none bg-secondary">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {newsSources.map((source) => (
            <SelectItem key={source.id} value={source.id}>
              {source.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {/* Date Range */}
      <Select value={filters.dateRange} onValueChange={handleDateRangeChange}>
        <SelectTrigger className="w-[160px] border-none bg-secondary">
          <Calendar className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
          <SelectItem value="custom">Custom Range</SelectItem>
        </SelectContent>
      </Select>
      
      {/* Sort Options */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="border-none bg-secondary">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Sort by
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                filters.sortBy === 'newest' && "bg-accent"
              )}
              onClick={() => handleSortChange('newest')}
            >
              Newest First
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                filters.sortBy === 'oldest' && "bg-accent"
              )}
              onClick={() => handleSortChange('oldest')}
            >
              Oldest First
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                filters.sortBy === 'relevance' && "bg-accent"
              )}
              onClick={() => handleSortChange('relevance')}
            >
              Relevance
            </Button>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Reset Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          className="text-sm text-muted-foreground hover:text-foreground"
          onClick={resetFilters}
        >
          Reset filters
        </Button>
      )}
    </div>
  );
};

export default FiltersBar;
