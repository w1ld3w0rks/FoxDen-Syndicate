import "./App.css";
import { useState, useEffect, useCallback } from "react";
import { fetchRecommendations } from "./api";

const TEST_TICKERS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "AMZN",
  "GOOGL",
  "GOOG",
  "META",
  "TSLA",
  "BRK.B",
];

function formatFixed(value) {
  return Number.isFinite(value) ? value.toFixed(4) : "—";
}

function formatPercent(value) {
  return Number.isFinite(value) ? `${value.toFixed(4)}%` : "—";
}

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tickerRankMap = new Map(
    recommendations.map((item, index) => [item.ticker, index + 1])
  );

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const topRecommendations = await fetchRecommendations();
      setRecommendations(topRecommendations);
      setSelected(topRecommendations[0] ?? null);
    } catch (err) {
      setError(err.message);
      setRecommendations([]);
      setSelected(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadData(); }, [loadData]);

  return (
    <div className="app">
      <div className="shell">
        <header className="navbar">
          <div>
            <p className="eyebrow">FoxDen Syndicate</p>
            <h1>Dark market intelligence with a cleaner edge.</h1>
          </div>
          <div className="navbarActions">
            <span className="market">
              <span
                className={`liveDot ${!loading && !error ? "online" : "offline"}`}
                aria-hidden="true"
              />
              {loading ? "Connecting 3002…" : error ? "API offline" : "Recommendations live"}
            </span>
            {!loading && (
              <button className="refreshBtn" onClick={loadData} title="Refresh data">
                ↻
              </button>
            )}
          </div>
        </header>

        {error && (
          <div className="apiError">
            <strong>API error:</strong> {error}
          </div>
        )}

        <main className="layout">
          <section className="hero panel">
            <div className="heroCopy">
              <span className="heroBadge">Realtime recommendation desk</span>
              <h2>Top 3 stock recommendations from your strategy API.</h2>
              <p>
                Recommendations are generated from Polygon.io API-key data and
                processed through our server-side scoring engine, so the client
                receives only ranked outputs instead of raw market payloads.
              </p>

              <div className="statsGrid">
                <div className="statCard">
                  <span>Recommendations loaded</span>
                  <strong>{recommendations.length}</strong>
                </div>
                <div className="statCard">
                  <span>Top ticker</span>
                  <strong>{recommendations[0]?.ticker ?? "—"}</strong>
                </div>
                <div className="statCard">
                  <span>Top score</span>
                  <strong>{formatFixed(recommendations[0]?.score)}</strong>
                </div>
              </div>
            </div>

            <div className="heroVisual">
              <div className="glowOrb" />
              <div className="signalCard">
                <p className="signalLabel">Top recommendation</p>
                <h3>{selected?.ticker ?? "—"}</h3>
                <p>Score: {formatFixed(selected?.score)}</p>
                <div className="signalMeta">
                  <span>Return {formatPercent(selected?.return)}</span>
                  <span className={(selected?.return ?? 0) >= 0 ? "green" : "red"}>
                    Vol {formatPercent(selected?.volatility)}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="dashboardGrid">
            <aside className="panel watchlist">
              <div className="sectionHeading">
                <h3>Top 3 picks</h3>
                <span>Ranked by score</span>
              </div>

              {loading && recommendations.length === 0 && (
                <p className="muted">Loading…</p>
              )}

              {!loading && recommendations.length === 0 && !error && (
                <p className="muted">No recommendations returned.</p>
              )}

              {recommendations.map((stock, index) => (
                <button
                  key={`${stock.ticker}-${index}`}
                  className={`stockCard ${selected?.ticker === stock.ticker ? "active" : ""}`}
                  onClick={() => setSelected(stock)}
                >
                  <div>
                    <strong>
                      #{index + 1} {stock.ticker}
                    </strong>
                    <span>Score {formatFixed(stock.score)}</span>
                  </div>
                  <div>
                    <strong className={stock.return >= 0 ? "green" : "red"}>
                      {formatPercent(stock.return)}
                    </strong>
                    <span>Vol {formatPercent(stock.volatility)}</span>
                  </div>
                </button>
              ))}
            </aside>

            <section className="panel focusPanel">
              <div className="sectionHeading">
                <h3>{selected?.ticker ?? "—"} criteria</h3>
                <span>3-factor detail</span>
              </div>

              <div className="priceRow">
                <div>
                  <p className="muted">Score</p>
                  <p className="price">{formatFixed(selected?.score)}</p>
                </div>
                <div>
                  <p className="muted">Return</p>
                  <p className={(selected?.return ?? 0) >= 0 ? "priceChange green" : "priceChange red"}>
                    {formatPercent(selected?.return)}
                  </p>
                </div>
                <div>
                  <p className="muted">Volatility</p>
                  <p className="priceChange">{formatPercent(selected?.volatility)}</p>
                </div>
              </div>
            </section>

            <aside className="panel insightPanel">
              <div className="sectionHeading">
                <h3>Stocks Tested</h3>
                <span>{TEST_TICKERS.length} tickers</span>
              </div>

              <div className="overviewList">
                {TEST_TICKERS.map((ticker) => (
                  <div key={ticker} className="overviewItem">
                    <span>{ticker}</span>
                    {tickerRankMap.has(ticker) ? (
                      <span className="rankBadge">#{tickerRankMap.get(ticker)}</span>
                    ) : (
                      <span className="rankBadge rankBadgeMuted">—</span>
                    )}
                  </div>
                ))}
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;