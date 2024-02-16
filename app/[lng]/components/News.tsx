'use client';

import { useState, useEffect } from 'react';
import type { NewsResponse } from '@/lib/types';
import Loading from './modules/Loading';
import { motion } from 'framer-motion';

type NewsProps = {
  t: (key: string) => string;
};

export default function News({ t }: NewsProps) {
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
      <h2 className="text-2xl font-bold mb-2 lg:mb-5">{t('news.title')}</h2>
      {isLoading ? (
        <Loading />
      ) : news ? (
        <motion.ul
          variants={{ visible: { transition: { staggerChildren: 0.5 } } }}
          className="h-full overflow-y-auto space-y-5 lg:pr-3"
        >
          {news?.articles.map((article) => {
            if (
              article.title === '[Removed]' ||
              article.description === '[Removed]'
            ) {
              return null;
            } else {
              return (
                <motion.li
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                  className="bg-slate-200 dark:bg-gray-400 text-gray-900 flex flex-col rounded-lg shadow-lg p-3"
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
                  <p className="mb-5 overflow-x-hidden">
                    {article.description}
                  </p>
                  <span className="italic">
                    {article.author ? `- ${article.author}` : ''}
                  </span>
                  <a
                    target="_blank"
                    className="block mt-3 text-blue-700 hover:underline self-end"
                    href={article.url}
                  >
                    {t('news.readMore')}
                  </a>
                </motion.li>
              );
            }
          })}
        </motion.ul>
      ) : (
        <p>{t('news.error')}</p>
      )}
    </div>
  );
}
