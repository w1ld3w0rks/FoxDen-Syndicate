import "./App.css";
import { useCallback, useEffect, useMemo, useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3003";
const TEST_TICKERS = ["AAPL", "MSFT", "NVDA", "AMZN", "GOOGL", "GOOG", "META", "TSLA", "BRK.B"];

function formatFixed(value, digits = 4) {
  return Number.isFinite(value) ? value.toFixed(digits) : "—";
}

function formatPercent(value) {
  return Number.isFinite(value) ? `${value.toFixed(4)}%` : "—";
}

function normalizeRecommendation(raw) {
  return {
    ticker: raw.ticker ?? "—",
    open: Number(raw.open),
    high: Number(raw.high),
    low: Number(raw.low),
    close: Number(raw.close ?? raw.end),
    buyPrice: Number(raw.buyPrice),
    score: Number(raw.score),
    return: Number(raw.return),
    volatility: Number(raw.volatility),
  };
}

function calculateCandleGeometry(stock) {
  if (!stock) {
    return { bodyTop: 40, bodyHeight: 20, openLineTop: 50, closeLineTop: 50, bullish: true };
  }

  const high = stock.high;
  const low = stock.low;
  const open = stock.open;
  const close = stock.close;
  const range = Math.max(high - low, 0.0001);

  const openLineTop = ((high - open) / range) * 100;
  const closeLineTop = ((high - close) / range) * 100;
  const bodyTop = Math.min(openLineTop, closeLineTop);
  const bodyHeight = Math.max(Math.abs(openLineTop - closeLineTop), 2);

  return {
    bodyTop,
    bodyHeight,
    openLineTop,
    closeLineTop,
    bullish: close >= open,
  };
}

function App() {
  const [recommendations, setRecommendations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/recommendations`);
      if (!response.ok) {
        throw new Error(`API ${response.status}`);
      }

      const payload = await response.json();
      const list = (payload.recommendations ?? []).map(normalizeRecommendation);
      const ranked = list.sort((a, b) => b.score - a.score).slice(0, 3);

      setRecommendations(ranked);
      setSelected(ranked[0] ?? null);
    } catch (fetchError) {
      setRecommendations([]);
      setSelected(null);
      setError(fetchError.message || "Failed to load recommendations.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const rankMap = useMemo(
    () => new Map(recommendations.map((item, index) => [item.ticker, index + 1])),
    [recommendations]
  );

  const candle = calculateCandleGeometry(selected);

  return (
    <div className="app">
      <div className="shell">
        <header className="navbar panel topHero">
          <div>
            <p className="eyebrow">FoxDen Syndicate</p>
            <h1>Top 3 Stock Recommendations</h1>
            <p className="navbarDescription">
              Live Polygon.io market data is processed through our server-side
              scoring model to surface ranked opportunities with clear OHLC and
              buy-price context.
            </p>
          </div>

          <div className="navbarActions">
            <span className="market">
              <span className={`liveDot ${!loading && !error ? "online" : "offline"}`} aria-hidden="true" />
              {loading ? "Connecting 3003…" : error ? "API offline" : "Recommendations live"}
            </span>
            <button className="refreshBtn" onClick={loadData} title="Refresh data">
              ↻
            </button>
          </div>
        </header>

        {error && (
          <div className="apiError">
            <strong>API error:</strong> {error}
          </div>
        )}

        <main className="layout">
          <section className="dashboardGrid panel mainPanel">
            <aside className="watchlist">
              <div className="sectionHeading">
                <h3>Top 3 Picks</h3>
                <span>Ranked by score</span>
              </div>

              {loading && <p className="muted">Loading…</p>}

              {!loading && recommendations.length === 0 && !error && (
                <p className="muted">No recommendations returned.</p>
              )}

              {recommendations.map((stock, index) => (
                <button
                  key={stock.ticker}
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
                    <strong className={stock.return >= 0 ? "green" : "red"}>{formatPercent(stock.return)}</strong>
                    <span>Vol {formatPercent(stock.volatility)}</span>
                  </div>
                </button>
              ))}
            </aside>

            <section className="focusPanel">
              <div className="sectionHeading">
                <h3>{selected?.ticker ?? "—"} Details</h3>
                <span>Candlestick + Buy Price</span>
              </div>

              <div className="priceRow fourCols">
                <div>
                  <p className="muted">Buy Price</p>
                  <p className="price">${formatFixed(selected?.buyPrice, 4)}</p>
                </div>
                <div>
                  <p className="muted">Score</p>
                  <p className="price">{formatFixed(selected?.score)}</p>
                </div>
                <div>
                  <p className="muted">Return</p>
                  <p className={selected?.return >= 0 ? "priceChange green" : "priceChange red"}>
                    {formatPercent(selected?.return)}
                  </p>
                </div>
                <div>
                  <p className="muted">Volatility</p>
                  <p className="priceChange">{formatPercent(selected?.volatility)}</p>
                </div>
              </div>

              <div className="candleCard">
                <div className="candleHeader">
                  <h4>{selected?.ticker ?? "—"} OHLC</h4>
                  <span className={candle.bullish ? "green" : "red"}>
                    {candle.bullish ? "Bullish candle" : "Bearish candle"}
                  </span>
                </div>

                <div className="candleGraph" aria-label="Candlestick chart">
                  <div className="candleScale">
                    <span>High {formatFixed(selected?.high, 2)}</span>
                    <span>Low {formatFixed(selected?.low, 2)}</span>
                  </div>

                  <div className="candleCanvas">
                    <div className="candleWick" />
                    <div
                      className={`candleBody ${candle.bullish ? "bull" : "bear"}`}
                      style={{ top: `${candle.bodyTop}%`, height: `${candle.bodyHeight}%` }}
                    />
                    <div className="candleTick openTick" style={{ top: `${candle.openLineTop}%` }}>
                      Open ${formatFixed(selected?.open, 2)}
                    </div>
                    <div className="candleTick closeTick" style={{ top: `${candle.closeLineTop}%` }}>
                      Close ${formatFixed(selected?.close, 2)}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </section>

          <section className="testedStripPanel">
            <div className="sectionHeading">
              <h3>Stocks Tested</h3>
              <span>{TEST_TICKERS.length} tickers</span>
            </div>

            <div className="testedStripViewport" aria-label="All tested tickers">
              <div className="testedStripTrack">
                {[...TEST_TICKERS, ...TEST_TICKERS].map((ticker, index) => {
                  const rank = rankMap.get(ticker);
                  return (
                    <div
                      key={`${ticker}-${index}`}
                      className={`testedTickerChip ${rank ? "topRank" : ""}`}
                    >
                      <span>{ticker}</span>
                      <span className={rank ? "rankBadge" : "rankBadge rankBadgeMuted"}>
                        {rank ? `#${rank}` : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
