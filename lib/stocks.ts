import Highcharts from 'highcharts';

export const popularStocksAndCrypto = [
  { name: 'Apple', identifier: 'AAPL' },
  { name: 'Alphabet', identifier: 'GOOGL' },
  { name: 'Amazon', identifier: 'AMZN' },
  { name: 'Microsoft', identifier: 'MSFT' },
  { name: 'Tesla', identifier: 'TSLA' },
  { name: 'Meta', identifier: 'META' },
  { name: 'NVIDIA', identifier: 'NVDA' },
  { name: 'IBM', identifier: 'IBM' },
];

export const testChartData = {
  title: {
    text: 'AAPL Stock Price',
  },
  xAxis: {
    categories: [
      '2024-02-01 09:30:00',
      '2024-02-01 09:35:00',
      '2024-02-01 09:40:00',
      '2024-02-01 09:45:00',
      '2024-02-01 09:50:00',
    ],
    labels: {
      formatter: function (
        this: Highcharts.AxisLabelsFormatterContextObject
      ): string {
        return Highcharts.dateFormat('%H:%M', new Date(this.value).getTime());
      },
    },
  },
  yAxis: {
    title: {
      text: 'Price (USD)',
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: [
    {
      data: [150.0, 151.2, 149.5, 152.3, 153.8],
    },
  ],
};

export async function fetchStockData(identifier: string) {
  const apiKeys = ['9L07PLSOF1WETUUF', 'NLCFSMIZZVO0H7CK'];
  const res = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${identifier}&interval=60min&apikey=NLCFSMIZZVO0H7CK`
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}
