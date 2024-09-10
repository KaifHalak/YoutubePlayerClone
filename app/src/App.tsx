import { createContext } from "react"
import { useParams } from "react-router-dom"

import NavBar from "./sections/NavBar/NavBar"
import VideoPlayer from "./sections/VideoPlayer/VideoPlayer"
import VideoDetails from "./sections/VideoDetails/VideoDetails"
import VideoRecommendations from "./sections/VideoRecommendations/VideoRecommendations"

import { ServerEndpoints, FetchConfig } from "./libs/configs"
import { useQuery } from "@tanstack/react-query"

interface RecommendedVideosInfo {
  id: string
  name: string
  views: string
  thumbnail: string
  title: string
}

interface VideoDetailsI {
  video: {
    id: string
    title: string
    duration: number
    likes: string
    description: string
    dateOfUpload: string
    views: string
  }
  profile: {
    name: string
    subscribers: string
    profilePic: string
  }
  recommendations: RecommendedVideosInfo[]
}

interface VideoDetailsHelperFunctionsI {
  GetDuration: () => number

  GetVideoDetails: () => {
    title: string
    duration: number
    likes: string
    description: string
    dateOfUpload: string
    views: string
  }

  GetProfileDetails: () => {
    name: string
    subscribers: string
    profilePic: string
  }

  GetVideoRecommendations: () => RecommendedVideosInfo[]
}

export const VideoDetailsHelperFunctions =
  createContext<VideoDetailsHelperFunctionsI>(
    {} as VideoDetailsHelperFunctionsI,
  )

async function FetchData(currentVideoId: string) {
  const videoData = await fetch(ServerEndpoints.VIDEO_DATA + currentVideoId)
  const parsedData = (await videoData.json()) as VideoDetailsI
  return parsedData
}

export default function App() {
  const { currentVideoId } = useParams()
  // Fetching Data

  const { status, data } = useQuery<VideoDetailsI>({
    queryKey: [currentVideoId],
    queryFn: async () => await FetchData(currentVideoId!),
    staleTime: FetchConfig.CACHE_DURATION,
    refetchOnWindowFocus: false,
  })

   if (status === "pending") {
   return <div>Loading...</div> // You can customize this loading screen
  }

  const videoDetails = data!


  // Helper Functions

  const GetDuration = () => {
    return videoDetails!.video.duration
  }

  const GetVideoDetails = () => {
    return videoDetails!.video
  }

  const GetProfileDetails = () => {
    return videoDetails!.profile
  }

  const GetVideoRecommendations = () => {
    return videoDetails!.recommendations
  }

  const Props = {
    GetDuration,
    GetVideoDetails,
    GetProfileDetails,
    GetVideoRecommendations,
  }

  return (
    <div className="relative h-full w-full bg-[#0F0F0F]">
      <VideoDetailsHelperFunctions.Provider value={Props}>
        <NavBar />
        <VideoPlayer currentVideoId={currentVideoId!} />
        <div className="flex w-full gap-8 px-8 py-4 bg-inherit">
          <VideoDetails />
          <VideoRecommendations />
        </div>
      </VideoDetailsHelperFunctions.Provider>
    </div>
  )
}
