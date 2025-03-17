import { Loader2 } from 'lucide-react';
import ArticleCard from './ArticleCard';
import { Article } from '@/types/news';

interface ArticlesListProps {
  articles: Article[];
  isLoading: boolean;
  error: Error | null;
}

const ArticlesList = ({ articles, isLoading, error }: ArticlesListProps) => {
  if (isLoading) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-4 text-muted-foreground">Loading articles...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center">
        <p className="text-destructive">Error loading articles</p>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </div>
    );
  }
  
  if (articles.length === 0) {
    return (
      <div className="flex h-64 w-full flex-col items-center justify-center text-center">
        <p className="text-lg font-medium">No articles found</p>
        <p className="mt-2 text-muted-foreground">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }
  
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article, index) => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          className="opacity-0 animate-slide-up"
          style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
        />
      ))}
    </div>
  );
};

export default ArticlesList;
