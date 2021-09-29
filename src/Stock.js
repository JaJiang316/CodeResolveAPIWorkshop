import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

/* To Do
  -Allow for searchable stocks
  -Make title change based off what stock is searched
*/

function Stock() {
  const [jsonData, setData] = useState([]);
  const [search, setSearch] = useState("");
  let x = [];
  let close = [];
  let high = [];
  let low = [];
  let open = [];

  const handleSubmit = (e) => {
    setSearch(document.getElementById("header-search").value);
  };

  const SearchBar = () => (
    <form method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search a Stock </span>
      </label>
      <input
        type="text"
        id="header-search"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            setSearch(e.target.value);
          }
        }}
        placeholder="TSLA"
      />
      <button type="button" value={search} onClick={handleSubmit}>Search</button>
    </form>
  );

  useEffect(() => {
    const API_KEY = "HGJWFG4N8AQ66ICD";
    let StockSymbol = search;
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setData(data["Time Series (Daily)"]);
      });
  }, [search]);

  for (var date in jsonData) {
    x.push(date);
    open.push(jsonData[date]["1. open"]);
    high.push(jsonData[date]["2. high"]);
    low.push(jsonData[date]["3. low"]);
    close.push(jsonData[date]["4. close"]);
  } 
  // console.log(jsonData); 

  return (
    <div>
      <h1>Stock Market</h1>
      <SearchBar />
      <Plot
        data={[
          {
            type: "candlestick",
            x: x,
            open: open,
            high: high,
            low: low,
            close: close
          }
        ]}
        layout={{ width: 1500, height: 1000, title: search }}
      />
    </div>
  );
}

export default Stock;
