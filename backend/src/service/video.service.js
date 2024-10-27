import videoRepository from '../repository/video.repository'
import serviceRepository from '../repository/service.repository'
import axios from 'axios'
import { EXTERNAL_SERVICE_NAME } from '../enum/external-service-name.enum'

export class VideoService {
    /**
     *
     * @param {string} dataUrl
     * @returns {Promise<{id: string, video_path: string}>}
     */
    async saveVideo(dataUrl) {
        const video = await videoRepository.saveVideo(dataUrl)
        return video
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<string>}
     */
    async getVideoData(url) {
        const url2VideoService = (
            await serviceRepository.getAllAvaliableServices()
        ).find((x) => {
            return x.name === EXTERNAL_SERVICE_NAME.URL2BASE64
        })
        if (!url2VideoService)
            throw new Error('無可用的 URL 解析服務，請聯絡系統管理員')
        return (await axios.get(`${url2VideoService.host}?url=${url}`)).data
            ?.result
    }
}
export default new VideoService()
