import { useContext, useRef, useState } from "react"
import { VideoPlayerContext } from "./VideoPlayer"


export default function VideoDurationAndHover() {

  const { UpdateVideoPlayedPercentage, ChangeVideoCurrentTime } = useContext(VideoPlayerContext)

  const videoPlayedHoverRef = useRef<HTMLDivElement>(null)
  const hoverContainerRef = useRef<HTMLDivElement>(null)

  const [hoverWidth, setHoverWidth] = useState(0)
  const [mouseDown, setMouseDown] = useState(false)


  const onMouseMove = (e: any) => {
    const target = hoverContainerRef!.current as HTMLDivElement
    const offsetX = e.clientX - target.getBoundingClientRect().left

    hoverContainerRef.current!.classList.add("py-1")

    if (!mouseDown){
      setHoverWidth(offsetX)
    } else {
      const percentageChange = offsetX / target.getBoundingClientRect().width
      ChangeVideoCurrentTime(percentageChange)
    }
  }

  const onMouseLeave = () => {
    hoverContainerRef.current!.classList.remove("py-1")
    setHoverWidth(0)
  }

  const onClick = (e: any) => {
    const target = hoverContainerRef!.current as HTMLDivElement
    const offsetX = e.clientX - target.getBoundingClientRect().left
    const percentageChange = offsetX / target.getBoundingClientRect().width
    ChangeVideoCurrentTime(percentageChange)
  }

  UpdateVideoPlayedPercentage(videoPlayedHoverRef)

  return (
    <div
    ref={hoverContainerRef}
      className="relative bottom-1 h-1 w-full bg-[#222222] hover:cursor-pointer"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseDown={(e) => {
        onClick(e)
        setMouseDown(true)}}
      onMouseUp={() => setMouseDown(false)}
      
    >
      {/* Hover line */}
      <div
        className="h-full bg-[#747474] absolute top-0"
        style={{ width: `${hoverWidth}px` }}
      ></div>


      {/* Video Played Duration Hover */}

      <div ref={videoPlayedHoverRef} className="absolute top-0 h-full bg-[#00ff91]"></div>
    </div>
  )
}
