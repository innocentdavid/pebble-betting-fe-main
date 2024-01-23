// import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
// import { ConnectionProvider, useLocalStorage, WalletProvider } from '@solana/wallet-adapter-react';
// import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
// import {
//     // GlowWalletAdapter,
//     PhantomWalletAdapter,
//     // SlopeWalletAdapter,
//     SolflareWalletAdapter,
//     TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl } from '@solana/web3.js';
// import React, { FC, ReactNode, useMemo } from 'react';
// // import FC 

// import ('@solana/wallet-adapter-react-ui/styles.css');

// export default function WalletContextProvider ({ children })  {
//   // The network can be set to 'devnet', 'testnet', or 'mainnet'.
//   const network = WalletAdapterNetwork.Devnet;
//   const [autoConnect, setAutoConnect] = useLocalStorage('autoConnect', false);
//   // You can also provide a custom RPC endpoint.
//   const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//   // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
//   // Only the wallets you configure here will be compiled into your application, and only the dependencies
//   // of wallets that your users connect to will be loaded.
//   const wallets = useMemo(
//       () => [
//           new PhantomWalletAdapter(),
//         //   new GlowWalletAdapter(),
//         //   new SlopeWalletAdapter(),
//           new SolflareWalletAdapter({ network }),
//           new TorusWalletAdapter(),
//       ],
//       [network]
//   );

//   return (
//       <ConnectionProvider endpoint={endpoint}>
//           <WalletProvider wallets={wallets} autoConnect>
//               <WalletModalProvider>{children}</WalletModalProvider>
//           </WalletProvider>
//       </ConnectionProvider>
//   );
// };

import React, { FC, ReactNode, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { Coin98WalletAdapter, /*LedgerWalletAdapter,*/ NekoWalletAdapter, PhantomWalletAdapter, SkyWalletAdapter, TokenPocketWalletAdapter, UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';


export const WalletContextProvider = ({
  children,
}) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [

      new PhantomWalletAdapter(),
      new Coin98WalletAdapter(),
      // new LedgerWalletAdapter(),
      new NekoWalletAdapter(),
      new SkyWalletAdapter(),
      new TokenPocketWalletAdapter(),
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};


export default WalletContextProvider;
