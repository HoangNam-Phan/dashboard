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
      <h2 className="text-2xl font-bold mb-2 lg:mb-5">News</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ol className="h-full overflow-y-auto space-y-5 lg:pr-3">
          {news?.articles.map((article) => {
            return (
              <div
                className="flex flex-col bg-white rounded-lg shadow-lg p-3"
                key={`${article.author}-${article.publishedAt}`}
              >
                {article.urlToImage ? (
                  <img
                    className="rounded-lg hidden lg:block"
                    src={article.urlToImage ?? ''}
                    alt={article.title}
                  />
                ) : null}
                <h3
                  className={`font-semibold mb-5 ${
                    article.urlToImage ? 'lg:my-5' : 'mb-5'
                  }`}
                >
                  {article.title}
                </h3>
                <p className="mb-5 overflow-x-hidden">{article.description}</p>
                <span className="italic">
                  {article.author ? `- ${article.author}` : ''}
                </span>
                <a
                  target="_blank"
                  className="block mt-3 text-blue-700 hover:underline self-end"
                  href={article.url}
                >
                  read more...
                </a>
              </div>
            );
          })}
        </ol>
      )}
    </div>
  );
}
