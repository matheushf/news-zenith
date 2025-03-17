import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/services/newsApi";
import ArticleCard from "@/components/ArticleCard";
import { Check, Plus } from "lucide-react";
import { newsCategories } from "@/services/newsApi";
import { cn } from "@/utils/utils";
import { useNewsStore } from "@/store/useNewsStore";

const MyFeedPage: React.FC = () => {
  // Get state and actions from Zustand store instead of context
  const filters = useNewsStore((state) => state.filters);
  const userPreferences = useNewsStore((state) => state.userPreferences);
  const sources = useNewsStore((state) => state.sources);
  const toggleSourcePref = useNewsStore((state) => state.toggleSourcePref);
  const toggleCategoryPref = useNewsStore((state) => state.toggleCategoryPref);
  const toggleAuthorPref = useNewsStore((state) => state.toggleAuthorPref);

  useEffect(() => {
    document.title = "News - My Feed";
  }, []);

  // Fetch articles with filters using React Query
  const { data, isLoading, error } = useQuery({
    queryKey: ["articles", filters],
    queryFn: () => fetchArticles(filters),
  });

  const articles = data?.articles || [];

  // Extract unique authors from articles for the sidebar
  const uniqueAuthors = React.useMemo(() => {
    const authors = articles
      .map(article => article.author)
      .filter(author => author && author.trim() !== '') // Filter out empty authors
      .filter((author, index, self) => self.indexOf(author) === index); // Keep unique values
    return authors;
  }, [articles]);

  // Filter articles based on user preferences
  const filteredArticles = articles.filter((article) => {
    // If no preferences are set, show all articles
    if (
      userPreferences.preferredSources.length === 0 &&
      userPreferences.preferredCategories.length === 0 &&
      userPreferences.preferredAuthors?.length === 0
    ) {
      return true;
    }

    // Check if article matches any of the preferred sources, categories, or authors
    const sourceMatch = userPreferences.preferredSources.includes(
      article.source.id
    );
    const categoryMatch = userPreferences.preferredCategories.includes(
      article.category
    );
    const authorMatch = article.author && userPreferences.preferredAuthors?.includes(article.author);

    return sourceMatch || categoryMatch || authorMatch;
  });

  // Render the component with MyFeed layout, source selection, etc.
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">My Feed</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Preferences sidebar */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold">My Sources</h2>
            <div className="space-y-2">
              {sources.map((source) => (
                <button
                  key={source.id}
                  onClick={() => toggleSourcePref(source.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                    userPreferences.preferredSources.includes(source.id)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <span>{source.name}</span>
                  {userPreferences.preferredSources.includes(source.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">My Categories</h2>
            <div className="space-y-2">
              {newsCategories.map((category, index) => (
                <button
                  key={`${index}-${category}`}
                  onClick={() => toggleCategoryPref(category.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                    userPreferences.preferredCategories.includes(category.id)
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  )}
                >
                  <span className="capitalize">{category.name}</span>
                  {userPreferences.preferredCategories.includes(category.id) ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Plus className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-semibold">My Authors</h2>
            {uniqueAuthors.length > 0 ? (
              <div className="space-y-2">
                {uniqueAuthors.map((author) => (
                  <button
                    key={author}
                    onClick={() => toggleAuthorPref(author)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm transition-colors",
                      userPreferences.preferredAuthors?.includes(author)
                        ? "bg-primary/10 text-primary"
                        : "hover:bg-muted"
                    )}
                  >
                    <span>{author}</span>
                    {userPreferences.preferredAuthors?.includes(author) ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Plus className="h-4 w-4" />
                    )}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No authors available. Try loading more articles.
              </p>
            )}
          </div>
        </div>

        {/* Articles grid */}
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="flex h-64 w-full items-center justify-center">
              <p>Loading articles...</p>
            </div>
          ) : error ? (
            <div className="flex h-64 w-full items-center justify-center">
              <p>Error loading articles</p>
            </div>
          ) : filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="flex h-64 w-full flex-col items-center justify-center text-center">
              <p className="text-lg font-medium">No articles in your feed</p>
              <p className="mt-2 text-muted-foreground">
                Try selecting some sources, categories, or authors
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyFeedPage;
