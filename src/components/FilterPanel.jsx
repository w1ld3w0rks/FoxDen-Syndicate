const TIERS = ['All', 'Low', 'Medium', 'High']

export default function FilterPanel({ tier, onTierChange, search, onSearchChange }) {
  return (
    <div className="flex flex-wrap gap-4 items-center">
      <input
        type="text"
        placeholder="Search ticker..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-foxden-card border border-foxden-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-foxden-red w-48"
      />
      <div className="flex gap-2">
        {TIERS.map((t) => (
          <button
            key={t}
            onClick={() => onTierChange(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              tier === t
                ? 'bg-foxden-red text-white'
                : 'bg-foxden-card border border-foxden-border text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  )
}
