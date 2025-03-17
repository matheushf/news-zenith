import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { fetchArticleById } from '@/services/newsApi';
import { format } from 'date-fns';

const ArticlePage = () => {
  const { id } = useParams<{ id: string }>();
  
  const { data: article, isLoading, error } = useQuery({
    queryKey: ['article', id],
    queryFn: () => fetchArticleById(id as string),
    enabled: !!id
  });
  
  useEffect(() => {
    if (article) {
      document.title = `${article.title} - News`;
    }
  }, [article]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center">
        <p>Loading article...</p>
      </div>
    );
  }
  
  if (error || !article) {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center">
        <p>Error loading article</p>
      </div>
    );
  }
  
  const formattedDate = format(new Date(article.publishedAt), 'MMMM dd, yyyy');
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to articles
      </Link>
      
      <article className="mx-auto max-w-3xl">
        <header className="mb-8">
          <h1 className="mb-4 text-3xl font-bold leading-tight md:text-4xl">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <span className="rounded bg-primary/10 px-2.5 py-0.5 font-medium text-primary">
                {article.source.name}
              </span>
            </div>
            
            {/* Display author with icon */}
            <div className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              <span>{article.author || 'Unknown author'}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </header>
        
        {article.image && (
          <div className="mb-8 overflow-hidden rounded-lg">
            <img 
              src={article.image} 
              alt={article.title} 
              className="h-auto w-full object-cover"
            />
          </div>
        )}
        
        <div className="prose prose-lg max-w-none">
          <p className="lead text-xl font-medium">{article.description}</p>
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </div>
  );
};

export default ArticlePage; 