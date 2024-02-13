'use client';

import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loading from './modules/Loading';
import {
  ChartOptions,
  initialChartOptions,
  popularStocksAndCrypto,
  fetchStockData,
} from '@/lib/stocks';

type StocksProps = {
  t: (key: string) => string;
};

export default function Stocks({ t }: StocksProps) {
  const [displayedStock, setDisplayedStock] = useState(
    popularStocksAndCrypto[0]
  );
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<ChartOptions>(initialChartOptions);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchStockData(displayedStock.identifier);
      const timeSeries = data['Time Series (60min)'];
      const chartCategories = [];
      const chartData = [];

      for (let time in timeSeries) {
        chartCategories.push(time);
        chartData.push(parseFloat(timeSeries[time]['4. close']));
      }

      setOptions({
        title: {
          text: `${displayedStock.name} ${t('stocks.chartTitle')}`,
        },
        xAxis: {
          title: {
            text: t('stocks.xAxisTitle'),
          },
          categories: chartCategories.reverse(),
          labels: {
            enabled: false,
          },
        },
        yAxis: {
          title: {
            text: `${t('stocks.yAxisTitle')} (USD)`,
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
            data: chartData.reverse(),
          },
        ],
      });
      setLoading(false);
    };

    loadData();
  }, [displayedStock]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="h-full flex justify-around">
      {options?.series?.[0]?.data?.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          containerProps={{ style: { width: '100%', height: '100%' } }}
        />
      ) : (
        <div className="size-full flex items-center">
          <p>
            {t('stocks.apiLimitReached')}
          </p>
        </div>
      )}
      <div className="flex flex-col pb-5 pl-2">
        <h2 className="text-xl mb-3 ml-2">{t('stocks.trending')}</h2>
        <div className="flex flex-col overflow-y-auto">
          <ol className="mr-5 ml-2">
            {popularStocksAndCrypto.map((stock, index) => {
              return (
                <button
                  type="button"
                  className={`
                    text-sm md:text-md text-center block shadow-lg text-blue-700 border border-blue-500
                    rounded-lg text-left w-full p-1 sm:p-2 my-3 hover:bg-blue-500 hover:text-white transition duration-300
                    ${
                      stock === displayedStock
                        ? 'disabled:bg-blue-500 text-white'
                        : ''
                    }
                    `}
                  key={`${stock.identifier}-${index}`}
                  disabled={stock === displayedStock}
                  onClick={() => setDisplayedStock(stock)}
                >
                  <li>{stock.name}</li>
                </button>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
