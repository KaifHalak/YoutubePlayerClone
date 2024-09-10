import React, { createContext, useEffect, useRef } from "react"

import OverlayControls from "./OverlayControls/OverlayControls"
import VideoDurationAndHover from "./VideoDurationAndHover"

import { ServerEndpoints } from "../../libs/configs"

import "./assets/VideoPlayer.css"

let VideoPlayerRef: React.RefObject<HTMLVideoElement>
let VideoAndOverlayControlsContainer: React.RefObject<HTMLDivElement>


interface VideoPlayerFunctionsI {
  VideoPlayback: (play: boolean) => void
  SetVideoVolume: (newVolume: number) => void
  UpdateVideoTime: (VideoDurationRef: React.RefObject<HTMLDivElement>) => void
  ToggleFullScreen: () => void
  UpdateVideoPlayedPercentage: (
    VideoDurationLine: React.RefObject<HTMLDivElement>,
  ) => void
  ChangeVideoCurrentTime: (percentageChange: number) => void
  ToggleBetweenDefaultAndCinemaView: () => void
}

export const  VideoPlayerContext = createContext<VideoPlayerFunctionsI>(
  {} as VideoPlayerFunctionsI
)

export default function VideoPlayer({currentVideoId}: {currentVideoId: string}) {
  VideoPlayerRef = useRef<HTMLVideoElement>(null)
  VideoAndOverlayControlsContainer = useRef<HTMLDivElement>(null)

  const VideoProp: VideoPlayerFunctionsI = {
    VideoPlayback,
    SetVideoVolume,
    UpdateVideoTime,
    ToggleFullScreen,
    UpdateVideoPlayedPercentage,
    ChangeVideoCurrentTime,
    ToggleBetweenDefaultAndCinemaView,
  }

  return (
    <div ref={VideoAndOverlayControlsContainer} className="cinema-view">
      {/* Video */}

      <video
        className="w-full h-full bg-black"
        ref={VideoPlayerRef}
        src={ServerEndpoints.VIDEO_STREAM + currentVideoId}
      ></video>

      <div className="absolute flex flex-col w-full px-4 bottom-1">
        <VideoPlayerContext.Provider value={VideoProp}>
          <VideoDurationAndHover />
          <OverlayControls />
        </VideoPlayerContext.Provider>
      </div>
    </div>
  )
}



function VideoPlayback(play: boolean) {
  if (!VideoPlayerRef.current) {
    return
  }

  if (play) {
    VideoPlayerRef.current.play()
  } else {
    VideoPlayerRef.current.pause()
  }
}

function SetVideoVolume(newVolume: number) {
  if (!VideoPlayerRef.current) {
    return
  }

  VideoPlayerRef.current.volume = newVolume
}

function UpdateVideoTime(VideoDurationRef: React.RefObject<HTMLDivElement>) {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60

    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${Math.round(remainingSeconds)}`
  }

  const updateText = () => {
    const currentTime = formatTime(VideoPlayerRef.current!.currentTime)
    const duration = formatTime(VideoPlayerRef.current!.duration)
    VideoDurationRef.current!.innerHTML = `${currentTime} / ${duration}`
  }

  useEffect(() => {
    VideoPlayerRef.current!.addEventListener("timeupdate", updateText)

    // return () => {
    //   VideoPlayerRef.current!.removeEventListener("timeupdate", updateText)
    // }

  }, [])
}

function ToggleFullScreen() {
  if (!VideoAndOverlayControlsContainer.current || !VideoPlayerRef.current) {
    return
  }

  // The video is full screened
  if (
    VideoAndOverlayControlsContainer.current.classList.contains(
      "full-screen-container",
    )
  ) {
    VideoAndOverlayControlsContainer.current.classList.remove(
      "full-screen-container",
    )
    VideoPlayerRef.current.classList.remove("full-screen-video")
  } else {
    //
    VideoAndOverlayControlsContainer.current.classList.add(
      "full-screen-container",
    )
    VideoPlayerRef.current.classList.add("full-screen-video")
  }
}

function UpdateVideoPlayedPercentage(
  VideoDurationLine: React.RefObject<HTMLDivElement>) {
  const updateDurationPlayedHover = () => {
    const currentTime = VideoPlayerRef.current!.currentTime
    const duration = VideoPlayerRef.current!.duration
    const durationPlayed = (currentTime / duration) * 100
    VideoDurationLine.current!.style.width = `${durationPlayed}%`
  }

  useEffect(() => {
    VideoPlayerRef.current!.addEventListener(
      "timeupdate",
      updateDurationPlayedHover,
    )
  }, [])
}

function ChangeVideoCurrentTime(percentageChange: number) {
  VideoPlayerRef.current!.currentTime =
    VideoPlayerRef.current!.duration * percentageChange
}

function ToggleBetweenDefaultAndCinemaView() {
  if (
    VideoAndOverlayControlsContainer.current!.classList.contains("cinema-view")
  ) {
    VideoAndOverlayControlsContainer.current!.classList.remove("cinema-view")
    VideoAndOverlayControlsContainer.current!.classList.add("default-view")
  } else {
    VideoAndOverlayControlsContainer.current!.classList.add("cinema-view")
    VideoAndOverlayControlsContainer.current!.classList.remove("default-view")
  }
}
