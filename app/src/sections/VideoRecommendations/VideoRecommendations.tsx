import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { VideoDetailsHelperFunctions } from "../../App"

interface RecommendedVideosInfo {
  id: string
  name: string
  views: string
  thumbnail: string
  title: string
}

export function EachVideoRecommendation({
  name,
  views,
  thumbnail,
  title,
  id,
}: RecommendedVideosInfo) {
  const navigate = useNavigate()

  const onClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div onClick={onClick} className="flex cursor-pointer gap-2 text-white">
      <div className="h-[94px] w-[168px]">
        <img
          className="rounded-md"
          src={thumbnail}
          alt="recommended video thumbnail"
        />
      </div>

      <div className="flex flex-grow flex-col items-start justify-start">
        <span className="line-clamp-2 font-medium text-white">{title}</span>

        <span className="text-sm text-gray-500">{name}</span>

        <div className="flex gap-2 text-xs text-gray-500">
          <span>{views} views</span>
          {/* <span>3 days ago</span> */}
        </div>
      </div>
    </div>
  )
}

export default function VideoRecommendations() {
  const { GetVideoRecommendations } = useContext(VideoDetailsHelperFunctions)

  // Get the list of video recommendations
  const recommendations = GetVideoRecommendations()

  return (
    <div className="mt-16 flex w-full max-w-[400px] flex-col gap-3">
      {recommendations.map((videoData, index) => (
        <EachVideoRecommendation key={index} {...videoData} />
      ))}
    </div>
  )
}
