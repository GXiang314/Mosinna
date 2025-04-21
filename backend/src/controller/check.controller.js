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
            if (process.env.SSE_TEST === 'true') {
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'X-Accel-Buffering': 'no',
                })

                req.on('close', () => {
                    console.log('Client disconnected')
                })
                await this.checkService.proxyToCheckServiceSSE(res, {
                    videoData,
                })
                return
            }
            const result = await this.checkService.proxyToCheckService({
                videoData,
            })

            // store video
            const video = await this.videoService.saveVideo(videoData)

            // store check result
            await this.checkService.saveCheckResult({
                video_id: video?.id,
                source: '使用者上傳',
                ip: req.ip,
                checkResult: result.map((x) => {
                    return {
                        service_id: x.id,
                        details: x?.details,
                        result: x.result,
                    }
                }),
            })

            const resourceHost =
                process.env.RESOURCES_PATH || 'http://localhost:5000/resources'
            // response to client
            return res.json(
                apiFormatter({
                    id: video?.id,
                    video_path: `${resourceHost}/${video?.video_path}`,
                    checkList: result,
                }),
            )
        } catch (error) {
            console.log(error)
            return res.status(500).json(apiFormatter(null, 500, '伺服器錯誤'))
        }
    }

    /**
     * @param {import("express").Request<unknown, unknown, {checkUrl: string}>} req
     * @param {import("express").Response} res
     */
    async uploadUrl(req, res) {
        try {
            const { checkUrl } = req.body
            if (
                !checkUrl ||
                (!checkUrl.startsWith('https://www.youtube.com/') &&
                    !checkUrl.startsWith('https://youtube.com/') &&
                    !checkUrl.startsWith('https://youtu.be/'))
            ) {
                throw new Error('只接受 YouTube 影片連結')
            }

            if (process.env.SSE_TEST === 'true') {
                res.writeHead(200, {
                    'Content-Type': 'text/event-stream',
                    'Cache-Control': 'no-cache',
                    'X-Accel-Buffering': 'no',
                })
                console.log('SSE TEST')
                await this.checkService.proxyToCheckServiceSSE(res, {
                    videoData: 'any',
                })
                req.on('close', () => {
                    console.log('Client disconnected')
                })
                return
            }
            const videoData = await this.videoService.getVideoData(checkUrl)

            // proxy to ai detection services
            const result = await this.checkService.proxyToCheckService({
                videoData,
            })

            // store video
            const video = await this.videoService.saveVideo(videoData)

            // store check result
            await this.checkService.saveCheckResult({
                video_id: video?.id,
                source: 'Youtube',
                ip: req.ip,
                checkResult: result.map((x) => {
                    return {
                        service_id: x.id,
                        details: x?.details,
                        result: x.result,
                    }
                }),
            })

            const resourceHost =
                process.env.RESOURCES_PATH || 'http://localhost:5000/resources'
            // response to client
            return res.json(
                apiFormatter({
                    id: video?.id,
                    video_path: `${resourceHost}/${video?.video_path}`,
                    checkList: result,
                }),
            )
        } catch (error) {
            console.log(error)
            if (
                error.message === '只接受 YouTube 影片連結' ||
                error.message === '檔案過大或此影片已下架'
            ) {
                return res
                    .status(400)
                    .json(apiFormatter(null, 400, error.message))
            }
            return res.status(500).json(apiFormatter(null, 500, '伺服器錯誤'))
        }
    }
}

export default new CheckController()
