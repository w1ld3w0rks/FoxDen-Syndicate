// Standard deviation of daily returns over N bars
export function calcStdDev(bars) {
  if (!bars || bars.length < 2) return null
  const returns = bars.slice(1).map((b, i) => (b.c - bars[i].c) / bars[i].c)
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length
  const variance = returns.reduce((sum, r) => sum + (r - mean) ** 2, 0) / returns.length
  return Math.sqrt(variance)
}

// Average True Range over the last N bars
export function calcATR(bars, period = 14) {
  if (!bars || bars.length < period + 1) return null
  const trs = bars.slice(1).map((b, i) => {
    const prev = bars[i]
    return Math.max(b.h - b.l, Math.abs(b.h - prev.c), Math.abs(b.l - prev.c))
  })
  const recent = trs.slice(-period)
  return recent.reduce((a, b) => a + b, 0) / recent.length
}

// 52-week range percentage: how far price has moved from 52w low
export function calc52WeekRangePct(low52, high52, current) {
  if (!low52 || !high52 || low52 === high52) return null
  return ((current - low52) / (high52 - low52)) * 100
}

// Assign volatility tier based on annualized std dev
export function getVolatilityTier(stdDev) {
  if (stdDev === null) return 'Unknown'
  const annualized = stdDev * Math.sqrt(252)
  if (annualized < 0.2) return 'Low'
  if (annualized < 0.4) return 'Medium'
  return 'High'
}
