export type ChartOptions = {
  chart: {
    backgroundColor: string;
  };
  title: {
    text: string;
  };
  xAxis: {
    title: {
      text: string;
    };
    categories: string[];
    labels: {
      enabled: boolean;
    };
  };
  yAxis: {
    title: {
      text: string;
    };
  };
  legend: {
    enabled: boolean;
  };
  credits: {
    enabled: boolean;
  };
  series: {
    data: number[];
  }[];
};

export const initialChartOptions = {
  chart: {
    backgroundColor: '',
  },
  title: {
    text: '',
  },
  xAxis: {
    title: {
      text: '',
    },
    categories: [],
    labels: {
      enabled: false,
    },
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  legend: {
    enabled: false,
  },
  credits: {
    enabled: false,
  },
  series: [],
};

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
