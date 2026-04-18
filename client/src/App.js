import "./App.css";
import { useState } from "react";

const mockStocks = [
  {
    symbol: "AAPL",
    price: 189.32,
    change: 1.21,
    company: "Apple Inc.",
    volume: "72.4M",
    sentiment: "Accumulating",
  },
  {
    symbol: "MSFT",
    price: 420.11,
    change: 0.85,
    company: "Microsoft",
    volume: "31.8M",
    sentiment: "Momentum",
  },
  {
    symbol: "NVDA",
    price: 912.44,
    change: 2.41,
    company: "NVIDIA",
    volume: "54.2M",
    sentiment: "Breakout",
  },
  {
    symbol: "AMZN",
    price: 182.28,
    change: -0.38,
    company: "Amazon",
    volume: "46.5M",
    sentiment: "Range-bound",
  },
  {
    symbol: "TSLA",
    price: 245.9,
    change: -2.15,
    company: "Tesla",
    volume: "89.7M",
    sentiment: "Volatile",
  },
];

const marketHighlights = [
  { label: "S&P 500", value: "+1.2%" },
  { label: "NASDAQ", value: "+0.9%" },
  { label: "DOW", value: "-0.3%" },
];

const quickStats = [
  { label: "Live signals", value: "24" },
  { label: "Win rate", value: "89%" },
  { label: "Active traders", value: "1.4k" },
];

function App() {
  const [selected, setSelected] = useState(mockStocks[0]);

  return (
    <div className="app">
      <div className="shell">
        <header className="navbar">
          <div>
            <p className="eyebrow">FoxDen Syndicate</p>
            <h1>Dark market intelligence with a cleaner edge.</h1>
          </div>
          <div className="navbarActions">
            <input placeholder="Search symbol" aria-label="Search symbol" />
            <span className="market">Market Open</span>
          </div>
        </header>

        <main className="layout">
          <section className="hero panel">
            <div className="heroCopy">
              <span className="heroBadge">Realtime trading desk</span>
              <h2>Sleek analytics in black glass and deep blue light.</h2>
              <p>
                Track momentum, spot market shifts, and focus attention on the
                symbols moving now.
              </p>

              <div className="statsGrid">
                {quickStats.map((stat) => (
                  <div key={stat.label} className="statCard">
                    <span>{stat.label}</span>
                    <strong>{stat.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="heroVisual">
              <div className="glowOrb" />
              <div className="signalCard">
                <p className="signalLabel">Priority signal</p>
                <h3>{selected.symbol}</h3>
                <p>{selected.company}</p>
                <div className="signalMeta">
                  <span>${selected.price.toFixed(2)}</span>
                  <span className={selected.change >= 0 ? "green" : "red"}>
                    {selected.change}%
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboardGrid">
            <aside className="panel watchlist">
              <div className="sectionHeading">
                <h3>Watchlist</h3>
                <span>Top movers</span>
              </div>

              {mockStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  className={`stockCard ${selected.symbol === stock.symbol ? "active" : ""}`}
                  onClick={() => setSelected(stock)}
                >
                  <div>
                    <strong>{stock.symbol}</strong>
                    <span>{stock.company}</span>
                  </div>
                  <div>
                    <strong>${stock.price.toFixed(2)}</strong>
                    <span className={stock.change >= 0 ? "green" : "red"}>
                      {stock.change}%
                    </span>
                  </div>
                </button>
              ))}
            </aside>

            <section className="panel focusPanel">
              <div className="sectionHeading">
                <h3>{selected.symbol} focus</h3>
                <span>{selected.sentiment}</span>
              </div>

              <div className="priceRow">
                <div>
                  <p className="muted">Current price</p>
                  <p className="price">${selected.price.toFixed(2)}</p>
                </div>
                <div>
                  <p className="muted">Daily move</p>
                  <p className={selected.change >= 0 ? "priceChange green" : "priceChange red"}>
                    {selected.change}%
                  </p>
                </div>
                <div>
                  <p className="muted">Volume</p>
                  <p className="priceChange">{selected.volume}</p>
                </div>
              </div>

              <div className="chart" aria-hidden="true">
                <span className="chartLine lineOne" />
                <span className="chartLine lineTwo" />
                <span className="chartGlow" />
              </div>

              <p className="info">
                Institutional activity remains elevated while momentum stays
                concentrated in large-cap technology and AI names.
              </p>
            </section>

            <aside className="panel insightPanel">
              <div className="sectionHeading">
                <h3>Market overview</h3>
                <span>Session pulse</span>
              </div>

              <div className="overviewList">
                {marketHighlights.map((item) => (
                  <div key={item.label} className="overviewItem">
                    <span>{item.label}</span>
                    <strong className={item.value.startsWith("-") ? "red" : "green"}>
                      {item.value}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="insightCard">
                <p className="muted">Desk insight</p>
                <h4>Risk remains controlled despite heavier volume.</h4>
                <p>
                  Rotation is still favoring growth, but defensive names are
                  holding key levels into the close.
                </p>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;