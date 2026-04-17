# FoxDen Syndicate

> A React-powered stock volatility picker focused on NYSE-listed equities.

Built for the 2026 HackMesa Event.

---

## What It Does

FoxDen Syndicate helps investors identify NYSE stocks based on volatility profiles. Users can filter and rank stocks by volatility metrics to find opportunities that match their risk tolerance — whether they're looking for stable blue-chips or high-movement plays.

---

## Features

- Browse and search NYSE-listed stocks
- View volatility metrics (Beta, ATR, standard deviation, 52-week range %)
- Filter stocks by volatility tier: Low / Medium / High
- Sort and compare stocks side-by-side
- Visual volatility charts powered by real market data
- Stock detail view with historical price movement
- No login or account required — fully stateless

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 |
| State Management | Zustand |
| Charting | Recharts |
| Styling | Tailwind CSS |
| Market Data API | Massive (NYSE data, powered by Polygon) |
| Build Tool | Vite |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Free API key from [Massive](https://massive.io) (sign up → Keys)

### Installation

```bash
git clone https://github.com/w1ld3w0rks/FoxDen-Syndicate.git
cd FoxDen-Syndicate
npm install
```

### Environment Variables

Copy the example file and fill in your key:

```bash
cp .env.example .env
```

```env
VITE_MARKET_API_KEY=your_massive_api_key_here
VITE_MARKET_API_BASE_URL=https://api.massive.io/v2
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── StockCard.jsx
│   └── FilterPanel.jsx
├── pages/              # Route-level views
│   └── StockList.jsx
├── hooks/              # Custom React hooks
│   └── useStocks.js
├── services/           # API calls
│   └── massiveApi.js
└── utils/              # Volatility calculation helpers
    └── volatility.js
```

---

## Volatility Metrics Explained

| Metric | Description |
|---|---|
| **ATR** | Average True Range — average daily price swing |
| **Std Dev** | Standard deviation of daily returns over a rolling window |
| **52-Week Range %** | How far the stock has moved from its 52-week low to high |
| **Tier** | Low / Medium / High — based on annualized standard deviation |

---

## Branch Strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, deployable code only |
| `dev` | Integration branch — merge feature branches here first |
| `feature/your-name` | Your individual work |

### For collaborators

1. Get added as a collaborator: repo owner goes to **Settings → Collaborators → Add people**
2. Clone the repo and create your branch off `dev`:

```bash
git clone https://github.com/w1ld3w0rks/FoxDen-Syndicate.git
cd FoxDen-Syndicate
git checkout dev
git checkout -b feature/your-name
```

3. Copy `.env.example` to `.env` and add your own Massive API key
4. Make your changes, commit, and push:

```bash
git add .
git commit -m "add: description of your change"
git push origin feature/your-name
```

5. Open a Pull Request into `dev` on GitHub

---

## License

MIT
