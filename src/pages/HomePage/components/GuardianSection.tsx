import { useQuery } from '@tanstack/react-query';
import { useFiltersStore } from '@/pages/HomePage/store/useFiltersStore';
import { fetchGuardianArticles } from '@/services/theGuardian';
import ArticleCard from '@/components/ArticleCard';

const GuardianSection = () => {
  const filters = useFiltersStore(state => state.filters);

  const { 
    data: articles,
    isLoading,
    error 
  } = useQuery({
    queryKey: ['guardianArticles', filters.dateRange, filters.query, filters.sortBy],
    queryFn: () => fetchGuardianArticles(filters)
  });

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          The Guardian
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            Latest from The Guardian
          </span>
        </h2>
        <button className="text-sm text-primary hover:underline">
          View all Guardian articles →
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={`guardian-skeleton-${index}`} className="h-[200px] animate-pulse rounded-lg bg-gray-200" />
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500">
            Error loading Guardian articles
          </div>
        ) : (
          articles?.map((article) => (
            <ArticleCard 
              key={article.id}
              article={article}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default GuardianSection; 