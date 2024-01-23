
const Footer = () => {
  return (
    <div className="flex flex-row bg-[#0B021D] w-full py-12 px-16 justify-between items-center">
      <img src="/icons/logo-footer.svg" style={{width: '138px', height: '42px'}} />
      <div className="flex flex-row justify-center items-center h-full">
        <p className="text-[#808181] text-base font-normal mr-16">Support</p>
        <p className="text-[#808181] text-base font-normal mr-16">Docs</p>
        <p className="text-[#808181] text-base font-normal">FAQs</p>
      </div>
      <div className="flex flex-row justify-center items-center h-full">
        <div className="bg-[#805BEB26] rounded-[12px] p-2 mr-2">
          <img src="/icons/instagram.svg" style={{width: '24px', height: '24px'}} />
        </div>
        <div className="bg-[#805BEB26] rounded-[12px] p-2 mr-2">
          <img src="/icons/twitter.svg" style={{width: '24px', height: '24px'}} />
        </div>
        <div className="bg-[#805BEB26] rounded-[12px] p-2 mr-2">
          <img src="/icons/twitch.svg" style={{width: '24px', height: '24px'}} />
        </div>
        <div className="bg-[#805BEB26] rounded-[12px] p-2 mr-2">
          <img src="/icons/discord.svg" style={{width: '24px', height: '24px'}} />
        </div>
      </div>
    </div>
  )
}

export default Footer;