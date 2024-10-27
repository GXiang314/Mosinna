import videoRepository from '../repository/video.repository'
import serviceRepository from '../repository/service.repository'
import axios from 'axios'

export class VideoService {
    async saveVideo(dataUrl) {
        const video = await videoRepository.saveVideo(dataUrl)
        return video.id
    }

    async getVideoData(url) {
        const url2VideoService = (
            await serviceRepository.getAllAvaliableServices()
        ).find((x) => {
            return x.name === 'URL轉換影片'
        })
        if (!url2VideoService)
            throw new Error(
                '無可用的 ＵＲＬ 解析服務，註冊：https://ai3.gxiangsoft.com/api/url2base64',
            )
        return (await axios.get(`${url2VideoService.host}?url=${url}`)).data
            ?.result
    }
}
export default new VideoService()
