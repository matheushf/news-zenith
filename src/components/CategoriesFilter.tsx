import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const newsCategories = [
  { id: "business", name: "Business" },
  { id: "crime", name: "Crime" },
  { id: "domestic", name: "Domestic" },
  { id: "education", name: "Education" },
  { id: "entertainment", name: "Entertainment" },
  { id: "environment", name: "Environment" },
  { id: "food", name: "Food" },
  { id: "health", name: "Health" },
  { id: "lifestyle", name: "Lifestyle" },
  { id: "politics", name: "Politics" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Technology" },
  { id: "top", name: "Top Stories" },
  { id: "tourism", name: "Tourism" },
  { id: "world", name: "World" },
  { id: "other", name: "Other" },
];

export default function CategoriesFilter({
  value,
  handleCategoryChange,
}: {
  value: string;
  handleCategoryChange: (value: string) => void;
}) {
  return (
    <Select value={value || "all"} onValueChange={handleCategoryChange}>
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
  );
}
