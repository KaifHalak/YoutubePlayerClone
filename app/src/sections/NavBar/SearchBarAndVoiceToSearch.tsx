import NavbarButton from "../../components/NavbarButton"

export default function SearchBarAndVoiceToSearch() {
  return (
    <div className="flex justify-center item-center grow">
      
      {/* Search bar */}
      
      <div className="flex max-w-[600px] grow">
        
        {/* Input */}
        <div className="flex h-10 grow items-center rounded-l-[40px] border-[2px] border-[#222222] bg-[#121212] pl-4 pr-1">
          <input
            type="text"
            placeholder="Search"
            className="h-7 w-full bg-transparent p-[1px] text-base text-[#878787] focus:outline-none"
          />
        </div>
        
        {/* Search icon */}
        
        <div className="flex h-[40px] w-fit items-center rounded-r-[40px] bg-[#222222]">
          <img
            src="/NavBar/search-icon.svg"
            alt="search-icon"
            className="px-5 "
          />
        </div>
        
      </div>
      
      {/* Voice to Search */}
      
      <NavbarButton img="/NavBar/microphone.svg" alt="talk to search" className="bg-[#222222] ml-3" />
      
    </div>
  )
}
