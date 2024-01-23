import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import { useRouter } from "../../hooks/use-router";
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import ReactTwitchEmbedVideo from "react-twitch-embed-video"
const HomePage = () => {
  const router = useRouter();
  const wallet = useWallet();
  const channel = 'talk2megooseman';
  const toBetting = () => {
    if (wallet.connected){
      router.push('/bet');
    }
    else{
      alert("Wallet is not connected!\n Please Connect your wallet!");
      return;
    }
  }

  const toHamster = () => {
    if (wallet.connected){
      router.push('/harybet');
    }
    else{
      alert("Wallet is not connected!\n Please Connect your wallet!");
      return;
    }
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row w-full flex-1">
        <Navbar />
        <div className="flex flex-col w-full px-5 py-10 bg-[#0B021D]">
          <p className="text-white">Live Matches</p>
          <div className="w-full mr-10 flex flex-row gap-3 mt-5">
            <img src="/images/match1.png" style={{width: '119px', height: '125px'}} onClick={toBetting}/>
            <img src="/images/match2.png" style={{width: '119px', height: '125px'}} onClick={toHamster}/>
            {/* <img src="/images/match3.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match4.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match5.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match6.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match7.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match8.png" style={{width: '119px', height: '125px'}}/> */}
          </div>
          <div className="flex flex-row w-full mr-5 gap-5">
            <ReactTwitchEmbedVideo width={'100%'} height={480} channel={channel} />
            {/* <img src="/images/video.png" className="cursor-pointer" style={{width: '705px', height: '486px'}} onClick={toBetting} ></img>
            <img src="/images/live_chat.png" style={{width: '300px', height: '542px'}}></img> */}
          </div>
        </div>
      </div>
      <Footer />

    </div>

  )
}

export default HomePage;