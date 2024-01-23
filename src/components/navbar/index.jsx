import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "../../hooks/use-router";

const Navbar = () => {
  const router = useRouter();

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;

      if (provider?.isPhantom) {
        return provider;
      }
    }

    window.open('https://phantom.app/', '_blank');
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
  }


  return (
    <div className="bg-gradient-to-t from-[#433466] to-[#231B4A] flex flex-col py-5 px-8 items-center h-full w-[280px]" >
      <WalletMultiButton />
      <img src="/images/logo.png" width={105} height={31} className="mt-2"></img>
      
      <div className="rounded-[8px] bg-[#150C2A] gap-1 px-5 py-2 flex flex-row mt-10">
        <img src="/images/token-icon.svg" width={24} height={24}></img>
        <p className="text-white">1 GYPR - 0.3$</p>
      </div>
      <button className="rounded-[8px] bg-[#150C2A] mt-3 px-12 py-2 text-[#4EAF90]" onClick={connectWallet}>Buy Token</button>

      <div className="w-full mt-10">
        <div className="flex flex-row w-full justify-between cursor-pointer">
          <div className="flex flex-row justify-center items-center">
            <img src="/images/live_stream.png" style={{ width: '22px', height: '22px' }} />
            <p className="ml-2 text-[#858585] text-md">Live Stream</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img src="/images/stats.svg" style={{ width: '21px', height: '21px' }} />
            <p className="ml-2 text-[#858585] text-md">Stats</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img src="/images/staking.svg" style={{ width: '21px', height: '21px' }} />
            <p className="ml-2 text-[#858585] text-md">Staking</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img src="/images/referral.svg" style={{ width: '21px', height: '21px' }} />
            <p className="ml-2 text-[#858585] text-md">Referral</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
        <div className="flex flex-row w-full justify-between cursor-pointer mt-4">
          <div className="flex flex-row justify-center items-center">
            <img src="/images/analytics.svg" style={{ width: '21px', height: '21px' }} />
            <p className="ml-2 text-[#858585] text-md">Analytics</p>
          </div>
          <img src="/icons/chevron-right.svg" width={5} height={8} />
        </div>
      </div>
    </div>
  )
}

export default Navbar;