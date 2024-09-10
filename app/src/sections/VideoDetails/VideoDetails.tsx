import { useContext } from "react"
import Description from "./Description"
import VideoInteractions from "./VideoInteractions"

import { VideoDetailsHelperFunctions } from "../../App"


export default function VideoDetails() {

  const { GetVideoDetails } = useContext(VideoDetailsHelperFunctions)

  const videoTitle = GetVideoDetails().title

  return (
    <div className="flex flex-col gap-2">
      {/* Video title */}
      <span className="text-xl font-medium text-white">
        {videoTitle}
      </span>

      <VideoInteractions />

      <Description />
    </div>
  )
}
