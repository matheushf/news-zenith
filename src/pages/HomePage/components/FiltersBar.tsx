import { Calendar, Filter, SlidersHorizontal } from 'lucide-react';
import { useNewsStore } from '@/store/useNewsStore';
import { newsCategories } from '@/services/newsApi';
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
import { NewsCategory, DateRangeOption, SortOption } from '@/types/news';

const FiltersBar = () => {
  const filters = useNewsStore(state => state.filters);
  const sources = useNewsStore(state => state.sources);
  const setFilters = useNewsStore(state => state.setFilters);
  const resetFilters = useNewsStore(state => state.resetFilters);
  
  const handleCategoryChange = (value: string) => {
    setFilters({ category: value as NewsCategory });
  };
  
  const handleSourceChange = (value: string) => {
    setFilters({ source: value });
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
      {/* Categories */}
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
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          {sources.map((source) => (
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
