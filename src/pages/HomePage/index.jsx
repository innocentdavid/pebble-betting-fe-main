import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
// import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import Footer from "../../components/footer";
import Navbar from "../../components/navbar";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import LiveChat from "../../components/LiveChat/LiveChat";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
// import { Button } from "@material-tailwind/react";
const HomePage = () => {
  // const channel = "talk2megooseman";
  const channel = "bobbypoffgaming";
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex flex-row w-full flex-1 h-screen overflow-hidden">
        <div className="hidden md:block">
          <Navbar />
        </div>
        <div className="flex flex-col w-full bg-[#0B021D] h-screen overflow-auto remove-scroll relative">
          {showMobileMenu && <div className="md:hidden fixed top-0 left-0 w-full h-screen overflow-auto remove-scroll remove-scroll z-50">
            <div className="absolute top-0 left-0 w-full h-screen bg-black/60 cursor-pointer" onClick={() => {
                  setShowMobileMenu(false);
                }}></div>
            <div className="absolute top-0 left-0">
              <Navbar />
            </div>
          </div>}
          <div className="flex justify-between items-center px-4 gap-4">
            <div className="md:hidden">
              <FaBars
                size={24}
                onClick={() => {
                  setShowMobileMenu(true);
                }}
                className="cursor-pointer"
              />
            </div>
            <div className="px-5 py-3 flex items-center justify-end">
              <div className="text-white mr-3 flex items-center gap-1">
                <img src="/icons/ion_wallet.png" alt="" />
                <div className="">
                  Your <br />
                  Wallet
                </div>
              </div>
              <div className="flex items-center rounded-[12px] bg-[#303e34]">
                <div className="mr-[25px] ml-2 flex items-center">
                  <img src="/images/solana.png" alt="solana logo" />
                  <div className="text-base font-[400] text-white">147</div>
                </div>
                <WalletMultiButton />
              </div>
            </div>
          </div>

          <div className="flex flex-col 1170:flex-row w-full gap-5 px-5 py-10">
            <ReactTwitchEmbedVideo
              width={"100%"}
              height={480}
              layout="video"
              theme="dark"
              channel={channel}
            />

            <LiveChat />
            {/* <img src="/images/video.png" className="cursor-pointer" style={{width: '705px', height: '486px'}} onClick={toBetting} ></img>
            <img src="/images/live_chat.png" style={{width: '300px', height: '542px'}}></img> */}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
