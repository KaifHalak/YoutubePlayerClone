import NavbarButton from "../../components/NavbarButton"

export default function ButtonsOnTheLeft() {
  return (
    <div className="flex items-center justify-start w-56 gap-2">
      {/* Hamburger */}
      <NavbarButton img="/NavBar/hamburger.svg" alt="hamburger menu" />

      {/* Youtube Logo */}
      <button className="flex justify-center item-center fill-white">
        <img
          className="w-[5.5rem] fill-transparent p-0"
          src="/NavBar/youtube-logo.svg"
          alt="Youtube Logo"
        />
      </button>
    </div>
  )
}
