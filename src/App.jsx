import { useState, useEffect } from "react";

export default function App() {
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const tickers = [
      "AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA",
      "TSLA", "AMD", "NFLX", "PLTR",
      "KO", "PG", "JNJ", "PEP"
    ];

      const results = await Promise.all(
        tickers.map(async (t) => {
          const res = await fetch(`http://localhost:3001/stock/${t}`);
          return res.json();
        })
      );

      setStocks(results);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Stock Data</h1>

      {stocks.map((s) => (
        <div key={s.name}>
          <h3>{s.name}</h3>
          <p>{JSON.stringify(s.prices)}</p>
        </div>
      ))}
    </div>
  );
}