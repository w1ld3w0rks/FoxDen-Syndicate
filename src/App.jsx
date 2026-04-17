import StockList from './pages/StockList'

export default function App() {
  return (
    <div className="min-h-screen bg-foxden-dark">
      <header className="border-b border-foxden-border px-6 py-4">
        <h1 className="text-2xl font-bold text-foxden-red">FoxDen Syndicate</h1>
        <p className="text-sm text-gray-400">NYSE Volatility Stock Picker</p>
      </header>
      <main className="px-6 py-8">
        <StockList />
      </main>
    </div>
  )
}
