import { useState, useEffect } from 'react'
import { getNYSESnapshots } from '../services/massiveApi'
import { calcStdDev, calcATR, getVolatilityTier } from '../utils/volatility'

export function useStocks() {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const data = await getNYSESnapshots()
        const tickers = (data.tickers || []).map((t) => ({
          ticker: t.ticker,
          name: t.ticker,
          price: t.day?.c ?? t.lastTrade?.p ?? null,
          change: t.todaysChangePerc ?? null,
          volume: t.day?.v ?? null,
          stdDev: calcStdDev(t.prevDay ? [t.prevDay, t.day] : null),
          atr: calcATR(t.prevDay ? [t.prevDay, t.day] : null),
          tier: getVolatilityTier(calcStdDev(t.prevDay ? [t.prevDay, t.day] : null)),
        }))
        setStocks(tickers)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { stocks, loading, error }
}
