import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

const newsSources = [
  { id: "abc-news", name: "ABC News" },
  { id: "bbc-news", name: "BBC News" },
  { id: "cnn", name: "CNN" },
  { id: "bloomberg", name: "Bloomberg" },
  { id: "business-insider", name: "Business Insider" },
  { id: "buzzfeed", name: "BuzzFeed" },
  { id: "fox-news", name: "Fox News" },
];

export default function SourcesFilter({
  value,
  handleSourceChange,
}: {
  value: string;
  handleSourceChange: (value: string) => void;
}) {
  return (
    <Select value={value || "all"} onValueChange={handleSourceChange}>
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
  );
}
