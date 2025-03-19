import { useQuery } from '@tanstack/react-query';
import { useFiltersStore } from '@/pages/HomePage/store/useFiltersStore';
import { fetchNewsApiArticles } from '@/services/newsOrg';
import ArticleCard from '@/components/ArticleCard';

const NewsApiSection = () => {
  const filters = useFiltersStore(state => state.filters);

  const { 
    data: articles,
    isLoading,
    error 
  } = useQuery({
    queryKey: ['newsApiArticles', filters],
    queryFn: () => fetchNewsApiArticles(filters)
  });

  return (
    <section className="mt-16 mb-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          NewsAPI.org
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            Featured on NewsAPI
          </span>
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          Array(3).fill(0).map((_, index) => (
            <div key={`newsapi-skeleton-${index}`} className="h-[200px] animate-pulse rounded-lg bg-gray-200" />
          ))
        ) : error ? (
          <div className="col-span-full text-center text-red-500">
            Error loading NewsAPI articles
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

export default NewsApiSection; 