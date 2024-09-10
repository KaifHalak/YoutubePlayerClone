import { useContext, useRef } from "react"
import { VideoPlayerContext } from "../VideoPlayer"

import { VideoDetailsHelperFunctions } from "../../../App"


function formatTime(seconds: number){
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${Math.round(remainingSeconds)}`
}

export default function VideoDurationText() {
  const VideoDurationRef = useRef<HTMLDivElement>(null)

  const { GetDuration } = useContext(VideoDetailsHelperFunctions)

  const { UpdateVideoTime } = useContext(VideoPlayerContext)
  UpdateVideoTime(VideoDurationRef)

  return (
    <div ref={VideoDurationRef} className="px-1 text-sm text-white">
      0:00 / {formatTime(GetDuration())}
    </div>
  )
}
