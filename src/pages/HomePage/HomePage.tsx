import React, { useEffect } from "react";
import SearchBar from "@/pages/HomePage/components/SearchBar";
import FiltersBar from "@/pages/HomePage/components/FiltersBar";
import GuardianSection from "./components/GuardianSection";
import NewsDataSection from "./components/NewsDataSection";
import NewsApiSection from "./components/NewsApiSection";

const HomePage: React.FC = () => {
  useEffect(() => {
    document.title = "News - Home";
  }, []);

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mt-20 text-center animate-fade-in">
        <h1 className="mb-2 text-4xl font-medium leading-tight tracking-tight">
          Discover Today's <span className="text-primary">Top Stories</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Stay informed with the latest news from multiple trusted sources, all
          in one place.
        </p>
      </div>

      <div className="mx-auto mt-8 flex justify-center">
        <SearchBar />
      </div>

      <FiltersBar />

      <GuardianSection />
      <NewsDataSection />
      <NewsApiSection />
    </div>
  );
};

export default HomePage;
