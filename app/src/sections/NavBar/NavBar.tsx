
import SearchBarAndVoiceToSearch from "./SearchBarAndVoiceToSearch"
import ButtonsOnTheRight from "./ButtonsOnTheRight"
import ButtonsOnTheLeft from "./ButtonsOnTheLeft"

export default function NavBar() {
  return (
    <div className="flex items-center justify-between px-4 bg-transparent h-14">
      <ButtonsOnTheLeft />
      <SearchBarAndVoiceToSearch />
      <ButtonsOnTheRight />
    </div>
  )
}
