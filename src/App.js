import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import CreateAeroNFT from './pages/CreateAeroNFT';

const App = () => {
  const [walletId, setWalletId] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-light text-secondary">
        <header className="p-4 bg-primary text-light flex justify-between items-center">
          <h1 className="text-xl">Airline Loyalty</h1>
          <div className="flex items-center">
            <Link to="/create-nft" className="text-white mr-4">Create NFT</Link>
            {walletId ? (
              <span>Wallet ID: {walletId}</span>
            ) : (
              <ConnectWallet onWalletCreated={setWalletId} />
            )}
          </div>
        </header>
        <main className="p-4">
          <Routes>
            <Route path="/create-nft" element={<CreateAeroNFT onTokenCreated={() => {}} />} />
            {/* Adicione outras rotas conforme necessário */}
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
