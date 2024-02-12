'use client';

import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Loading from './modules/Loading';
import { popularStocksAndCrypto, fetchStockData } from '@/lib/stocks';

type StocksProps = {
  t: (key: string) => string;
};

export default function Stocks({ t }: StocksProps) {
  const [displayedStock, setDisplayedStock] = useState(
    popularStocksAndCrypto[0]
  );
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState({});

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
          text: `${displayedStock.name} price chart`,
        },
        xAxis: {
          categories: chartCategories.reverse(),

          labels: {
            formatter: function (
              this: Highcharts.AxisLabelsFormatterContextObject
            ): string {
              return Highcharts.dateFormat(
                '%H:%M',
                new Date(this.value).getTime()
              );
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
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        containerProps={{ style: { width: '100%', height: '100%' } }}
      />
      <div className="flex flex-col pb-5">
        <h2 className="text-xl mb-3">{t('stocks.trending')}</h2>
        <div className="flex flex-col overflow-y-auto">
          <ol className="mr-5 ml-2">
            {popularStocksAndCrypto.map((stock, index) => {
              return (
                <button
                  type="button"
                  className={`
                    text-sm md:text-md text-center block shadow-lg text-blue-700 border border-blue-500
                    rounded-lg text-left w-full p-1 sm:p-2 my-3 hover:bg-blue-500 hover:text-white
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
