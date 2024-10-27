import { CheckResultRepository } from '../repository/checkResult.repository'
import { ServiceRepository } from '../repository/service.repository'
import { CheckService } from '../service/check.service'
import { VideoService } from '../service/video.service'
import { apiFormatter } from '../utils/api-formatter'

export class CheckController {
    /**
     * @type {import('../service/check.service').default;}
     */
    checkService
    /**
     * @type {import('../service/video.service').default;}
     */
    videoService

    constructor() {
        this.checkService = new CheckService(
            new ServiceRepository(),
            new CheckResultRepository(),
        )
        this.videoService = new VideoService()
    }
    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async uploadVideo(req, res) {
        try {
            // proxy to ai detection services
            const { videoData } = req.body
            const result = await this.checkService.proxyToCheckService({
                videoData,
            })

            // store video
            const videoId = await this.videoService.saveVideo(videoData)

            // store check result
            await this.checkService.saveCheckResult({
                video_id: videoId,
                checkResult: result.map((x) => {
                    return {
                        service_id: x.id,
                        details: x?.details,
                        result: x.result,
                    }
                }),
            })

            // response to client
            res.json(apiFormatter(result))
        } catch (error) {
            console.log(error)

            res.json(apiFormatter(error, 500))
        }
    }

    /**
     * @param {import("express").Request} req
     * @param {import("express").Response} res
     */
    async uploadUrl(req, res) {
        try {
            // proxy to ai detection services
            const { checkUrl } = req.body

            const videoData = await this.videoService.getVideoData(checkUrl)

            const result = await this.checkService.proxyToCheckService({
                videoData,
            })

            // store video
            const videoId = await this.videoService.saveVideo(videoData)

            // store check result
            await this.checkService.saveCheckResult({
                video_id: videoId,
                checkResult: result.map((x) => {
                    return {
                        service_id: x.id,
                        details: x?.details,
                        result: x.result,
                    }
                }),
            })

            // response to client
            res.json(apiFormatter(result))
        } catch (error) {
            console.log(error)

            res.json(apiFormatter(error, 500))
        }
    }
}

export default new CheckController()
