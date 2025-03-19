import CategoriesFilter from "@/components/CategoriesFilter";
import SourcesFilter from "@/components/SourceFilter";
import useStorage from "@/hooks/use-storage";
import { Button } from "@/components/ui/button";
import React from "react";

export default function PreferencesPage() {
  const [categoriesValue, setCategoriesValue] = useStorage<string>(
    "categoriesFilter",
    "all"
  );
  const [sourcesValue, setSourcesValue] = useStorage<string>(
    "sourcesFilter",
    "all"
  );
  const hasActiveFilters = categoriesValue !== "all" || sourcesValue !== "all";

  const resetFilters = () => {
    setCategoriesValue("all");
    setSourcesValue("all");
  };

  return (
    <div className="container flex flex-col items-center gap-4">
      <h1 className="mb-2 text-4xl font-medium leading-tight tracking-tight">
        Set filters preferences
      </h1>

      <CategoriesFilter
        value={categoriesValue}
        handleCategoryChange={setCategoriesValue}
      />
      <SourcesFilter
        value={sourcesValue}
        handleSourceChange={setSourcesValue}
      />

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
}
