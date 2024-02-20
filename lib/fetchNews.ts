'use server';

export async function fetchNewsData() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch news data');
  }

  return res.json();
}
