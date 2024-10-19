import videoRepository from '../repository/video.repository'

export class VideoService {
    async saveVideo(dataUrl) {
        const video = await videoRepository.saveVideo(dataUrl)
        return video.id
    }
}
export default new VideoService()
