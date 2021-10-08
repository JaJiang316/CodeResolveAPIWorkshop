import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";


function SearchBar(props) {
  return(
    <form method="get">
      <label htmlFor="header-search">
        <span className="visually-hidden">Search a Stock </span>
      </label>
      <input
        type="text"
        id="header-search"
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            props.searchStock(e.target.value);
          }
        }}
        placeholder="TSLA"
      />
      <button type="button" onClick={props.handlingSubmit}>Search</button>
    </form>
  )
}

function Stock() {
  const [jsonData, setData] = useState([]);
  const [search, setSearch] = useState("");
  let x = [];
  let close = [];
  let high = [];
  let low = [];
  let open = [];

  const handleSubmit = () => {
    setSearch(document.getElementById("header-search").value);
  };

  useEffect(() => {
    const API_KEY = "HGJWFG4N8AQ66ICD";
    let StockSymbol = search;
    // console.log(StockSymbol);
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    fetch(API_Call)
      .then((response) =>
        response.json()
      )
      .then((data) => {
        console.log(data);
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
  console.log(jsonData); 

  return (
    <div>
      <h1>Stock Market</h1>
      <SearchBar handlingSubmit={handleSubmit} searchStock = {setSearch}/>
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
        layout={{ width: 1500, height: 1000, title: search}}
      />
    </div>
  );
}

export default Stock;
