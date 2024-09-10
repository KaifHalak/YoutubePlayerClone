import { useContext, useState } from "react"
import { VideoPlayerContext } from "../VideoPlayer"

export default function PlayButton() {
  const [playVideo, setVideoPlayBack] = useState(true)
  const { VideoPlayback } = useContext(VideoPlayerContext)

  const onClick = () => {
    VideoPlayback(playVideo)
    setVideoPlayBack(!playVideo)
  }

  return (
    <button onClick={onClick} className="size-12">
      <svg
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 36 36"
        width="100%"
      >
        <path
          className="ytp-svg-fill"
          d={
            playVideo
              ? "M 14 10 L 26 18 L 14 26 Z" // Play icon path
              : "M 12,26 16,26 16,10 12,10 z M 21,26 25,26 25,10 21,10 z" // Pause icon path
          }
          fill="#FFF"
        />
      </svg>
    </button>
  )
}
