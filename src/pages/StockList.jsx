import { useState } from 'react'
import { useStocks } from '../hooks/useStocks'
import StockCard from '../components/StockCard'
import FilterPanel from '../components/FilterPanel'

export default function StockList() {
  const { stocks, loading, error } = useStocks()
  const [tier, setTier] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = stocks.filter((s) => {
    const matchesTier = tier === 'All' || s.tier === tier
    const matchesSearch = s.ticker.toLowerCase().includes(search.toLowerCase())
    return matchesTier && matchesSearch
  })

  if (loading) return <p className="text-gray-400">Loading NYSE data...</p>
  if (error) return <p className="text-red-400">Error: {error}</p>

  return (
    <div>
      <FilterPanel tier={tier} onTierChange={setTier} search={search} onSearchChange={setSearch} />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((stock) => (
          <StockCard key={stock.ticker} stock={stock} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-gray-500 mt-8 text-center">No stocks match your filter.</p>
      )}
    </div>
  )
}
