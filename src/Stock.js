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
  const [stockChartXValues, setXValue] = useState([]);
  const [stockChartYValues, setYValue] = useState([]);
  const [jsonData, setData] = useState([]);

  useEffect(() => {
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
    fetchStock();
  }, [])

  console.log(jsonData);

    return (
      <div>
        <h1>Stock Market</h1>
        <SearchBar />
        <Plot
          data={[
            {
              x: {stockChartXValues},
              y: {stockChartYValues},
              type: 'candlestick',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 1000, height: 500, title: 'FB'}}
        />
      </div>
    )
}

export default Stock;



// import React from 'react';
// import Plot from 'react-plotly.js';

// class Stock extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       stockChartXValues: [],
//       stockChartYValues: []
//     }
//   }

//   componentDidMount() {
//     this.fetchStock();
//   }

//   fetchStock() {
//     const pointerToThis = this;
//     console.log(pointerToThis);
//     const API_KEY = 'HGJWFG4N8AQ66ICD';
//     let StockSymbol = 'FB';
//     let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
//     let stockChartXValuesFunction = [];
//     let stockChartYValuesFunction = [];

//     fetch(API_Call)
//       .then(
//         function(response) {
//           return response.json();
//         }
//       )
//       .then(
//         function(data) {
//           console.log(data);

//           for (var key in data['Time Series (Daily)']) {
//             stockChartXValuesFunction.push(key);
//             stockChartYValuesFunction.push(data['Time Series (Daily)'][key]['1. open']);
//           }

//           // console.log(stockChartXValuesFunction);
//           pointerToThis.setState({
//             stockChartXValues: stockChartXValuesFunction,
//             stockChartYValues: stockChartYValuesFunction
//           });
//         }
//       )
//   }

//   render() {
//     return (
//       <div>
//         <h1>Stock Market</h1>
//         <Plot
//           data={[
//             {
//               x: this.state.stockChartXValues,
//               y: this.state.stockChartYValues,
//               type: 'scatter',
//               mode: 'lines+markers',
//               marker: {color: 'red'},
//             }
//           ]}
//           layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
//         />
//       </div>
//     )
//   }
// }

// export default Stock;