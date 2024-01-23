import { Routes, Route } from 'react-router';
import HomePage from './pages/HomePage';
import Bet from './pages/Bet';
import "@solana/wallet-adapter-react-ui/styles.css";
import "./App.css";
import WalletContextProvider from './pages/wallet/WalletContext.jsx';
import HaryBet from "./pages/HaryBet/index.jsx";

function App() {
  return (
    <>
      <WalletContextProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/bet' element={<Bet />} />
          <Route path="/harybet" element={<HaryBet />} />
        </Routes>
      </WalletContextProvider>
    </>
  )
}

export default App
