import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const SearchBar = () => (
    <form action="/" method="get">
        <label htmlFor="header-search">
            <span className="visually-hidden">Search a Stock </span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="TSLA"
            name="s" 
        />
        <button type="submit">Search</button>
    </form>
);

function Stock() {
  const [jsonData, setData] = useState([]);
  let x = [];
  let close = [];
  let high = [];
  let low = [];
  let open = [];

  useEffect(() => {
    fetchStock();
    function fetchStock() {
      const API_KEY = 'HGJWFG4N8AQ66ICD';
      let StockSymbol = 'IBM';
      let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
      fetch(API_Call)
        .then(
          function (response) {
            return response.json();
          }
        )
        .then(
          (data) => {
            // console.log(data);
            setData(data['Time Series (Daily)']);
          }
        )
    }
  }, [])
  
  for(var key in jsonData){
    x.push(key);
    open.push(jsonData[key]['1. open']);
    high.push(jsonData[key]['2. high']);
    low.push(jsonData[key]['3. low']);
    close.push(jsonData[key]['4. close']);
  }

  console.log(jsonData);

    return (
      <div>
        <h1>Stock Market</h1>
        <SearchBar />
        <Plot
          data={[
            {
              type: 'candlestick',
              x: x,
              open: open,
              high: high,
              low: low,
              close: close
            }
          ]}
          layout={{width: 1500, height: 1000, title: 'FB'}}
        />
      </div>
    )
}

export default Stock;