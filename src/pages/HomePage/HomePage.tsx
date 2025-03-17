import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchArticles } from '@/services/newsApi';
import SearchBar from '@/pages/HomePage/components/SearchBar';
import FiltersBar from '@/pages/HomePage/components/FiltersBar';
import ArticlesList from '@/components/ArticlesList';
import { useNewsStore } from '@/store/useNewsStore';

const HomePage: React.FC = () => {
  const filters = useNewsStore(state => state.filters);
  const initializeStore = useNewsStore(state => state.initializeStore);
  
  // Initialize the store when the component mounts
  useEffect(() => {
    initializeStore();
    document.title = "News - Home";
  }, [initializeStore]);
  
  // Fetch articles with filters
  const { 
    data,
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['articles', filters],
    queryFn: () => fetchArticles(filters)
  });

  const articles = data?.articles || [];
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mt-20 text-center animate-fade-in">
        <h1 className="mb-2 text-4xl font-medium leading-tight tracking-tight">
          Discover Today's <span className="text-primary">Top Stories</span>
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Stay informed with the latest news from multiple trusted sources, all in one place.
        </p>
      </div>
      
      <div className="mx-auto mt-8 flex justify-center">
        <SearchBar />
      </div>
      
      <FiltersBar />
      
      <ArticlesList articles={articles} isLoading={isLoading} error={error as Error} />
    </div>
  );
};

export default HomePage;
