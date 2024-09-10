import NavbarButton from "../../components/NavbarButton"

export default function ButtonsOnTheRight() {
  return (
    <div className="flex items-center justify-end w-56 gap-2">
      
      {/* Create Video */}
      <NavbarButton img="/NavBar/create-camera.svg" alt="create video" />

      {/* Notifications */}
      <NavbarButton img="/NavBar/bell-noti.svg" alt="notifications" />

      {/* User Profile */}
      <button className="item-center flex h-8 w-8 justify-center rounded-full bg-[#00ccff] p-2"></button>

    </div>
  )
}
