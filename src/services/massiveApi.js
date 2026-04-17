const BASE_URL = import.meta.env.VITE_MARKET_API_BASE_URL
const API_KEY = import.meta.env.VITE_MARKET_API_KEY

async function get(path, params = {}) {
  const url = new URL(`${BASE_URL}${path}`)
  url.searchParams.set('apiKey', API_KEY)
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v))

  const res = await fetch(url.toString())
  if (!res.ok) throw new Error(`API error ${res.status}: ${res.statusText}`)
  return res.json()
}

// Full NYSE market snapshot — price, volume, day change for all tickers
// Docs: GET /v2/snapshot/locale/us/markets/stocks/tickers
export async function getNYSESnapshots() {
  return get('/snapshot/locale/us/markets/stocks/tickers', {
    include_otc: 'false',
  })
}

// Daily OHLCV bars for a single ticker — used to calculate ATR and std dev
// Docs: GET /v2/aggs/ticker/{stocksTicker}/range/{multiplier}/{timespan}/{from}/{to}
export async function getDailyBars(ticker, from, to) {
  return get(`/aggs/ticker/${ticker}/range/1/day/${from}/${to}`, {
    adjusted: 'true',
    sort: 'asc',
    limit: 90,
  })
}

// Ticker overview — name, sector, market cap, exchange
// Docs: GET /v2/reference/tickers/{ticker}
export async function getTickerDetails(ticker) {
  return get(`/reference/tickers/${ticker}`)
}

// Top market movers — biggest gainers or losers today
// Docs: GET /v2/snapshot/locale/us/markets/stocks/{direction}
export async function getTopMovers(direction = 'gainers') {
  return get(`/snapshot/locale/us/markets/stocks/${direction}`)
}
