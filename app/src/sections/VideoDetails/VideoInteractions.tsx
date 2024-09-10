import { useContext } from 'react'
import Colors from '../../assets/colors'

import { VideoDetailsHelperFunctions } from '../../App'

export default function VideoInteractions() {

  const { GetVideoDetails, GetProfileDetails } = useContext(VideoDetailsHelperFunctions)

  const allVideoDetails = GetVideoDetails()
  const allProfileDetails = GetProfileDetails()

  return (
    <div className="flex items-center justify-between">
    <div className="flex flex-col gap-3">
      {/* Youtuber info */}

      <div className="flex items-center w-full gap-5">
        <button className="flex justify-center w-8 h-8 rounded-full item-center">
          <img className='rounded-full ' src={allProfileDetails.profilePic} alt="" />
        </button>

        <div className="flex flex-col items-start">
          <span className="text-base font-medium text-white">
            {allProfileDetails.name}
          </span>
          <span className="text-sm text-gray-500">{allProfileDetails.subscribers} subscribers</span>
        </div>

        <div className="flex gap-2">
          <button
            className={`bg-[${Colors.searchColor}] rounded-full px-5 py-2 text-sm font-medium text-white`}
          >
            Join
          </button>
          <button
            className={`bg-[${Colors.subscribeBtn}] rounded-full px-5 py-2 text-sm font-medium text-black`}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>

    {/* Video Buttons (on the right) */}

    <div className="flex gap-2">
      {/* Like and dislike */}

      <div
        className={`bg-[${Colors.searchColor}] flex h-fit w-32 items-center justify-between rounded-full px-3 py-2`}
      >
        <button className="flex gap-2">
          <img src="/VideoDetails/like-btn.svg" alt="like btn" />
          <span className="font-medium text-white">{allVideoDetails.likes}</span>
        </button>
        <div className="h-full w-[1px] bg-white">‎ </div>
        <button>
          <img src="/VideoDetails/dislike-btn.svg" alt="dislike btn" />
        </button>
      </div>

      {/* Share */}

      <button
        className={`flex gap-2 bg-[${Colors.searchColor}] h-fit rounded-full px-3 py-2`}
      >
        <img src="/VideoDetails/share.svg" alt="share button" />
        <span className="font-normal text-white">Share</span>
      </button>

      {/* More Options */}

      <button
        className={`rounded-full p-2 bg-[${Colors.searchColor}] h-fit`}
      >
        <img src="/VideoDetails/more-options.svg" alt="more options" />
      </button>
    </div>
  </div>
  )
}
