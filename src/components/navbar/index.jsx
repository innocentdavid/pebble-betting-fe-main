// import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@material-tailwind/react";
import { useRouter } from "../../hooks/use-router";
// import { Link } from "react-router-dom";
import { useWallet } from "@solana/wallet-adapter-react";

const Navbar = () => {
  const router = useRouter();
  const wallet = useWallet();

  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open("https://phantom.app/", "_blank");
  };

  const connectWallet = async () => {
    const provider = getProvider();
    try {
      const resp = await provider.connect();
      console.log(resp.publicKey.toString());
      // 26qv4GCcx98RihuK3c4T6ozB3J7L6VwCuFVc7Ta2A3Uo
    } catch (err) {
      console.log(err);
      // { code: 4001, message: 'User rejected the request.' }
    }
  };

  const toBetting = () => {
    if (wallet.connected) {
      router.push("match/bet");
    } else {
      alert("Wallet is not connected!\n Please Connect your wallet!");
      return;
    }
  };

  const toHamster = () => {
    if (wallet.connected) {
      router.push("match/harybet");
    } else {
      alert("Wallet is not connected!\n Please Connect your wallet!");
      return;
    }
  };

  return (
    // <div className="pt-5 bg-gradient-to-t from-[#433466] to-[#231B4A] flex flex-col items-center h-full w-[280px]">
      <div className="pt-5 bg-gradient-to-br from-[#52545A] via-[#373C48] to-[#272E3E] flex flex-col items-center h-full w-[280px]">
      {/* <WalletMultiButton /> */}
      <img src="/images/logo.svg" width={70} height={31} className="mt-2" />

      <div className="rounded-[8px] bg-[#150C2A] gap-1 px-5 py-2 flex flex-row mt-10">
        <img src="/images/token-icon.svg" width={24} height={24}></img>
        <p className="text-white">1 GYPR - 0.3$</p>
      </div>
      <Button
        className="rounded-[8px] bg-[#150C2A] mt-3 px-12 pt-3 pb-[14px] border border-[#4EAF90] capitalize text-base text-[#4EAF90]"
        onClick={connectWallet}
      >
        Buy Token
      </Button>

      <div className="mt-10 px-8">
        <p className="text-white">Live Matches</p>
        <div className="w-full mr-10 flex flex-col dflex-row gap-3 mt-5">
          {/* <Link to={"/match/bet"}> */}
          <img
            src="/images/marbles.png"
            className="h-[125px] w-full rounded-[6px] cursor-pointer"
            // style={{ width: "119px", height: "125px" }}
            onClick={toBetting}
          />
          {/* </Link> */}
          {/* <Link to={"/match/harybet"}> */}
          <img
            src="/images/solana_speedway.png"
            className="h-[125px] w-full rounded-[6px] cursor-pointer"
            // style={{ width: "119px", height: "125px" }}
            onClick={toHamster}
          />
          {/* </Link> */}
          {/* <img src="/images/match3.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match4.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match5.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match6.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match7.png" style={{width: '119px', height: '125px'}}/>
            <img src="/images/match8.png" style={{width: '119px', height: '125px'}}/> */}
        </div>
        <div className=""></div>
      </div>

      <div className="fixed bottom-0 pt-3 pb-6 px-8 backdrop-blur-sm bg-[#403163]/5">
        <Button className="w-full text-black mb-3 capitalize text-base bg-primary-gradient">
          Buy Crypto
        </Button>
        <img
          src="/images/credit_cards.svg"
          onClick={toBetting}
          className="cursor-pointer"
        />
      </div>

      <div className="hidden w-full mt-10">
        <div className="flex flex-row w-full justify-between cursor-pointer">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/live_stream.png"
              style={{ width: "22px", height: "22px" }}
            />
            <p className="ml-2 text-[#858585] text-md">Live Stream</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/stats.svg"
              style={{ width: "21px", height: "21px" }}
            />
            <p className="ml-2 text-[#858585] text-md">Stats</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/staking.svg"
              style={{ width: "21px", height: "21px" }}
            />
            <p className="ml-2 text-[#858585] text-md">Staking</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/referral.svg"
              style={{ width: "21px", height: "21px" }}
            />
            <p className="ml-2 text-[#858585] text-md">Referral</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/analytics.svg"
              style={{ width: "21px", height: "21px" }}
            />
            <p className="ml-2 text-[#858585] text-md">Analytics</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
