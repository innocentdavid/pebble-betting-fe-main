import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import WalletContextProvider from '../src/pages/wallet/WalletContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <WalletContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WalletContextProvider>
  </>
)
