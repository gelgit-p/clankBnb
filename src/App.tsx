
import { Button } from "@/components/ui/button";
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TokenomicsPage from './pages/TokenomicsPage';
import { WagmiProvider } from 'wagmi';
import { config } from './config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WalletOptions from './layout/wallet-options';
import RoadmapPage from "./pages/RoadMap";

const queryClient = new QueryClient();


function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <Link to="/" className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
            Clankbnb
          </Link>
          <div className="flex gap-4">
          <Link to="/roadmap">
              <Button variant="outline">Roadmap</Button>
            </Link>
            <Link to="/tokenomics">
              <Button variant="outline">$ CLANKBNB</Button>
            </Link>
            <WagmiProvider config={config}>
              <QueryClientProvider client={queryClient}>
                {/* <ConnectWallet /> */}
                <WalletOptions />
                </QueryClientProvider>
            </WagmiProvider>
          </div>
        </header>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tokenomics" element={<TokenomicsPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;