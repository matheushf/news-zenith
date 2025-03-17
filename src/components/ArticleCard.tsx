import { useState } from 'react';
import { Article } from '@/types/news';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';

interface ArticleCardProps {
  article: Article;
  className?: string;
  style?: React.CSSProperties;
}

const ArticleCard = ({ article, className, style }: ArticleCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { title, description, image, publishedAt, source, author, category } = article;
  
  const formattedDate = formatDistanceToNow(new Date(publishedAt), { addSuffix: true });
  
  const getCategoryColor = (category: string) => {
    const colorMap: Record<string, string> = {
      technology: 'bg-blue-100 text-blue-800',
      business: 'bg-green-100 text-green-800',
      politics: 'bg-red-100 text-red-800',
      entertainment: 'bg-purple-100 text-purple-800',
      health: 'bg-emerald-100 text-emerald-800',
      science: 'bg-indigo-100 text-indigo-800',
      sports: 'bg-orange-100 text-orange-800',
      world: 'bg-slate-100 text-slate-800'
    };
    
    return colorMap[category.toLowerCase()] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className={`overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md ${className}`} style={style}>
      <Link to={`/article/${article.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center space-x-2">
              <span className="inline-block rounded bg-primary/80 px-2 py-0.5 text-xs font-medium text-primary-foreground">
                {source.name}
              </span>
              
              {category && (
                <span className={`inline-block rounded px-2 py-0.5 text-xs font-medium capitalize ${getCategoryColor(category)}`}>
                  {category}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="line-clamp-2 text-lg font-medium leading-tight">{title}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{description}</p>
          
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <span>By {author || 'Unknown'}</span>
            </div>
            <span>{formattedDate}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArticleCard;
