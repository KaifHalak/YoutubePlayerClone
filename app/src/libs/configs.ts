export enum VolumeConfig {
  DEFAULT_VOLUME = 50,
  MIN_VOLUME = 0,
  MAX_VOLUME = 100,
}

export enum ServerEndpoints {
  VIDEO_STREAM = "http://localhost:3000/videostream/",
  VIDEO_DATA = "http://localhost:3000/video/",
}

export enum FetchConfig {
  CACHE_DURATION = 5 * 60 * 1000// 5 min
}
