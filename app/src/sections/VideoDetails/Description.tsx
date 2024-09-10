import { useContext, useState } from "react"
import Colors from "../../assets/colors"

import { VideoDetailsHelperFunctions } from "../../App"


export default function Description() {
  const { GetVideoDetails } = useContext(VideoDetailsHelperFunctions)
  const allVideoDetails = GetVideoDetails()

  const [isExpanded, setIsExpanded] = useState(false)
  const text = allVideoDetails.description

  const onClick = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div
      onClick={onClick}
      className={`bg-[${Colors.searchColor}] w-full cursor-pointer rounded-lg p-2`}
    >
      {/* Views and Upload date */}

      <div className="flex flex-row items-center gap-2 font-medium text-white">
        <span>{allVideoDetails.views} views</span>
        <span>{allVideoDetails.dateOfUpload}</span>
      </div>

      {/* Text */}

      <div className={`text-white ${!isExpanded ? "line-clamp-2" : ""}`}>
        <p>{text}</p>
      </div>

      {/* Show More / Less */}
      <button className="font-medium text-white" onClick={onClick}>
        Show {isExpanded ? "less" : "more"}
      </button>
    </div>
  )
}
