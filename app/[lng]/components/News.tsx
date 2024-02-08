import { useState, useEffect } from 'react';
import type { NewsResponse } from '@/lib/types';

export default function News() {
  const [news, setNews] = useState<NewsResponse>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?country=us&apiKey=1d992f2df73c4024b7784330d4b8f0cb'
      );
      if (!response.ok) {
        setLoading(false);
        throw new Error('Failed to fetch news');
      }
      const newsData = await response.json();
      setNews(newsData);
      setLoading(false);
    }

    fetchTodos();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <h2 className="text-2xl font-bold mb-5">News</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ol className="h-full overflow-y-auto space-y-5 pr-3">
          {news?.articles.map((article) => {
            return (
              <div
                className="bg-white rounded-lg shadow-lg p-3"
                key={`${article.author}-${article.publishedAt}`}
              >
                <img src={article.urlToImage ?? ''} alt={article.title} />
                <h3 className="font-semibold my-5">{article.title}</h3>
                <p className="mb-5">{article.description}</p>
                <a
                  target="_blank"
                  className="text-blue-700 hover:underline"
                  href={article.url}
                >
                  more...
                </a>
              </div>
            );
          })}
        </ol>
      )}
    </div>
  );
}
