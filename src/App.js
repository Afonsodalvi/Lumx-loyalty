import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ConnectWallet from './components/ConnectWallet';
import CreateAeroNFT from './pages/CreateAeroNFT';
import MintToken from './pages/MintToken';
import Logo from './Logo_03.png'; // Importando a logo

const App = () => {
  const [wallet, setWallet] = useState(null);
  const [aeroTokenId, setAeroTokenId] = useState(null);
  const [pointsTokenId, setPointsTokenId] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-light text-secondary">
        <header className="p-4 bg-primary text-light flex justify-between items-center">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="logo-image" />
            <h1 className="text-xl ml-4">Airline Loyalty</h1>
          </div>
          <div className="flex items-center">
            <Link to="/create-nft" className="text-white mr-4">Create NFT</Link>
            <Link to="/flyNow" className="text-white mr-4">Fly Now</Link>
            {wallet ? (
              <span>Wallet ID: {wallet.id} - Address: {wallet.address}</span>
            ) : (
              <ConnectWallet onWalletCreated={setWallet} />
            )}
          </div>
        </header>
        <main className="p-4">
          <Routes>
            <Route
              path="/create-nft"
              element={<CreateAeroNFT onTokenCreated={(aeroId, pointsId) => {
                setAeroTokenId(aeroId);
                setPointsTokenId(pointsId);
              }} />}
            />
            <Route
              path="/flyNow"
              element={<MintToken walletId={wallet?.id} aeroTokenId={aeroTokenId} pointsTokenId={pointsTokenId} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
