const TIER_COLORS = {
  Low: 'bg-green-900 text-green-300',
  Medium: 'bg-yellow-900 text-yellow-300',
  High: 'bg-red-900 text-red-300',
  Unknown: 'bg-gray-700 text-gray-400',
}

export default function StockCard({ stock }) {
  const changeColor = stock.change >= 0 ? 'text-green-400' : 'text-red-400'

  return (
    <div className="bg-foxden-card border border-foxden-border rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold">{stock.ticker}</span>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${TIER_COLORS[stock.tier]}`}>
          {stock.tier}
        </span>
      </div>
      <div className="text-2xl font-semibold">
        {stock.price != null ? `$${stock.price.toFixed(2)}` : '—'}
      </div>
      <div className={`text-sm ${changeColor}`}>
        {stock.change != null ? `${stock.change >= 0 ? '+' : ''}${stock.change.toFixed(2)}% today` : '—'}
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Vol: {stock.volume != null ? stock.volume.toLocaleString() : '—'}
      </div>
    </div>
  )
}
