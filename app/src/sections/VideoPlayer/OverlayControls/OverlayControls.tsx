import { useContext } from "react"

import VolumeControls from "./VolumeControls"
import VideoDurationText from "./VideoDurationText"
import PlayButton from "./PlayButton"
import { VideoPlayerContext } from "../VideoPlayer"

import OverlayControlsButton from "../../../components/OverlayControlsButton"

export default function OverlayControls() {

  const { ToggleFullScreen, ToggleBetweenDefaultAndCinemaView } = useContext(VideoPlayerContext)

  return (
    <div className="flex items-center justify-between w-full">
      {/* Contorls on the left */}
      <div className="flex items-center justify-start">
        
        <PlayButton />

        <OverlayControlsButton img="/VideoPlayer/skip-forward.svg" alt="skip to next video "/>

        <VolumeControls />

        <VideoDurationText />
        
      </div>

      {/* Contorls on the right */}
      <div className="flex items-center justify-start">

        <OverlayControlsButton img="/VideoPlayer/captions.svg" alt="toggle "/>

        <OverlayControlsButton img="/VideoPlayer/settings.svg" alt="settings"/>

        <OverlayControlsButton img="/VideoPlayer/miniplayer.svg" alt="mini player view"/>

        <OverlayControlsButton img="/VideoPlayer/rectangle.svg" alt="change video view" onClick={ToggleBetweenDefaultAndCinemaView}  />
        
        <OverlayControlsButton img="/VideoPlayer/fullscreen.svg" alt="full screen" onClick={ToggleFullScreen} />
      </div>
    </div>
  )
}
