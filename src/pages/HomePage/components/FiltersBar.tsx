import { Calendar, Filter, SlidersHorizontal } from "lucide-react";
import { useFiltersStore } from "@/pages/HomePage/store/useFiltersStore";
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
import { cn } from "@/utils/utils";
import {
  NewsCategory,
  DateRangeOption,
  SortOption,
  NewsSource,
} from "@/types/news";
import CategoriesFilter from "@/components/CategoriesFilter";
import SourcesFilter from "@/components/SourceFilter";
import useStorage from "@/hooks/use-storage";
import { useEffect } from "react";

const FiltersBar = () => {
  const [categoriesValue] = useStorage("categoriesFilter");
  const [sourcesValue] = useStorage("sourcesFilter");
  const filters = useFiltersStore((state) => state.filters);
  const setFilters = useFiltersStore((state) => state.setFilters);
  const resetFilters = useFiltersStore((state) => state.resetFilters);

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

  useEffect(() => {
    setFilters({
      category: categoriesValue as NewsCategory,
      source: sourcesValue as NewsSource,
    });
  }, []);

  const hasActiveFilters =
    filters.category !== "all" ||
    filters.source !== "all" ||
    filters.dateRange !== "month" ||
    filters.sortBy !== "newest";

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4 animate-slide-down">
      <CategoriesFilter
        value={filters.category}
        handleCategoryChange={handleCategoryChange}
      />

      <SourcesFilter
        value={filters.source}
        handleSourceChange={handleSourceChange}
      />

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
                filters.sortBy === "newest" && "bg-accent"
              )}
              onClick={() => handleSortChange("newest")}
            >
              Newest First
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                filters.sortBy === "oldest" && "bg-accent"
              )}
              onClick={() => handleSortChange("oldest")}
            >
              Oldest First
            </Button>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                filters.sortBy === "relevance" && "bg-accent"
              )}
              onClick={() => handleSortChange("relevance")}
            >
              Relevance
            </Button>
          </div>
        </PopoverContent>
      </Popover>

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
