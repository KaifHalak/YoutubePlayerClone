// https://www.youtube.com/watch?v=ZjBLbXUuyWg
import app from "./express"
import path from "path"
import fs from "fs"

interface RecommendedVideosInfo {
     id: string
     name: string
     views: string
     thumbnail: string
     title: string
}

interface CurrentVideoInfo {
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

function GetVideoData(currentVideo: string) {
     let VIDEOS = ["1", "2"]
     VIDEOS = VIDEOS.filter((item) => item !== currentVideo)

     let recommendedVideos: RecommendedVideosInfo[] = []

     // Getting recommended videos

     VIDEOS.forEach(async (videoId) => {
          let metaDataPath = path.join(
               __dirname,
               `./Videos/Video ${videoId}/metaData.json`
          )

          try {
               const data = fs.readFileSync(metaDataPath, "utf-8")

               const jsonData = JSON.parse(data)

               const name = jsonData.profile.name
               const views = jsonData.video.views
               const thumbnail = jsonData.video.thumbnail
               const title = jsonData.video.title
               const id = jsonData.video.id

               recommendedVideos.push({
                    name,
                    views,
                    thumbnail,
                    title,
					id
               })
          } catch (error) {
               console.error("Error reading or parsing the file:", error)
          }
     })

     // Get data on current video

     let currentVideoMetaDataPath = path.join(
          __dirname,
          `./Videos/Video ${currentVideo}/metaData.json`
     )
     const data = fs.readFileSync(currentVideoMetaDataPath, "utf-8")
     const jsonData = JSON.parse(data) as CurrentVideoInfo

     jsonData.recommendations = recommendedVideos

     return jsonData
}

app.get("/video/:id", (req, res) => {
     const videoId = req.params.id
     const data = GetVideoData(videoId)
     res.json(data)
})

app.get("/videostream/:id", function (req, res) {
     // Ensure there is a range given for the video
     const range = req.headers.range
     if (!range) {
          return res.status(400).send("Requires Range header")
     }

     const videoId = req.params.id

     // get video stats (about 61MB)
     const videoPath = `./Videos/Video ${videoId}/video.mp4` // The data is in bytes
     const videoSize = fs.statSync(videoPath).size

     // Parse Range
     // Example: "bytes=32324-"
     const CHUNK_SIZE = 10 ** 6 // 1MB
     const start = Number(range.replace(/\D/g, ""))
     // start + CHUNK_SIZE may go beyond the actual video, to ensure that doesnt happen, we take the smaller of the 2 values

     // we do - 1 bcs the first byte is considered as 0th postion and so on.
     const end = Math.min(start + CHUNK_SIZE, videoSize - 1)

     // Create headers

     // This is calculating the chunk size. Because the starting byte is 0, we need to add 1.

     // Similarly for an array, array.length gives u the array size, but when accessing the individual indexes, we do len - 1

     const contentLength = end - start + 1
     const headers = {
          // Content-Range: The given value is not a formula. It is only a way to telling the client the starting byte, ending byte, and the total byte. It is

          // Ex: 0 - 999 / 1000  means that the starting byte is 0, ending byte is 999 and the totla is 1000 bytes. This means that all of the data has been sent

          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",

          // This is where you mention the chunk size which you are sending (size of the body)

          "Content-Length": contentLength,

          "Content-Type": "video/mp4"
     }

     // HTTP Status 206 for Partial Content

     // This is where the server is only sending the header (empty body).
     // This is method is used when you will start to stream data / send data in chunks
     res.writeHead(206, headers)

     // create video read stream for this particular chunk
     const videoStream = fs.createReadStream(videoPath, { start, end })

     // Stream the video chunk to the client

     // The chunks are streamed:
     // 1 - Small chunk is read from file (usually in kB)
     // 2 - It is piped to res object and sent to client
     // 3 - Client recieves this small chunk and can make use of it immediately (no need to wait)
     // 4 - This continues until the specified number of chunks have been read
     // 5 - The HTTP call remains open for the duration of the stream

     // Question: Are sockets used or polling?
     videoStream.pipe(res)
})
