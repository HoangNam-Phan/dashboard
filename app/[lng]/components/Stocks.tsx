'use client';

import { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { popularStocksAndCrypto, testChartData, fetchStockData } from '@/lib/stocks';

const chartStyles = {
  width: '550px',
  height: '350px',
};

export default function Stocks() {
  const [displayedStock, setDisplayedStock] = useState(
    popularStocksAndCrypto[0]
  );
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState({});

/*   useEffect(() => {
    const loadData = async () => {
      const data = await fetchStockData(displayedStock.identifier);
      const timeSeries = data['Time Series (60min)'];
      const chartCategories = [];
      const chartData = [];

      console.log(data);

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
            formatter: function (this: Highcharts.AxisLabelsFormatterContextObject): string {
              return Highcharts.dateFormat('%H:%M', new Date(this.value).getTime());
            },
          },
        },
        yAxis: {
          title: {
            text: 'Price (USD)',
          },
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
  }, [displayedStock]); */

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-full flex justify-around">
      <HighchartsReact
        highcharts={Highcharts}
        options={testChartData}
        containerProps={{ style: chartStyles }}
      />
      <div className="flex flex-col pb-5">
        <h2 className="text-xl mb-3">Trending</h2>
        <div className="flex flex-col overflow-y-auto">
          <ol className="mr-5">
            {popularStocksAndCrypto.map((stock, index) => {
              return (
                <button
                  className="bg-gray-100 block shadow-lg rounded-lg text-left w-full p-2 my-3"
                  key={`${stock.identifier}-${index}`}
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
