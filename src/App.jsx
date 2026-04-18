import { useState, useEffect } from "react";

export default function App() {
  const [topStocks, setTopStocks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3001/recommendations");
      const data = await res.json();

      setTopStocks(data.top3);
    }

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <h1>🏆 Top 3 Stocks Today</h1>

      {topStocks.map((s, i) => (
        <div
          key={s.ticker}
          style={{
            border: "1px solid #ddd",
            margin: "10px 0",
            padding: 10,
            borderRadius: 8,
          }}
        >
          <h2>
            #{i + 1} {s.ticker}
          </h2>

          <p>Score: {s.compositeScore.toFixed(4)}</p>
          <p>Return: {s.dailyReturnPct.toFixed(2)}%</p>
          <p>Volatility: {s.rangePct.toFixed(2)}%</p>
        </div>
      ))}
    </div>
  );
}