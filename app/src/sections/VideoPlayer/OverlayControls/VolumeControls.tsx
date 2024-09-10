import React, { useContext, useState } from "react"

import { VideoPlayerContext } from "../VideoPlayer"
import "./assets/VolumeSlider.css"
import { VolumeConfig } from "../../../libs/configs"

const { DEFAULT_VOLUME, MIN_VOLUME, MAX_VOLUME } = VolumeConfig

interface VolumeSlider {
  setCurrentVolume: React.Dispatch<React.SetStateAction<number>>
  currentVolume: number
  isVolumeHovered: boolean
}

interface VolumeIcon {
  currentVolume: number
}

function VolumeButton({ currentVolume }: VolumeIcon) {
  const svgPaths = {
    first:
      "m 21.48,17.98 c 0,-1.77 -1.02,-3.29 -2.5,-4.03 v 2.21 l 2.45,2.45 c .03,-0.2 .05,-0.41 .05,-0.63 z m 2.5,0 c 0,.94 -0.2,1.82 -0.54,2.64 l 1.51,1.51 c .66,-1.24 1.03,-2.65 1.03,-4.15 0,-4.28 -2.99,-7.86 -7,-8.76 v 2.05 c 2.89,.86 5,3.54 5,6.71 z M 9.25,8.98 l -1.27,1.26 4.72,4.73 H 7.98 v 6 H 11.98 l 5,5 v -6.73 l 4.25,4.25 c -0.67,.52 -1.42,.93 -2.25,1.18 v 2.06 c 1.38,-0.31 2.63,-0.95 3.69,-1.81 l 2.04,2.05 1.27,-1.27 -9,-9 -7.72,-7.72 z m 7.72,.99 -2.09,2.08 2.09,2.09 V 9.98 z",
    second:
      "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 Z",
    third:
      "M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z",
  }

  let currentPath = svgPaths.first
  if (currentVolume > 0 && currentVolume <= 50) {
    currentPath = svgPaths.second
  } else if (currentVolume > 50) {
    currentPath = svgPaths.third
  }

  return (
    <button className="m-3 size-9">
      <svg
        height="100%"
        version="1.1"
        viewBox="0 0 36 36"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          // ref={svgPathRef}
          d={currentPath}
          fill="#FFF"
        >
          {/* <animate
              attributeName="d"
              from={svgPaths.first}
              to={currentPath}
              dur="0.5s"
              fill="freeze"
            /> */}
        </path>
      </svg>
    </button>
  )
}

function VolumeSlider({
  isVolumeHovered,
  currentVolume,
  setCurrentVolume,
}: VolumeSlider) {
  isVolumeHovered = isVolumeHovered!
  const percentageVolume = (currentVolume / MAX_VOLUME) * 100

  return (
    <div
      className={`slider-container volume-slider ${!isVolumeHovered ? "closed" : "opened"}`}
    >
      <input
        type="range"
        min={MIN_VOLUME}
        max={MAX_VOLUME}
        value={currentVolume}
        onChange={(event: any) => {
          setCurrentVolume(Number(event.target.value))
        }}
        className="slider"
        style={{
          background: `linear-gradient(to right, #fff ${percentageVolume}%, #404142 0%)`,
        }}
      />
      <div className="tooltip" style={{ left: `${currentVolume}%` }}>
        {currentVolume}%
      </div>
    </div>
  )
}

export default function VolumeControls() {
  const [isVolumeHovered, volumeSetIsHovered] = useState(false)
  const [currentVolume, setCurrentVolume] = useState(DEFAULT_VOLUME)

  const { SetVideoVolume } = useContext(VideoPlayerContext)
  SetVideoVolume(currentVolume / 100) // Volume needs to be from 0 to 1

  return (
    <div
      className="flex flex-row items-center justify-center"
      onMouseEnter={() => {
        volumeSetIsHovered(true)
      }}
      onMouseLeave={() => {
        volumeSetIsHovered(false)
      }}
    >
      <VolumeButton currentVolume={currentVolume} />
      <VolumeSlider
        isVolumeHovered={isVolumeHovered}
        setCurrentVolume={setCurrentVolume}
        currentVolume={currentVolume}
      />
    </div>
  )
}
