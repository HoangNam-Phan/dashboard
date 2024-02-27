'use server';

export async function fetchStockData(identifier: string) {
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${identifier}&interval=60min&apikey=${process.env.STOCKS_API_KEY}`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
