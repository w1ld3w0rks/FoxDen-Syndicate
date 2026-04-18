const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3002";

/** Generic fetch wrapper — throws on non-OK responses */
async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status}: ${msg}`);
  }
  return res.json();
}

function normaliseRecommendation(raw) {
  return {
    ticker: raw.ticker ?? raw.symbol ?? "-",
    score: Number(raw.score ?? 0),
    return: Number(raw.return ?? raw.expectedReturn ?? 0),
    volatility: Number(raw.volatility ?? raw.risk ?? 0),
  };
}

export async function fetchRecommendations() {
  const data = await apiFetch("/recommendations");
  const list = Array.isArray(data) ? data : data.recommendations ?? [];

  return list
    .map(normaliseRecommendation)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}
